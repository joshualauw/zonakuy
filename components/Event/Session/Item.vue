<template>
    <div class="card rounded-md w-full space-y-6 mb-8">
        <div class="flex items-center justify-between">
            <p class="font-semibold">Starting Speech</p>
            <slot name="action"></slot>
        </div>
        <div class="space-y-2">
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:calendar-month" class="text-gray-500 mr-1 w-4 h-4"></Icon>Mon, 28 April
                2023
            </p>
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:timer" class="text-gray-500 mr-1 w-4 h-4"></Icon>10.00 - 12.00
            </p>
        </div>
        <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempora voluptates nostrum, enim corrupti
            temporibus illo molestiae aperiam nulla soluta recusandae accusamus ipsum placeat officia exercitationem et
            totam ut nam?
        </p>
        <div class="flex flex-wrap items-center">
            <ElTag v-for="i in 4" style="height: 65px" effect="plain" class="mb-4 mr-4" closable>
                <div class="box text-black text-sm space-x-2">
                    <NuxtImg src="/img/default_user.jpg" class="rounded-full w-9 h-9"></NuxtImg>
                    <span>Idris Elba</span>
                </div>
            </ElTag>
            <ElButton @click="modalVisible = true" class="button-new-tag mb-4 mr-4" style="height: 65px">
                + New Speaker
            </ElButton>
        </div>
    </div>
    <EventSessionSpeakerCreate @closed="modalVisible = false" :visible="modalVisible" />
</template>

<script setup lang="ts">
const modalVisible = ref(false);
</script>
