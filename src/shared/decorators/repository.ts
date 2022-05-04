export const table = function(table_name: string) {
  return function(constructor: Function) {
    constructor.prototype.table_name = table_name;
  };
};
