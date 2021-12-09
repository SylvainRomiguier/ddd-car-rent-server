import { Vehicule } from "../../../domain/entities/Vehicule";

export interface IVehiculeOutputPort {
  present: (vehicule: Vehicule) => void;
}
