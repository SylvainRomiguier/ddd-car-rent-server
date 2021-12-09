import { ICustomerOutputPort } from "../../application/Interfaces/customer/ICustomerOutputPort";
import { Customer } from "../../domain/entities/Customer";
import { IndividualCustomer } from "../../domain/entities/IndividualCustomer";
import { ProfessionalCustomer } from "../../domain/entities/ProfessionalCustomer";

interface JSONAddress {
  number: string;
  street: string;
  complement: string;
  zipCode: string;
  city: string;
  country: string;
}

interface JSONProfessionalCustomer {
  siret: string;
  companyName: string;
  address: JSONAddress;
}

interface JSONIndividualCustomer {
  id: string;
  firstName: string;
  lastName: string;
  address: JSONAddress;
}

type JSONCustomer = JSONProfessionalCustomer | JSONIndividualCustomer;

export class CustomerJSONPresenter implements ICustomerOutputPort {
  private _json: JSONCustomer | null = null;
  get() {
    return this._json;
  }
  present = (customer: Customer) => {
    this._json =
      customer instanceof ProfessionalCustomer
        ? {
            siret: (customer as ProfessionalCustomer).value.siret.value,
            companyName: (customer as ProfessionalCustomer).value.companyName
              .value,
            address: {
              number: (customer as ProfessionalCustomer).value.address.value
                .number,
              street: (customer as ProfessionalCustomer).value.address.value
                .street,
              complement: (customer as ProfessionalCustomer).value.address.value
                .complement,
              zipCode: (customer as ProfessionalCustomer).value.address.value
                .zipCode,
              city: (customer as ProfessionalCustomer).value.address.value.city,
              country: (customer as ProfessionalCustomer).value.address.value
                .country,
            },
          }
        : {
            id: (customer as unknown as IndividualCustomer).value.id.value,
            firstName: (customer as unknown as IndividualCustomer).value
              .firstName.value,
            lastName: (customer as unknown as IndividualCustomer).value.lastName
              .value,
            address: {
              number: (customer as unknown as IndividualCustomer).value.address
                .value.number,
              street: (customer as unknown as IndividualCustomer).value.address
                .value.street,
              complement: (customer as unknown as IndividualCustomer).value
                .address.value.complement,
              zipCode: (customer as unknown as IndividualCustomer).value.address
                .value.zipCode,
              city: (customer as unknown as IndividualCustomer).value.address
                .value.city,
              country: (customer as unknown as IndividualCustomer).value.address
                .value.country,
            },
          };
  };
}
