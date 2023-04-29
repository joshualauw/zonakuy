<template>
    <span @click="link ? navigateTo('/event') : () => {}" class="text-amber-500 font-extrabold cursor-pointer"
        >Zona<span :class="invert ? 'text-white' : 'text-gray-800'">Kuy</span>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    invert?: boolean;
    link?: boolean;
}>();
</script>
