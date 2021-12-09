import { Model } from "./Model";
import { RegistrationId, PictureURL, Mileage } from "../ValueObjects";
import { ValueOrEntityObject } from "../types";

interface IVehicule {
  registrationId: RegistrationId;
  model: Model;
  picture: PictureURL;
  originalInServiceDate: Date;
  mileage: Mileage;
}

export class Vehicule implements ValueOrEntityObject<IVehicule> {
  private _value: IVehicule;

  constructor(
    registrationId?: string,
    model?: Model,
    originalInServiceDate?: Date,
    pictureURL?: string,
    mileage?: number
  ) {
    if (!model || !originalInServiceDate)
      throw new Error("A model and original in-service date are mandatory.");
    if (originalInServiceDate.getTime() > new Date().getTime())
      throw new Error(
        "The original in-service date can not be greater than now."
      );
    this._value = {
      registrationId: new RegistrationId(registrationId),
      model,
      picture: new PictureURL(pictureURL),
      mileage: new Mileage(mileage),
      originalInServiceDate: originalInServiceDate,
    };
  }

  get registrationId() {
    return this._value.registrationId;
  }
  get model() {
    return this._value.model;
  }
  get originalInServiceDate() {
    return this._value.originalInServiceDate;
  }
  get picture() {
    return this._value.picture;
  }
  get mileage() {
    return this._value.mileage;
  }

  isEqual = (other: unknown) => {
    if (
      other instanceof Vehicule &&
      other.registrationId.isEqual(this.registrationId)
    )
      return true;
    return false;
  };
}
