<template>
    <span class="text-amber-500 font-extrabold"
        >Zona<span :class="invert ? 'text-white' : 'text-gray-800'">Kuy</span>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    invert?: boolean;
}>();
</script>
