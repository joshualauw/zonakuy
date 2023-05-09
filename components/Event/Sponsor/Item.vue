<template>
    <div class="card p-6 rounded-md flex-col w-full space-y-4">
        <p class="font-semibold">BCA</p>
        <div class="flex flex-col h-80 overflow-hidden">
            <NuxtImg src="/img/default_event.jpg" class="rounded-md h-48 mb-4"></NuxtImg>
            <ElScrollbar class="text-sm text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius maxime, accusamus consectetur ab facilis
                adipisci (Contact: 0821938291822)
            </ElScrollbar>
        </div>
        <slot name="action"></slot>
    </div>
</template>

<script setup lang="ts">
defineEmits(["edit"]);
</script>
