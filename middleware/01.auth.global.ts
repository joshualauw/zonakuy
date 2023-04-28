export default defineNuxtRouteMiddleware((to, from) => {
    const user = authStore();

    if (!to.meta.public && !user.value) {
        return navigateTo("/login");
    }
    if (to.meta.nologin && user.value) {
        return navigateTo(from.redirectedFrom?.fullPath ?? "/event");
    }
});
