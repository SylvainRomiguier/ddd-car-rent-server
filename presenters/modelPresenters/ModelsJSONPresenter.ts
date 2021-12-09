import { IModelsOutputPort } from "../../application/Interfaces/model/IModelOutputPort";
import { Model } from "../../domain/entities/Model";

export class ModelsJSONPresenter implements IModelsOutputPort {
  private _json: { name: string; brand: string }[] = [];
  get value() {
    return this._json;
  }
  present = (models: Model[]) => {
    this._json = models.map((m) => ({
      name: m.name.value,
      brand: m.brand.value,
    }));
  };
}
