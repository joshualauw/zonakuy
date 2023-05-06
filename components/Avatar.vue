<template>
    <div>
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <NuxtImg :src="image ?? '/img/default_user.jpg'" class="w-10 h-10 rounded-full" />
                <div>
                    <p class="font-semibold text-sm">{{ name }}</p>
                    <p class="text-xs opacity-80">{{ description }}</p>
                </div>
            </div>
            <slot name="action"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    description: string;
    image?: string | null;
}>();
</script>
