import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().trim().email({
    message: "Invalid email address (please enter a valid email address)",
  }),
});
