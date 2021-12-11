import { ValueOrEntityObject } from "../types";
import { IPAddress } from "../ValueObjects";

interface IProspect {
  id: IPAddress;
}

export class Prospect implements ValueOrEntityObject<IProspect> {
  private _value: IProspect;
  constructor(ipAddress?: string) {
    this._value = {
      id: new IPAddress(ipAddress),
    };
  }
  get value() {
    return this._value;
  }
  get id() {
    return this._value.id;
  }
  isEqual = (other: unknown) => {
    if (other instanceof Prospect && other.id.isEqual(this.id)) return true;
    return false;
  };
}
