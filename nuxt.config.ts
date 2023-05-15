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
        UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
        UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        public: {
            BASE_URL: process.env.BASE_URL,
        },
    },

    imports: {
        dirs: ["composables", "composables/*/index.{ts,js,mjs,mts}", "composables/**"],
    },

    modules: [
        "@nuxtjs/tailwindcss",
        "@element-plus/nuxt",
        "nuxt-icon",
        "@nuxt/image-edge",
        "nuxt-typed-router",
        "nuxt-lodash",
    ],
    image: {
        domains: ["localhost", "netlify"],
        provider: "ipx",
        cloudinary: { baseURL: "https://res.cloudinary.com/joshualauw/image/upload/v1683794370" },
    },

    alias: {
        public: "/<rootDir>/public/_ipx",
    },

    devtools: {
        enabled: false,
    },
});
