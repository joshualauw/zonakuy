<template>
    <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                <img
                    alt="Pattern"
                    src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg"
                    class="absolute inset-0 h-full w-full object-cover"
                />
            </aside>

            <main
                aria-label="Main"
                class="flex justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div class="max-w-xl lg:max-w-3xl rounded-xl">
                    <span class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl inline">
                        Welcome to <Logo />
                    </span>

                    <p class="mt-4 leading-relaxed text-gray-500">
                        The best event platform for hybrid and event meeting, we will wait for your arrivance!
                    </p>

                    <ElForm class="mt-8 space-y-4" label-position="top">
                        <ElFormItem label="Email">
                            <ElInput
                                v-model="form.email"
                                type="text"
                                size="large"
                                :class="{ 'border border-red-500': error.email }"
                            />
                            <p v-if="error.email" class="mt-0.5 text-xs text-red-500">{{ error.email }}</p>
                        </ElFormItem>

                        <ElFormItem label="Password">
                            <ElInput
                                v-model="form.password"
                                type="password"
                                size="large"
                                :class="{ 'border border-red-500': error.password }"
                            />
                            <p v-if="error.password" class="mt-0.5 text-xs text-red-500">{{ error.password }}</p>
                        </ElFormItem>

                        <div class="sm:flex sm:items-center sm:gap-4">
                            <ElButton @click="doSignIn" type="success" size="large" :loading="loading"
                                >Sign In</ElButton
                            >
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                Doesn't have an account?
                                <NuxtLink to="/register" class="text-gray-700 underline">Register</NuxtLink>.
                            </p>
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                activate an account?
                                <NuxtLink to="/activate" class="text-gray-700 underline">Activate</NuxtLink>.
                            </p>
                        </div>
                    </ElForm>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
    nologin: true,
});

const { signIn, verifyAccount, loading, errors } = authController();
const route = useRoute();

const form = reactive({
    email: "",
    password: "",
});
const error = computed(() => generateErrorChecks(errors.value, { ...form }));

if (route.query.token && route.query.email) {
    await verifyAccount({ email: route.query.email as string, token: route.query.token as string });
    route.query.token = null;
    route.query.email = null;
}

async function doSignIn() {
    const res = await signIn({ ...form });
    if (res.success && res.output) {
        if (res.output.data.user.role == "user") {
            return navigateTo({ path: route.redirectedFrom?.fullPath ?? "/event", replace: true });
        } else {
            return navigateTo({ path: "/login", replace: true });
        }
    }
}
</script>
