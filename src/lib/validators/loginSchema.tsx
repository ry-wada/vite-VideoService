import { z } from "zod";

export const loginSchema = z
  .object({
    username: z
      .string()
      .min(8, "ユーザー名は8文字以上である必要があります")
      .max(15, "ユーザー名は15文字以下である必要があります")
      .regex(/^[a-zA-Z0-9]+$/, "ユーザー名は半角英数字である必要があります"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(10, "パスワードは10文字以上である必要があります")
      .regex(/^[a-zA-Z0-9]+$/, "パスワードは半角英数字である必要があります"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "パスワードが一致しません",
        path: ["confirmPassword"],
      });
    }
  });
