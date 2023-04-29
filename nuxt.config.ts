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
        CRYPTO_KEY: process.env.CRYPTO_KEY,
        BASE_URL: process.env.NODE_ENV == "development" ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD,
    },
    imports: {
        dirs: ["composables", "composables/*/index.{ts,js,mjs,mts}", "composables/**"],
    },
    modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "nuxt-icon", "@nuxt/image-edge"],
    image: { domains: ["localhost"], provider: "ipx" },
});
