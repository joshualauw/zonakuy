<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 w-full">
        <div class="col-span-2">
            <EventItem v-if="events" v-for="evt in events.data" :data="evt" type="join" />
        </div>
        <div>
            <div class="card hidden sm:block h-[350px] overflow-hidden mb-10">
                <h1 class="font-bold text-lg mb-5">Organizers</h1>
                <ElScrollbar class="h-full pr-5">
                    <Avatar v-for="i in 8" name="John Smith" description="12 Events Created">
                        <template #action> <ElButton type="success" round size="small">visit</ElButton></template>
                        <template #default>
                            <div class="divider"></div>
                        </template>
                    </Avatar>
                </ElScrollbar>
            </div>
            <div class="card hidden sm:block space-y-4">
                <div class="text-center">
                    <h1 class="font-semibold text-lg">Become a Premium Member Now!</h1>
                    <p>and get all the benefits</p>
                    <p class="text-xl text-amber-500 font-bold">ONLY Rp. 99.000 / lifetime</p>
                </div>
                <div class="box"><NuxtImg src="/img/gold_coin.gif" class="w-36 h-36"></NuxtImg></div>
                <div class="box"><ElButton type="warning" size="large">See Details</ElButton></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    public: true,
    layout: "home",
});

const { getAllEvent } = eventController();

const { data: events } = await getAllEvent({});
</script>
