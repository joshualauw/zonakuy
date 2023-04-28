import jwt from "jsonwebtoken";

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie("token");
    const user = authStore();

    if (token.value) {
        const decoded = jwt.decode(token.value);
        user.value = { ...deserialize(decoded), token: token.value };
    }
});
