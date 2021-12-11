import { CreateModel } from "../../application/createModel";
import { GetAllModels } from "../../application/getAllModels";
import { RemoveModel } from "../../application/removeModel";
import { ModelRepository } from "../../dataProviders/model/modelRepository";
import { Model } from "../../domain/entities/Model";
import { ModelJSONPresenter } from "../../presenters/modelPresenters/ModelJSONPresenter";
import { ModelsJSONPresenter } from "../../presenters/modelPresenters/ModelsJSONPresenter";

interface Response {
  success: boolean;
  message: string;
}

export class ModelGraphQLController {
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

  get typeDefs() {
    return `
  type Model {
    name: String!
    brand: String!
  }
  type Response {
    success: Boolean!
    message: String!
  }
  type Query {
    getModels: [Model]!
  }
  type Mutation {
    addModel(name: String!, brand: String!): Response!
    updateModel(originalName:String!, originalBrand:String!, updatedName:String!, updatedBrand:String!): Response!
    removeModel(name: String!, brand: String!): Response!
  }
  `;
  }

  get resolvers() {
    return {
      Query: {
        getModels: this.getAll,
      },
      Mutation: {
        addModel: this.createModel,
        updateModel: this.updateModel,
        removeModel: this.removeModel,
      },
    };
  }

  createModel = async (
    _: any,
    args: { name: string; brand: string }
  ): Promise<Response> => {
    try {
      const modelToAdd = new Model(args.name, args.brand);
      await this._createModel.handle(modelToAdd);
      return { success: true, message: "model added." };
    } catch (e) {
      console.log((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  };
  updateModel = async (
    _: any,
    args: {
      originalName: string;
      originalBrand: string;
      updatedName: string;
      updatedBrand: string;
    }
  ): Promise<Response> => {
    try {
      const modelToRemove = new Model(args.originalName, args.originalBrand);
      const modelToAdd = new Model(args.updatedName, args.updatedBrand);
      await this._removeModel.handle(modelToRemove);
      await this._createModel.handle(modelToAdd);
      return { success: true, message: "model updated." };
    } catch (e) {
      console.log((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  };
  removeModel = async (
    _: any,
    args: { name: string; brand: string }
  ): Promise<Response> => {
    try {
      const modelToRemove = new Model(args.name, args.brand);
      await this._removeModel.handle(modelToRemove);
      return { success: true, message: "model removed." };
    } catch (e) {
      console.log((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  };
  getAll = async () => {
    try {
      await this._getAllModels.handle();
      return this._presenterList.value;
    } catch (e) {
      console.log((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  };
}
