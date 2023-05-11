<template>
    <div class="box card w-full md:w-1/3 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
        <h2 class="text-lg font-semibold mb-4">
            {{ $route.query.context == "forgot-password" ? "Password Recovery" : "Acount Activation" }}
        </h2>
        <div class="flex w-full justify-center">
            <ElFormItem :error="error.email">
                <ElInput v-model="form.email" type="email" size="large" placeholder="enter your email" />
            </ElFormItem>
            <ElButton @click="sendLinkEmail" :loading="loading" type="success" size="large">Send</ElButton>
        </div>
        <p class="text-xs text-gray-500">*your email will be sent a link, please check under 6 hours</p>
        <NuxtLink to="/login" class="text-blue-500 hover:underline text-sm mt-6">back to login</NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
    nologin: true,
});

const route = useRoute();
const form = useForm({
    email: "",
});
const { resendTokenLink, errors, loading } = authController();

const error = computed(() => generateErrors(errors.value));

async function sendLinkEmail() {
    if (route.query.context) {
        await resendTokenLink({ context: route.query.context as string, email: form.email });
    }
}
</script>
