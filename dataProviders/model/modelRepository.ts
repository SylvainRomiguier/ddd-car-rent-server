import { IModelRepository } from "../../application/Interfaces/model/IModelRepository";
import { Model } from "../../domain/entities/Model";

interface IModelDTO {
  name: string;
  brand: string;
}

export class ModelRepository implements IModelRepository {
  private _models: IModelDTO[];
  constructor() {
    this._models = [];
  }
  private domainToDTO = (model: Model): IModelDTO => ({
    name: model.name.value,
    brand: model.brand.value,
  });
  private dtoToDomain = (model: IModelDTO): Model =>
    new Model(model.name, model.brand);
  create = async (model: Model) => {
    const alreadyExistingModel = this._models.find(
      (m) => m.name === model.name.value && m.brand === model.brand.value
    );
    if (alreadyExistingModel)
      throw new Error(
        `A model already exists with name ${model.name.value} and brand ${model.brand.value}`
      );
    this._models.push(this.domainToDTO(model));
  };
  remove = async (model: Model) => {
    const alreadyExistingModel = this._models.find(
      (m) => m.name === model.name.value && m.brand === model.brand.value
    );
    if (!alreadyExistingModel)
      throw new Error(
        `No model exists with name ${model.name.value} and brand ${model.brand.value}`
      );
    this._models = this._models.filter(
      (m) => !(m.name === model.name.value && m.brand === model.brand.value)
    );
  };
  getAll = async () => this._models.map((m) => this.dtoToDomain(m));
}
