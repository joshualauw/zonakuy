<template>
    <div class="box card w-full md:w-1/3 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
        <ElForm class="w-full" label-position="top">
            <h2 class="text-lg font-semibold mb-4">Reset Password</h2>
            <ElFormItem label="Password" :error="error.password">
                <ElInput v-model="form.password" type="text" size="large" />
            </ElFormItem>

            <ElFormItem label="Password Confirmation" :error="error.password_confirmation">
                <ElInput v-model="form.password_confirmation" type="text" size="large" />
            </ElFormItem>

            <ElButton @click="doResetPassword" :loading="loading" type="success" size="large">Reset</ElButton>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
    nologin: true,
});

const route = useRoute();
const { resetPassword, errors, loading } = authController();

const form = useForm({
    password: "",
    password_confirmation: "",
});

const error = computed(() => generateErrors(errors.value));

async function doResetPassword() {
    if (route.query.email && route.query.token) {
        const { error } = await resetPassword({
            ...form,
            email: route.query.email as string,
            token: route.query.token as string,
        });
        if (!error.value) {
            navigateTo("/login");
        }
    }
}
</script>
