export default defineNuxtRouteMiddleware((to, from) => {
    const user = authStore();

    if (user.value && user.value.credentials.role != "admin") {
        return navigateTo("/login");
    }
});
