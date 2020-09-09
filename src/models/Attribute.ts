export class Attribute<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getData = (): T => {
    return this.data;
  };

  set = (updateObject: T) => {
    this.data = { ...this.data, ...updateObject };
  };
}
