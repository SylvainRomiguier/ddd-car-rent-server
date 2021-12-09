import { ValueOrEntityObject } from "../types";
import { UniqueId } from "../ValueObjects";
import { Vehicule } from "../entities/Vehicule";
import { Customer } from "../entities/Customer";

export interface IBooking {
  id: UniqueId;
  customer: Customer;
  vehicule: Vehicule;
  beginDate: Date;
  endDate: Date;
}

export class Booking implements ValueOrEntityObject<IBooking> {
  private _value: IBooking;
  constructor(
    id?: string,
    customer?: Customer,
    vehicule?: Vehicule,
    beginDate?: Date,
    endDate?: Date
  ) {
    if (!id || !customer || !vehicule || !beginDate || !endDate)
      throw new Error(
        "Id, customer, vehicule, begin date and end date are mandatory."
      );
    if (beginDate.getTime() >= endDate.getTime())
      throw new Error("End Date should be greater than begin date.");
    this._value = {
      id: new UniqueId(id),
      customer,
      vehicule,
      beginDate,
      endDate,
    };
  }
  get id() {
    return this._value.id;
  }
  get customer() {
    return this._value.customer;
  }
  get vehicule() {
    return this._value.vehicule;
  }
  get beginDate() {
    return this._value.beginDate;
  }
  get endDate() {
    return this._value.endDate;
  }
  isEqual = (other: unknown) => {
    if (other instanceof Booking && other.id.isEqual(this.id)) return true;
    return false;
  };
}
