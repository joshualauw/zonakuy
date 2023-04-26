<template>
    <ElButton @click="doSignOut">Sign Out</ElButton>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
});

const { signOut } = authController();

async function doSignOut() {
    await signOut();
    navigateTo("/login");
}
</script>
