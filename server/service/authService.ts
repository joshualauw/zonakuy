import { Prisma } from "@prisma/client";
import prisma from "../utils/prismaClient";

export default function () {
    async function findMany(query: Prisma.UserFindManyArgs) {
        try {
            return await prisma.user.findMany(query);
        } catch (err) {
            throw createError({ statusCode: 500, message: ErrorType.database, data: err });
        }
    }

    async function findFirst(query: Prisma.UserFindFirstArgs) {
        try {
            const user = await prisma.user.findFirst(query);
            if (!user) throw createError({ statusCode: 404, message: ErrorType.not_found, data: "user not found" });

            return user;
        } catch (err) {
            throw createError({ statusCode: 500, message: ErrorType.database, data: err });
        }
    }

    async function create(data: Prisma.UserCreateArgs) {
        try {
            return await prisma.user.create(data);
        } catch (err) {
            throw createError({ statusCode: 500, message: ErrorType.database, data: err });
        }
    }

    async function update(data: Prisma.UserUpdateArgs) {
        try {
            return await prisma.user.update(data);
        } catch (err) {
            throw createError({ statusCode: 500, message: ErrorType.database, data: err });
        }
    }

    return { findMany, findFirst, create, update };
}
