import { ValueOrEntityObject } from "../types";
import { Address, Name, Siret } from "../ValueObjects";

interface IProfessionalCustomer {
  address: Address;
  companyName: Name;
  siret: Siret;
}

export class ProfessionalCustomer
  implements ValueOrEntityObject<IProfessionalCustomer>
{
  private _value: IProfessionalCustomer;
  constructor(address?: Address, companyName?: string, siret?: string) {
    if (!address) throw new Error("Address is mandatory.");
    this._value = {
      address,
      companyName: new Name(companyName),
      siret: new Siret(siret),
    };
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) => {
    if (
      other instanceof ProfessionalCustomer &&
      other.value.siret.isEqual(this._value.siret)
    )
      return true;
    return false;
  };
}
