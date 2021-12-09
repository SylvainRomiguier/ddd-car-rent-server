import { ValueOrEntityObject } from "../types";
import { UniqueId, Address, Name } from "../ValueObjects";

interface IIndividualCustomer {
  id: UniqueId;
  address: Address;
  firstName: Name;
  lastName: Name;
}

export class IndividualCustomer
  implements ValueOrEntityObject<IIndividualCustomer>
{
  private _value: IIndividualCustomer;
  constructor(
    id?: string,
    address?: Address,
    firstName?: string,
    lastName?: string
  ) {
    if (!address) throw new Error("Address is mandatory.");
    this._value = {
      id: new UniqueId(id),
      address,
      firstName: new Name(firstName),
      lastName: new Name(lastName),
    };
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) => {
    if (
      other instanceof IndividualCustomer &&
      other.value.id.isEqual(this._value.id)
    )
      return true;
    return false;
  };
}
