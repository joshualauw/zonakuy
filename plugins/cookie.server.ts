import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie("token");
    const user = authStore();

    if (token.value) {
        const decoded = jwt.decode(token.value) as Omit<User, "password">;
        user.value = { ...decoded, token: token.value };
    }
});
