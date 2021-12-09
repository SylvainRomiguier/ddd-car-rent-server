import { Vehicule } from "../../../domain/entities/Vehicule";

export interface IVehiculeInputPort {
  handle: (vehicule: Vehicule) => void;
}
