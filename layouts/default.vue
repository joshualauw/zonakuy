<template>
    <div class="min-h-screen bg-slate-50">
        <slot></slot>
        <Loader :loading="globalLoading" />
    </div>
</template>

<script setup lang="ts">
const globalLoading = loadingStore();
</script>
