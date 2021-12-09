import { Customer } from "../domain/entities/Customer";
import { ICustomerInputPort } from "./Interfaces/customer/ICustomerInputPort";
import { ICustomerOutputPort } from "./Interfaces/customer/ICustomerOutputPort";
import { ICustomerRepository } from "./Interfaces/customer/ICustomerRepository";

export class CreateCustomer implements ICustomerInputPort {
  private _repository: ICustomerRepository;
  private _presenter: ICustomerOutputPort;
  constructor(repository: ICustomerRepository, presenter: ICustomerOutputPort) {
    this._repository = repository;
    this._presenter = presenter;
  }
  handle = async (customer: Customer) => {
    await this._repository.create(customer);
    this._presenter.present(customer);
  };
}
