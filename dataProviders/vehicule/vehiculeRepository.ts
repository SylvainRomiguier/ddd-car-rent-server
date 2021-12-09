import { IVehiculeRepository } from "../../application/Interfaces/vehicule/IVehiculeRepository";
import { Model } from "../../domain/entities/Model";
import { Vehicule } from "../../domain/entities/Vehicule";

interface IVehiculeDTO {
  registrationId: string;
  model: { name: string; brand: string };
  picture: string;
  originalInServiceDate: Date;
  mileage: number;
}

export class VehiculeRepository implements IVehiculeRepository {
  private _vehicules: IVehiculeDTO[];
  constructor() {
    this._vehicules = [];
  }
  private domainToDTO = (vehicule: Vehicule): IVehiculeDTO => ({
    registrationId: vehicule.registrationId.value,
    model: {
      name: vehicule.model.name.value,
      brand: vehicule.model.brand.value,
    },
    picture: vehicule.picture.value,
    originalInServiceDate: vehicule.originalInServiceDate,
    mileage: vehicule.mileage.value,
  });
  private dtoToDomain = (vehicule: IVehiculeDTO): Vehicule =>
    new Vehicule(
      vehicule.registrationId,
      new Model(vehicule.model.name, vehicule.model.brand),
      vehicule.originalInServiceDate,
      vehicule.picture,
      vehicule.mileage
    );
  create = async (vehicule: Vehicule) => {
    const alreadyExistingVehicule = this._vehicules.find(
      (v) => v.registrationId === vehicule.registrationId.value
    );
    if (alreadyExistingVehicule)
      throw new Error(
        `Vehicule with ${vehicule.registrationId.value} already exists.`
      );
    this._vehicules.push(this.domainToDTO(vehicule));
  };
  update = async (vehicule: Vehicule) => {
    const alreadyExistingVehiculeIndex = this._vehicules.findIndex(
      (v) => v.registrationId === vehicule.registrationId.value
    );
    if (alreadyExistingVehiculeIndex < 0)
      throw new Error(
        `No vehicule with ${vehicule.registrationId.value} exists.`
      );
    this._vehicules[alreadyExistingVehiculeIndex] = this.domainToDTO(vehicule);
  };
  getById = async (id: string) => {
    const alreadyExistingVehicule = this._vehicules.find(
      (v) => v.registrationId === id
    );
    if (!alreadyExistingVehicule)
      throw new Error(`No vehicule with ${id} exists.`);
    return this.dtoToDomain(alreadyExistingVehicule);
  };
  getAll = async () => this._vehicules.map((v) => this.dtoToDomain(v));
}
