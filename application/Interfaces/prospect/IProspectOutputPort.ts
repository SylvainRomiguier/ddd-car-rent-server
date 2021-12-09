import { Prospect } from "../../../domain/Aggregates/Prospect";

export interface IProspectOutputPort {
  present: (prospect: Prospect) => void;
}
