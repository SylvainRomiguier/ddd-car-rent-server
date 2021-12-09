import { Vehicule } from "../domain/entities/Vehicule";
import { IVehiculeInputPort } from "./Interfaces/vehicule/IVehiculeInputPort";
import { IVehiculeOutputPort } from "./Interfaces/vehicule/IVehiculeOutputPort";
import { IVehiculeRepository } from "./Interfaces/vehicule/IVehiculeRepository";

export class UpdateVehicule implements IVehiculeInputPort {
  private _repository: IVehiculeRepository;
  private _presenter: IVehiculeOutputPort;
  constructor(repository: IVehiculeRepository, presenter: IVehiculeOutputPort) {
    this._repository = repository;
    this._presenter = presenter;
  }
  handle = async (vehicule: Vehicule) => {
    await this._repository.update(vehicule);
    this._presenter.present(vehicule);
  };
}
