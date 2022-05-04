import { IsInt, IsNotEmpty, IsEnum } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  @IsNotEmpty()
  httpBodyLimit: string;

  @IsInt()
  @IsNotEmpty()
  maxAmountPerDay: number;

  @IsInt()
  @IsNotEmpty()
  maxHourToTransferAmout: number;

  @IsInt()
  @IsNotEmpty()
  maxValueToTransferAfterMaxHour: number;

  @IsEnum(['amqp'])
  rabbitMQProtocol: string;

  @IsNotEmpty()
  rabbitMQHost: string;

  @IsInt()
  rabbitMQPort: number;

  @IsNotEmpty()
  rabbitMQUsername: string;

  @IsNotEmpty()
  rabbitMQPassword: string;

  @IsNotEmpty()
  rabbitMQVHost: string;

  @IsNotEmpty()
  dbClient: string;

  @IsNotEmpty()
  dbHost: string;

  @IsNotEmpty()
  dbUsername: string;

  @IsNotEmpty()
  dbPassword: string;

  @IsNotEmpty()
  dbDatabase: string;

  @IsNotEmpty()
  @IsInt()
  dbPort: number;

  @IsNotEmpty()
  @IsInt()
  dbPoolMax: number;

  @IsNotEmpty()
  @IsInt()
  dbPoolMin: number;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
