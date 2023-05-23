<template>
    <div class="card relative flex flex-row items-start md:space-x-6 w-full h-52 mb-8">
        <NuxtImg
            class="min-w-[200px] hidden md:block h-full rounded-lg"
            :src="event.banner ?? '/img/default_event.jpg'"
        ></NuxtImg>
        <div class="w-3/4 h-full">
            <h1 class="font-bold text-base md:text-lg mb-2">{{ event.name }}</h1>
            <p class="text-sm mb-1">
                <Icon name="material-symbols:timer" class="text-gray-500 mr-2"></Icon
                >{{ dayjs(event.start_date).format("ddd, D MMM YYYY") }} -
                {{ dayjs(event.end_date).format("ddd, D MMM YYYY") }}
            </p>
            <p class="text-sm mb-2">
                <Icon name="material-symbols:location-on" class="text-gray-500 mr-2 mb-1"></Icon>
                <span v-if="!event.location">-</span>
                <span v-else>
                    {{ event.location.venue }}, {{ event.location.street }}, {{ event.location.city }},
                    {{ event.location.country }}
                </span>
            </p>
            <ElTag v-for="tag in event.tags" class="m-1.5 cursor-pointer hover:brightness-90" type="info">
                {{ tag }}
            </ElTag>
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="w-1/4 h-full">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Event } from "@prisma/client";

defineProps<{ event: Event }>();
</script>
