import yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
    username: yup
        .string()
        .required()
        .trim()
        .transform((v: string) => v.toLowerCase().replaceAll(" ", "")),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup.string().oneOf([yup.ref("password")], "password must match"),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;

export const emailVerifySchema = yup.object({
    email: yup.string().email().required(),
    token: yup.string().required(),
});

export type EmailVerifySchema = yup.InferType<typeof emailVerifySchema>;
