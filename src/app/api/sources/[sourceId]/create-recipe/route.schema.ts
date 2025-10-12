import { z } from "zod";

export const GetParamsSchema = z.object({
  sourceId: z.string().nonempty(),
});

export type GetParamsType = z.infer<typeof GetParamsSchema>;

export const GetResponseDataSchema = z.object({
  name: z.string().nonempty(),
  content: z.string().nonempty(),
});

export type GetResponseDataType = z.infer<typeof GetResponseDataSchema>;
