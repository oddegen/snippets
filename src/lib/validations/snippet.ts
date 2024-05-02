import * as z from "zod";

export const snippetSchema = z.object({
  title: z.string().max(128).optional(),
  content: z.string().optional(),
});
