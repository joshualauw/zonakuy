<template>
    <div class="box card w-full md:w-1/3 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
        <h2 class="text-lg font-semibold mb-4">Resend Email Verification Link</h2>
        <div class="flex w-full justify-center space-x-4">
            <ElFormItem>
                <ElInput
                    v-model="form.email"
                    type="email"
                    :class="{ 'border border-red-500': error.email }"
                    size="large"
                    placeholder="enter your email"
                />
                <p v-if="error.email" class="mt-0.5 text-xs text-red-500">{{ error.email }}</p>
            </ElFormItem>
            <ElButton @click="doResendVerificationLink" :loading="loading" type="success" size="large">Send</ElButton>
        </div>
        <NuxtLink to="/login" class="text-blue-500 hover:underline text-sm">back to login</NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
    nologin: true,
});

const form = useForm({
    email: "",
});
const { resendVerificationLink, errors, loading } = authController();

const error = computed(() => generateErrorChecks(errors.value, { ...form }));

async function doResendVerificationLink() {
    await resendVerificationLink(form.email);
}
</script>
