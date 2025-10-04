import { z } from "zod";

export const GetParamsSchema = z.object({
  sourceId: z.string().nonempty(),
});

export type GetParamsType = z.infer<typeof GetParamsSchema>;

export interface GetResponseData {
  text: string;
}
