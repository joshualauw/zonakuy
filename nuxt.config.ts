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
        public: {
            BASE_URL: process.env.BASE_URL,
        },
    },

    imports: {
        dirs: ["composables", "composables/*/index.{ts,js,mjs,mts}", "composables/**"],
    },

    modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "nuxt-icon", "@nuxt/image-edge"],
    image: { domains: ["localhost", "netlify"], provider: "ipx" },

    alias: {
        public: "/<rootDir>/public/_ipx",
    },

    devtools: {
        enabled: true
    }
});
