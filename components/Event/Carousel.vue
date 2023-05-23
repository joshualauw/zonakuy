<template>
    <ElCarousel indicator-position="outside" height="425px" :interval="5000">
        <ElCarouselItem v-if="events" v-for="evt in events.data.slice(0, 5)" :key="evt.id">
            <NuxtImg :src="evt.banner ?? '/img/default_event.jpg'" class="w-full h-full brightness-[.4]" />
            <div class="absolute p-16 top-12 inset-x-[25%] text-center">
                <p class="text-3xl font-bold text-white mb-8">{{ evt.name }}</p>
                <div class="space-y-2 text-gray-200 text-xl mb-8">
                    <p>
                        <Icon name="material-symbols:timer" class="mr-1"></Icon>
                        {{ dayjs(evt.start_date).format("ddd, D MMM YYYY") }}
                    </p>
                    <p>
                        <Icon name="material-symbols:location-on" class="mr-2"></Icon>
                        <span v-if="!evt.location">Online Event</span>
                        <span v-else>
                            {{ evt.location.venue }}, {{ evt.location.street }}, {{ evt.location.city }},
                            {{ evt.location.country }}
                        </span>
                    </p>
                </div>
                <ElButton type="success" size="large">Join Now</ElButton>
            </div>
        </ElCarouselItem>
    </ElCarousel>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
const { getAllEvent } = eventController();

const { data: events } = await getAllEvent({});
</script>
