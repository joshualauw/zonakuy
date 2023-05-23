<template>
    <ElTabs class="w-[80%] mx-auto text-black font-bold">
        <ElTabPane label="Overview">
            <div v-if="event && event.data" class="mt-4">
                <NuxtImg :src="event.data.banner ?? '/img/default_event.jpg'" class="w-full rounded-lg" />
                <h1 class="text-3xl font-extrabold mt-8">{{ event.data.name }}</h1>
                <div class="mt-8 flex w-full space-x-12">
                    <div class="w-[60%] space-y-12">
                        <div class="bg-gray-100 p-6 flex items-center justify-between w-full">
                            <div>
                                <p>
                                    By: <span class="font-bold">{{ event.data.user.username }}</span>
                                </p>
                                <p class="text-gray-600 text-sm mt-1">101 followers</p>
                            </div>
                            <ElButton type="primary" size="large">Follow +</ElButton>
                        </div>
                        <h2 class="text-xl font-semibold">Description</h2>
                        <p v-html="wordSpacer(event.data.description, 50)" class="text-gray-500"></p>
                        <h2 class="text-xl font-semibold">When & Where</h2>
                        <div class="flex space-x-8">
                            <div class="flex items-start w-80">
                                <div class="p-3 rounded-lg bg-gray-100 mr-3">
                                    <icon name="material-symbols:timer" size="20" />
                                </div>
                                <div>
                                    <p class="font-bold">Date & Time</p>
                                    <p class="text-sm text-gray-500 mt-1">
                                        {{ dayjs(event.data.start_date).format("ddd, D MMM YYYY") }} -
                                        {{ dayjs(event.data.end_date).format("ddd, D MMM YYYY") }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start w-80">
                                <div class="p-3 rounded-lg bg-gray-100 mr-3">
                                    <icon name="material-symbols:location-on" size="20" />
                                </div>
                                <div>
                                    <p class="font-bold">Location</p>
                                    <p class="text-sm text-gray-500 mt-1">
                                        <span v-if="!event.data.location">-</span>
                                        <span v-else>
                                            {{ event.data.location.venue }}, {{ event.data.location.street }},
                                            {{ event.data.location.city }},
                                            {{ event.data.location.country }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p>
                            Show Map?
                            <label class="swap swap-rotate">
                                <input v-model="mapIsShown" type="checkbox" />
                                <Icon class="swap-on ml-2" name="fa:chevron-up" />
                                <Icon class="swap-off ml-2" name="fa:chevron-down" />
                            </label>
                        </p>
                        <Leaflet
                            v-if="event.data.location"
                            :show="mapIsShown"
                            :latitude="event.data.location.latitude"
                            :longitude="event.data.location.longitude"
                            class="border box flex-col bg-slate-100 mt-4 h-72 text-center text-gray-500 text-lg font-semibold"
                        />
                    </div>
                    <div class="divider divider-horizontal">.</div>
                    <div class="w-[40%] space-y-8">
                        <div class="card text-center">
                            <p class="text-3xl text-green-500 font-extrabold mb-2">
                                {{ event.data.price == 0 ? "Free" : `Rp. ${thousandSeparator(event.data.price)}` }}
                            </p>
                            <p class="mb-4">100 Slots Left</p>
                            <ElButton type="success" size="large">Register Now</ElButton>
                        </div>
                        <h2 class="text-xl font-semibold">Tags</h2>
                        <div class="flex flex-wrap">
                            <ElTag v-for="tag in event.data.tags" round size="large" class="m-1">{{ tag }}</ElTag>
                        </div>
                        <h2 class="text-xl font-semibold">Sponsored By</h2>
                        <div class="flex flex-wrap">
                            <NuxtImg v-for="image in event.data.gallery" :src="image" class="w-24 h-24 m-3" />
                        </div>
                        <h2 class="text-xl font-semibold">Share Now</h2>
                        <div class="flex space-x-3">
                            <ElTooltip v-for="link in socialMediaLinks" :content="link.tooltip" placement="top">
                                <div @click="link.callback" class="p-2 rounded-full bg-gray-100 cursor-pointer">
                                    <icon :name="link.icon" size="24" />
                                </div>
                            </ElTooltip>
                        </div>
                    </div>
                </div>
            </div>
        </ElTabPane>
        <ElTabPane label="Schedule"></ElTabPane>
        <ElTabPane label="Gallery"></ElTabPane>
    </ElTabs>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    public: true,
    layout: "home",
});

const route = useRoute("event-id");
const { getOneEvent } = eventController();
const mapIsShown = ref(true);

const { data: event } = await getOneEvent(route.params.id);
if (!event) throw createError({ statusCode: 404, statusMessage: "Event not found" });

const socialMediaLinks = [
    {
        tooltip: "Copy Link",
        icon: "material-symbols:share",
        callback: () => {},
    },
    {
        tooltip: "Facebook Share",
        icon: "mdi:facebook",
        callback: () => {},
    },
    {
        tooltip: "Whatsapp Share",
        icon: "mdi:whatsapp",
        callback: () => {},
    },
];
</script>
