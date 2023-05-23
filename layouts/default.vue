<template>
    <main class="min-h-screen bg-slate-50">
        <slot></slot>
    </main>
    <Loader :loading="globalLoading" />
</template>

<script setup lang="ts">
const globalLoading = loadingStore();
</script>
