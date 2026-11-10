import z from "zod";

export const insertTodoSchema = z.object({
  text: z.string().min(2, "text must be at least 2 charcters"),
  done: z.boolean().default(false),
});

export const updateTodoSchema = insertTodoSchema.partial();

export const registerSchema = z
  .object({
    username: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords don't match",
    path: ["confirm_password"], // path of error
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})
