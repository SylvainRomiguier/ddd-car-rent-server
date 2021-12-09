import { Model } from "../../../domain/entities/Model";

export interface IModelInputPort {
  handle: (model?: Model) => Promise<void>;
}
