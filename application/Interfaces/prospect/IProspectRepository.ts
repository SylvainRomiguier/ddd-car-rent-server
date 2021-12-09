import { Prospect } from "../../../domain/Aggregates/Prospect";

export interface IProspectRepository {
  create: (prospect: Prospect) => Promise<void>;
  update: (prospect: Prospect) => Promise<void>;
}

export interface IProspectDTO {
  ipAddress: string;
}
