import { Model } from "../domain/entities/Model";
import { IModelInputPort } from "./Interfaces/model/IModelInputPort";
import { IModelOutputPort } from "./Interfaces/model/IModelOutputPort";
import { IModelRepository } from "./Interfaces/model/IModelRepository";

export class CreateModel implements IModelInputPort {
  private _repository: IModelRepository;
  private _presenter: IModelOutputPort;
  constructor(repository: IModelRepository, presenter: IModelOutputPort) {
    this._repository = repository;
    this._presenter = presenter;
  }
  handle = async (model?: Model) => {
    if (!model) throw "A model is mandatory.";
    await this._repository.create(model);
    this._presenter.present(model);
  };
}

export default CreateModel;
