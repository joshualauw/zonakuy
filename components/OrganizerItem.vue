<template>
    <div>
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-4">
                <NuxtImg src="/img/default_user.jpg" class="w-12 h-12 rounded-full" />
                <div>
                    <p class="font-semibold">John Smith #{{ data }}</p>
                    <p class="text-gray-500 text-sm">12 Events Created</p>
                </div>
            </div>
            <ElButton type="success" round size="small">visit</ElButton>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script setup lang="ts">
defineProps(["data"]);
</script>
