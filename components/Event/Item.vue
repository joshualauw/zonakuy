<template>
    <div
        class="card p-0 relative flex flex-col h-[200px] xl:h-[400px] w-full text-sm hover:scale-[1.02] transition-all duration-200"
    >
        <NuxtImg class="w-full hidden xl:block xl:h-[200px]" :src="event.banner ?? '/img/default_event.jpg'" />
        <div class="h-full p-4">
            <h1 class="font-bold text-base hover:underline cursor-pointer">{{ event.name }}</h1>
            <p class="font-extrabold text-base text-green-500 mb-3">Rp. 25.000</p>
            <div class="space-y-0.5 text-gray-500 text-xs mb-2">
                <p>
                    <Icon name="material-symbols:timer" class="mr-1"></Icon>
                    {{ dayjs(event.start_date).format("ddd, D MMM YYYY") }} -
                    {{ dayjs(event.end_date).format("ddd, D MMM YYYY") }}
                </p>
                <p><Icon name="material-symbols:location-on" class="mr-2"></Icon>{{ event.location ?? "-" }}</p>
                <p><Icon name="material-symbols:person" class="mr-2" />{{ event.limit }} Limit</p>
            </div>
            <ElTag
                v-for="tag in event.tags"
                size="small"
                class="mr-1.5 mt-1.5 cursor-pointer hover:brightness-90"
                type="info"
            >
                {{ tag }}
            </ElTag>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Event } from "@prisma/client";

defineProps<{ event: Event }>();
</script>
