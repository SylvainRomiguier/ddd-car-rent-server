import { IndividualCustomer } from "./IndividualCustomer";
import { ProfessionalCustomer } from "./ProfessionalCustomer";
import { ValueOrEntityObject } from "../types";

export class Customer
  implements ValueOrEntityObject<ProfessionalCustomer | IndividualCustomer>
{
  private _value: ProfessionalCustomer | IndividualCustomer;
  constructor(customer: ProfessionalCustomer | IndividualCustomer) {
    this._value = customer;
  }
  get value() {
    return this._value;
  }
  get id() {
    return this._value instanceof ProfessionalCustomer
      ? (this as unknown as ProfessionalCustomer).value.siret.value
      : (this as unknown as IndividualCustomer).value.id.value;
  }
  isEqual = (other: unknown) => {
    if (other instanceof Customer && other.value.isEqual(this.value))
      return true;
    return false;
  };
}
