import Xendit from "xendit-node";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const x = new Xendit({
        secretKey: config.XENDIT_SECRET_KEY,
    });

    return {
        provide: {
            Xendit: x,
        },
    };
});
