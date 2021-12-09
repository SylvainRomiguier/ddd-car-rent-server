import { Model } from "../../../domain/entities/Model";

export interface IModelRepository {
  create: (model: Model) => Promise<void>;
  remove: (model: Model) => Promise<void>;
  getAll: () => Promise<Model[]>;
}
