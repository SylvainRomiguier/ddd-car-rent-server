import { Prospect } from "../../../domain/Aggregates/Prospect";

export interface IProspectInputPort {
  handle: (prospect: Prospect) => void;
}
