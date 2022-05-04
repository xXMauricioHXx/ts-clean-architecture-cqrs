export const proto = (proto: string, service: string) => {
  return function(constructor: Function) {
    if (!constructor.prototype.service_configs) {
      constructor.prototype.service_configs = [
        {
          proto,
          service,
        },
      ];
    }
  };
};

export const implementation = function(implementation: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.implementation = implementation;
  };
};
