import { Prospect } from "../domain/Aggregates/Prospect";
import { IProspectInputPort } from "./Interfaces/prospect/IProspectInputPort";
import { IProspectOutputPort } from "./Interfaces/prospect/IProspectOutputPort";
import { IProspectRepository } from "./Interfaces/prospect/IProspectRepository";

export class CreateProspect implements IProspectInputPort {
  private _repository: IProspectRepository;
  private _presenter: IProspectOutputPort;
  constructor(repository: IProspectRepository, presenter: IProspectOutputPort) {
    this._repository = repository;
    this._presenter = presenter;
  }
  handle = async (prospect: Prospect) => {
    await this._repository.create(prospect);
    this._presenter.present(prospect);
  };
}
