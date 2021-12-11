import { IndividualCustomer } from "./IndividualCustomer";
import { ProfessionalCustomer } from "./ProfessionalCustomer";
import { ValueOrEntityObject } from "../types";
import { Prospect } from "./Prospect";

export class Customer
  implements
    ValueOrEntityObject<Prospect | ProfessionalCustomer | IndividualCustomer>
{
  private _value: Prospect | ProfessionalCustomer | IndividualCustomer;
  constructor(customer: Prospect | ProfessionalCustomer | IndividualCustomer) {
    this._value = customer;
  }
  get value() {
    return this._value;
  }
  get id() {
    if (this._value instanceof ProfessionalCustomer)
      return (this as unknown as ProfessionalCustomer).value.siret.value;
    if (this._value instanceof IndividualCustomer)
      return (this as unknown as IndividualCustomer).value.id.value;
    if (this._value instanceof Prospect)
      return (this as unknown as Prospect).value.id.value;
  }
  isEqual = (other: unknown) => {
    if (other instanceof Customer && other.value.isEqual(this.value))
      return true;
    return false;
  };
}
