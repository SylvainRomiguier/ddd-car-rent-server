import { CreateModel } from "../../application/createModel";
import { GetAllModels } from "../../application/getAllModels";
import { RemoveModel } from "../../application/removeModel";
import { ModelRepository } from "../../dataProviders/model/modelRepository";
import { Model } from "../../domain/entities/Model";
// import { ModelConsolePresenter } from "../../presenters/modelPresenters/ModelConsolePresenter";
import { ModelJSONPresenter } from "../../presenters/modelPresenters/ModelJSONPresenter";
import { ModelsJSONPresenter } from "../../presenters/modelPresenters/ModelsJSONPresenter";

export class ModelConsoleController {
  private _createModel: CreateModel;
  private _removeModel: RemoveModel;
  private _getAllModels: GetAllModels;
  private _presenter: ModelJSONPresenter;
  private _presenterList: ModelsJSONPresenter;
  constructor(modelRepository: ModelRepository) {
    this._presenter = new ModelJSONPresenter();
    this._presenterList = new ModelsJSONPresenter();
    this._createModel = new CreateModel(modelRepository, this._presenter);
    this._removeModel = new RemoveModel(modelRepository, this._presenter);
    this._getAllModels = new GetAllModels(modelRepository, this._presenterList);
  }
  createModel = async (name: string, brand: string) => {
    try {
      const model = new Model(name, brand);
      await this._createModel.handle(model);
      console.log(this._presenter.value, " added");
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  updateModel = async (
    oldName: string,
    newName: string,
    oldBrand: string,
    newBrand: string
  ) => {
    try {
      const modelToRemove = new Model(oldName, oldBrand);
      const modelToAdd = new Model(newName, newBrand);
      await this._removeModel.handle(modelToRemove);
      console.log(this._presenter.value, " replaced by : ");
      await this._createModel.handle(modelToAdd);
      console.log(this._presenter.value);
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  removeModel = async (name: string, brand: string) => {
    try {
      const modelToRemove = new Model(name, brand);
      await this._removeModel.handle(modelToRemove);
      console.log(this._presenter.value, " removed");
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  getAll = async () => {
    try {
      await this._getAllModels.handle();
      console.log(this._presenterList.value);
    } catch (e) {
      console.log((e as Error).message);
    }
  };
}
