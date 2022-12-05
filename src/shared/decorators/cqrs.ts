const addNameAndType = function (constructor: Function) {
  constructor.prototype.name = constructor.name;
  constructor.prototype.type = constructor;
};

export const event = function (): Function {
  return addNameAndType;
};

export const command = function (): Function {
  return addNameAndType;
};

export const query = function (): Function {
  return addNameAndType;
};
