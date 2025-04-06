import { TReference } from "./references.dto";

export type TGetReferencesResponse = {
  data: { list: TReference[]; total: number };
  message: string;
};
