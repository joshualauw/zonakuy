export default defineNuxtRouteMiddleware((to, from) => {
    const user = authStore();

    if (!to.meta.public && !user.value) {
        return navigateTo("/login");
    }
    if (["/login", "/register"].includes(to.fullPath) && user.value) {
        return navigateTo(from.redirectedFrom?.fullPath ?? "/event");
    }
});
