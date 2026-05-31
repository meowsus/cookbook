import { z } from "zod";

export const GetParamsSchema = z.object({
  sourceId: z.string(),
});

export type GetParamsType = z.infer<typeof GetParamsSchema>;

export type GetResponseData = {
  text: string;
};
