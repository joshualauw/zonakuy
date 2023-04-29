<template>
    <div class="min-h-screen bg-slate-100">
        <slot></slot>
    </div>
    <Loader :loading="globalLoading" />
</template>

<script setup lang="ts">
const globalLoading = loadingStore();
</script>
