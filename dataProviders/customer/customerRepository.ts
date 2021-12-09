import { ICustomerRepository } from "../../application/Interfaces/customer/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";
import { IndividualCustomer } from "../../domain/entities/IndividualCustomer";
import { ProfessionalCustomer } from "../../domain/entities/ProfessionalCustomer";
import { Address } from "../../domain/ValueObjects";

type ICustomerDTO = IProfessionalCustomerDTO | IIndividualalCustomerDTO;

interface IProfessionalCustomerDTO {
  siret: string;
  companyName: string;
  address: IAddressDTO;
}

interface IIndividualalCustomerDTO {
  id: string;
  firstName: string;
  lastName: string;
  address: IAddressDTO;
}

interface IAddressDTO {
  street: string;
  complement: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}

export class CustomerRepository implements ICustomerRepository {
  private _customers: ICustomerDTO[];

  constructor() {
    this._customers = [];
  }

  private isProfessionalCustomerDTO = (
    customer: any
  ): customer is IProfessionalCustomerDTO =>
    (customer as IProfessionalCustomerDTO).siret !== undefined;

  private domainToDTO = (customer: Customer): ICustomerDTO =>
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
          id: customer.id,
          firstName: (customer as unknown as IndividualCustomer).value.firstName
            .value,
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
  private dtoToDomain = (customer: ICustomerDTO): Customer =>
    new Customer(
      this.isProfessionalCustomerDTO(customer)
        ? new ProfessionalCustomer(
            new Address(
              customer.address.number,
              customer.address.street,
              customer.address.complement,
              customer.address.zipCode,
              customer.address.city,
              customer.address.country
            ),
            customer.companyName,
            customer.siret
          )
        : new IndividualCustomer(
            customer.id,
            new Address(
              customer.address.number,
              customer.address.street,
              customer.address.complement,
              customer.address.zipCode,
              customer.address.city,
              customer.address.country
            ),
            customer.firstName,
            customer.lastName
          )
    );
  create = async (customer: Customer) => {
    const id = this.isProfessionalCustomerDTO(customer)
      ? customer.siret
      : customer.id;
    const alreadyExistingCustomer = this._customers.find((c) =>
      this.isProfessionalCustomerDTO(c) ? c.siret === id : c.id === id
    );
    if (alreadyExistingCustomer)
      throw new Error(`A customer with id ${id} already exists.`);
    this._customers.push(this.domainToDTO(customer));
  };
  update = async (customer: Customer) => {
    const id = this.isProfessionalCustomerDTO(customer)
      ? customer.siret
      : customer.id;
    const alreadyExistingCustomerIndex = this._customers.findIndex((c) =>
      this.isProfessionalCustomerDTO(c) ? c.siret === id : c.id === id
    );
    if (alreadyExistingCustomerIndex < 0)
      throw new Error(`No customer with id ${id} exists.`);
    this._customers[alreadyExistingCustomerIndex] = this.domainToDTO(customer);
  };
  getById = async (id: string) => {
    const alreadyExistingCustomer = this._customers.find((c) =>
      this.isProfessionalCustomerDTO(c) ? c.siret === id : c.id === id
    );
    if (!alreadyExistingCustomer)
      throw new Error(`No customer with id ${id} exists.`);
    return this.dtoToDomain(alreadyExistingCustomer);
  };
}
