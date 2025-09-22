import { z } from "zod";

export const CreateSourceSchema = z.object({
  url: z.url("A valid URL is required").nonempty(),
});
