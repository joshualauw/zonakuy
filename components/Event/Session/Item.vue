<template>
    <div class="card rounded-md w-full space-y-6 mb-8">
        <div class="flex items-center justify-between">
            <p class="font-semibold">{{ session.title }}</p>
            <slot name="action"></slot>
        </div>
        <div class="space-y-2">
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:calendar-month" class="text-gray-500 mr-1 w-4 h-4"></Icon>
                {{ dayjs(session.day).format("ddd, D MMM YYYY") }}
            </p>
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:timer" class="text-gray-500 mr-1 w-4 h-4"></Icon>
                {{ session.start_time }} - {{ session.end_time }}
            </p>
        </div>
        <p class="text-sm text-gray-500">
            {{ session.description }}
        </p>
        <div class="flex flex-wrap items-center">
            <ElTag v-for="speaker in session.speaker" style="height: 65px" effect="plain" class="mb-4 mr-4" closable>
                <div class="box text-black text-sm space-x-2">
                    <NuxtImg :src="speaker.avatar ?? `/img/default_user.jpg`" class="rounded-full w-9 h-9"></NuxtImg>
                    <div>
                        <p>{{ speaker.name }}</p>
                        <p class="text-gray-500 text-sm">{{ speaker.role }}</p>
                    </div>
                </div>
            </ElTag>
            <ElButton @click="$emit('addSpeaker')" class="button-new-tag mb-4 mr-4" style="height: 65px">
                + Manage Speaker
            </ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Session } from "@prisma/client";
import dayjs from "dayjs";

defineProps<{ session: Session }>();
defineEmits(["addSpeaker"]);
</script>
