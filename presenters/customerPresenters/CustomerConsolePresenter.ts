import { ICustomerOutputPort } from "../../application/Interfaces/customer/ICustomerOutputPort";
import { Customer } from "../../domain/entities/Customer";
import { IndividualCustomer } from "../../domain/entities/IndividualCustomer";
import { ProfessionalCustomer } from "../../domain/entities/ProfessionalCustomer";

export class CustomerConsolePresenter implements ICustomerOutputPort {
  present = (customer: Customer) => {
    console.log(
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
          },
      null,
      2
    );
  };
}
