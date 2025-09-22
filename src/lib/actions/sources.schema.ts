import { z } from "zod";
import { zfd } from "zod-form-data";

export const CreateSourceSchema = z.object({
  url: z.url("A valid URL is required").nonempty(),
});
