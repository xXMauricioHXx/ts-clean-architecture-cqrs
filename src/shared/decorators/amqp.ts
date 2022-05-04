export const queue = function (queue: string): Function {
  return function (constructor: Function) {
    constructor.prototype.queue = queue;
  };
};

const createPropertyDecorator = function (field: string, value: any): Function {
  return function (constructor: Function) {
    constructor.prototype[field] = value;
  };
};

export const exchange = function (exchange: string): Function {
  return createPropertyDecorator('exchange', exchange);
};

export const routing_key = function (routingKey: string): Function {
  return createPropertyDecorator('routingKey', routingKey);
};
