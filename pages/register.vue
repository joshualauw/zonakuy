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
                        <ElFormItem label="Username">
                            <ElInput
                                v-model="form.username"
                                type="text"
                                size="large"
                                :class="{ 'border border-red-500': error.username }"
                            />
                            <p v-if="error.username" class="mt-0.5 text-xs text-red-500">{{ error.username }}</p>
                        </ElFormItem>

                        <ElFormItem label="Email">
                            <ElInput
                                v-model="form.email"
                                type="text"
                                size="large"
                                :class="{ 'border border-red-500': error.email }"
                            />
                            <p v-if="error.email" class="mt-0.5 text-xs text-red-500">{{ error.email }}</p>
                        </ElFormItem>

                        <ElRow :gutter="20">
                            <ElCol :span="12">
                                <ElFormItem label="Password">
                                    <ElInput
                                        v-model="form.password"
                                        type="password"
                                        size="large"
                                        :class="{ 'border border-red-500': error.password }"
                                    />
                                    <p v-if="error.password" class="mt-0.5 text-xs text-red-500">
                                        {{ error.password }}
                                    </p>
                                </ElFormItem></ElCol
                            >
                            <ElCol :span="12">
                                <ElFormItem label="Password Confirmation">
                                    <ElInput
                                        v-model="form.password_confirmation"
                                        type="password"
                                        size="large"
                                        :class="{ 'border border-red-500': error.password_confirmation }"
                                    />
                                    <p v-if="error.password_confirmation" class="mt-0.5 text-xs text-red-500">
                                        {{ error.password_confirmation }}
                                    </p>
                                </ElFormItem>
                            </ElCol>
                        </ElRow>

                        <div class="sm:flex sm:items-center sm:gap-4">
                            <ElButton @click="doSignUp" type="success" size="large" :loading="loading"
                                >Sign Up</ElButton
                            >
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <NuxtLink to="/login" class="text-gray-700 underline">Log in</NuxtLink>.
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

const { signUp, loading, errors } = authController();

const form = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const error = computed(() => generateErrorChecks(errors.value, { ...form }));

async function doSignUp() {
    const { error } = await signUp({ ...form });
    if (!error.value) {
        form.reset();
    }
}
</script>
