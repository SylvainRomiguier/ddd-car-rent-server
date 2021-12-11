import { Prospect } from "../../../domain/entities/Prospect";

export interface IProspectOutputPort {
  present: (prospect: Prospect) => void;
}
