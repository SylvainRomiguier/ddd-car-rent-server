import { IModelInputPort } from "./Interfaces/model/IModelInputPort";
import { IModelsOutputPort } from "./Interfaces/model/IModelOutputPort";
import { IModelRepository } from "./Interfaces/model/IModelRepository";

export class GetAllModels implements IModelInputPort {
  private _repository: IModelRepository;
  private _presenter: IModelsOutputPort;
  constructor(repository: IModelRepository, presenter: IModelsOutputPort) {
    this._repository = repository;
    this._presenter = presenter;
  }
  handle = async () => {
    const response = await this._repository.getAll();
    this._presenter.present(response);
  };
}
