<template>
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-x-10 w-full">
        <EventSkeleton v-for="i in 6" />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-x-10 w-full">
        <div class="col-span-1 hidden xl:block">
            <div class="card space-y-4 mb-8">
                <h1 class="font-bold text-lg">Filter & Search</h1>
                <ElInput :prefix-icon="Search" size="large" placeholder="Search events..." rounded></ElInput>
            </div>
            <div class="card h-[350px] overflow-hidden mb-8">
                <h1 class="font-bold text-lg mb-5">Top Organizers</h1>
                <ElScrollbar class="h-full pr-5">
                    <Avatar v-for="i in 5" name="John Smith" description="12 Events Created">
                        <template #action> <ElButton type="success" round size="small">visit</ElButton></template>
                        <template #default>
                            <div class="divider"></div>
                        </template>
                    </Avatar>
                </ElScrollbar>
            </div>
            <div class="card h-[400px] space-y-4">
                <div class="text-center">
                    <h1 class="font-semibold text-lg">Become a Premium Member Now!</h1>
                    <p>and get all the benefits</p>
                    <p class="text-xl text-amber-500 font-bold">ONLY Rp. 99.000 / lifetime</p>
                </div>
                <div class="box"><NuxtImg src="/img/gold_coin.gif" class="w-36 h-36"></NuxtImg></div>
                <div class="box"><ElButton type="warning" size="large">See Details</ElButton></div>
            </div>
        </div>
        <div class="col-span-4 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <EventItem v-if="events" v-for="evt in events.data" :event="evt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

definePageMeta({
    public: true,
    layout: "home",
});

const { getAllEvent } = eventController();

const { data: events, pending } = await getAllEvent({});
</script>
