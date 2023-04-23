import { User } from "@prisma/client";
import Joi from "joi";

export type LoginSchema = Pick<User, "email" | "password">;

export const loginSchema = Joi.object<LoginSchema>({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

export type RegisterSchema = Pick<User, "username" | "email" | "password"> & {
    password_confirmation: string;
};

export const registerSchema = Joi.object<RegisterSchema>({
    username: Joi.string().required().trim().lowercase().replace(" ", ""),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "password doesn't match",
        })
        .label("password confirmation"),
});

export type EmailVerifySchema = Pick<User, "email"> & { token: string };

export const emailVerifySchema = Joi.object<EmailVerifySchema>({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
});
