<template>
    <div class="px-20">
        <div class="flex items-center justify-between mb-12">
            <h1 class="text-2xl font-bold">Upcoming Events</h1>
            <ElButton size="large" type="danger">
                <Icon name="material-symbols:search" size="20" class="mr-2"></Icon> Search & Filter
            </ElButton>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <EventItem v-if="events" v-for="evt in [...events.data, ...events.data]" :event="evt" />
        </div>
        <div class="box w-fit py-2 px-4 mx-auto rounded-full bg-gray-200 text-gray-500 text-sm mt-12 cursor-pointer">
            Load more...
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    public: true,
    layout: "home",
});

const { getAllEvent } = eventController();

const { data: events } = await getAllEvent({});
</script>
