import { ValueOrEntityObject } from "../types";
import { Name } from "../ValueObjects";

interface IModel {
  name: Name;
  brand: Name;
}
export class Model implements ValueOrEntityObject<IModel> {
  private _value: IModel;
  constructor(name?: string, brand?: string) {
    this._value = {
      name: new Name(name),
      brand: new Name(brand),
    };
  }
  get name() {
    return this._value.name;
  }
  get brand() {
    return this._value.brand;
  }
  isEqual = (other: unknown) => {
    if (
      other instanceof Model &&
      other.name.isEqual(this.name) &&
      other.brand.isEqual(this.brand)
    )
      return true;
    return false;
  };
}
