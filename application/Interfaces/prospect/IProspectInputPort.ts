import { Prospect } from "../../../domain/entities/Prospect";

export interface IProspectInputPort {
  handle: (prospect: Prospect) => void;
}
