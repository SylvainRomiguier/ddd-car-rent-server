import { IVehiculeOutputPort } from "../../application/Interfaces/vehicule/IVehiculeOutputPort";
import { Vehicule } from "../../domain/entities/Vehicule";

export class VehiculeJSONPresenter implements IVehiculeOutputPort {
  private _json: {
    registrationId: string;
    modelName: string;
    modelBrand: string;
    originalInServiceDate: string;
    mileage: string;
    pictureURL: string;
  } = {
    registrationId: "",
    modelName: "",
    modelBrand: "",
    originalInServiceDate: "",
    mileage: "",
    pictureURL: "",
  };
  get() {
    return this._json;
  }
  present = (vehicule: Vehicule) => {
    this._json = {
      registrationId: vehicule.registrationId.value,
      modelName: vehicule.model.name.value,
      modelBrand: vehicule.model.brand.value,
      originalInServiceDate:
        vehicule.originalInServiceDate.toLocaleDateString("fr-FR"),
      mileage: vehicule.mileage.value.toLocaleString("fr-FR"),
      pictureURL: vehicule.picture.value,
    };
  };
}
