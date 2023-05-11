<template>
    <div class="card p-6 rounded-md flex-col w-full space-y-4">
        <p class="font-semibold">{{ sponsor.name }}</p>
        <div class="flex flex-col overflow-hidden h-[300px]">
            <NuxtImg
                :src="sponsor.logo ?? '/img/default_event.jpg'"
                class="rounded-md w-40 h-40 self-center mb-4"
            ></NuxtImg>
            <ElScrollbar class="text-sm text-left text-gray-600 p-2">
                {{ sponsor.description }}
            </ElScrollbar>
        </div>
        <slot name="action"></slot>
    </div>
</template>

<script setup lang="ts">
import { Sponsor } from "@prisma/client";

defineProps<{ sponsor: Sponsor }>();
</script>
