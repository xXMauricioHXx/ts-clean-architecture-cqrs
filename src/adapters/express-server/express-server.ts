import express, {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import Joi from 'joi';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import { container, InjectionToken } from 'tsyringe';
import {
  HttpResponse,
  HttpRequest,
  RouteConfig,
  Middleware,
  Controller,
} from '@/presentation/http/ports';
import logger from '@/logger';
import { env } from '@/main/env';
import { ErrorHandlerMiddleware } from '@/adapters/express-server';

export abstract class ExpressServer {
  protected abstract loadControllers(): Function[];

  protected buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller: Function) => {
      const instance = container.resolve(controller as InjectionToken);

      if (!instance.routeConfigs) {
        return;
      }

      instance.routeConfigs.forEach((config: RouteConfig) => {
        const { path, middlewares, method, statusCode, schema, hasSchema } =
          config;

        if (hasSchema && !schema) {
          throw new Error(`Schema to ${controller.name} is mandatory.`);
        }

        const func = this.requestHandle(instance, statusCode);
        const funcMiddleware: RequestHandler[] =
          this.buildMiddlewares(middlewares);

        const jobs = schema
          ? ([...funcMiddleware, this.requestValidator(schema), func] as any)
          : ([...funcMiddleware, func] as any);

        switch (method) {
          case 'get':
            router.get(path, jobs);
            break;
          case 'post':
            router.post(path, jobs);
            break;
          case 'put':
            router.put(path, jobs);
            break;
          case 'patch':
            router.patch(path, jobs);
            break;
          case 'delete':
            router.delete(path, jobs);
            break;
          default:
            break;
        }
      });
    });

    return router;
  }

  private requestHandle(
    instance: Controller,
    statusCode?: number
  ): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = (await instance.handle(req)) as HttpResponse;

        if (response?.headers) {
          for (const header in response.headers) {
            res.setHeader(header, response.headers[header]);
          }
        }

        const httpStatus = statusCode || response.status;

        if (httpStatus) {
          res.status(httpStatus);
        }

        res.send(response?.data);
      } catch (err) {
        const error = instance.exception(err);
        next(error);
      }
    };
  }

  private buildMiddlewares(middlewares: Function[]): RequestHandler[] {
    return middlewares.map(middleware => {
      const instanceMiddleware = container.resolve(
        middleware as InjectionToken
      ) as Middleware;

      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          await instanceMiddleware.handle(req);
          next();
        } catch (err) {
          logger.error(err);
          next(err);
        }
      };
    });
  }

  private requestValidator(schema?: Joi.Schema): RequestHandler | void {
    if (!schema) return undefined;
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      });

      if (validation.error) {
        logger.debug(req?.body);
        logger.debug(req?.params);
        logger.debug(req?.query);

        return res.status(400).send({
          code: 'VALIDATION_FAILED',
          messasge: 'Invalid request data',
          details: validation.error.details,
        });
      }

      Object.assign(req, validation.value);

      return next();
    };
  }

  protected errorHandler(): unknown {
    const errorHandler = container.resolve<ErrorHandlerMiddleware>(
      ErrorHandlerMiddleware
    );

    return (err: any, req: HttpRequest, res: Response, next: NextFunction) => {
      const { data, status } = errorHandler.handle(req, err);
      res.status(status!).send(data);
      return next();
    };
  }

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });
    const buildedRoutes = this.buildRoutes(router);
    const errorHandler = this.errorHandler() as any;

    app.set('trust proxy', true);
    app.use(helmet());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: env.httpBodyLimit,
      })
    );

    router.get(
      ['/info', '/status'],
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }
    );

    app.use(buildedRoutes);
    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(400).send({
          code: 'PAGE_NOT_FOUND',
          message: 'Page not found.',
        });
      }
    );
    app.use(errorHandler);
    app.listen(env.httpPort, () =>
      logger.info(`Server running on port ${env.httpPort}`)
    );
  }
}
