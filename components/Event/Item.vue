<template>
    <div
        @click="navigateTo(`/event/${event.id}`)"
        class="card p-0 cursor-pointer relative flex flex-col w-full h-[350px] text-sm hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
    >
        <NuxtImg
            class="w-full hidden xl:block xl:min-h-[160px] self-center"
            :src="event.banner ?? '/img/default_event.jpg'"
        />
        <div class="h-full p-4">
            <h1 class="font-bold text-base">
                {{ event.name }}
            </h1>
            <p class="font-bold text-base text-green-500 mb-4">
                {{ event.price == 0 ? "Free" : `Rp. ${thousandSeparator(event.price)}` }}
            </p>
            <div class="space-y-1.5 text-gray-500 text-xs">
                <p>
                    <Icon name="material-symbols:timer" class="mr-1"></Icon>
                    {{ dayjs(event.start_date).format("ddd, D MMM YYYY") }}
                </p>
                <p>
                    <Icon name="material-symbols:location-on" class="mr-2"></Icon>
                    <span v-if="!event.location">-</span>
                    <span v-else>
                        {{ event.location.venue }}, {{ event.location.street }}, {{ event.location.city }},
                        {{ event.location.country }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Event } from "@prisma/client";

defineProps<{ event: Event }>();
</script>
