// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "ZonaKuy | Zona Event Platform",
        },
    },
    runtimeConfig: {
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        JWT_SECRET: process.env.JWT_SECRET,
    },
});
