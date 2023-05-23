<template>
    <div class="box gap-8 h-[600px] w-full">
        <div class="h-full w-full relative">
            <ElTabs v-if="event" v-model="activeTab" tab-position="left">
                <ElTabPane label="Detail" name="detail" class="pl-8 overflow-hidden h-[630px]">
                    <ElScrollbar class="card rounded-md">
                        <h3 class="text-lg font-semibold mb-4">Edit Event Details</h3>
                        <EventCreate :event="event.data" />
                    </ElScrollbar>
                </ElTabPane>
                <ElTabPane label="Location" name="location" class="pl-8 overflow-hidden h-[630px]">
                    <ElScrollbar class="card rounded-md">
                        <h3 class="text-lg font-semibold mb-4">Add Event Location</h3>
                        <EventCreateLocation :event="event.data" />
                    </ElScrollbar>
                </ElTabPane>
                <ElTabPane label="Images" name="gallery" class="pl-8 overflow-hidden h-[630px]">
                    <ElScrollbar class="card rounded-md">
                        <h3 class="text-lg font-semibold mb-4">Add Event Images</h3>
                        <EventCreateGallery />
                    </ElScrollbar>
                </ElTabPane>
                <ElTabPane label="Others" name="others" class="pl-8 overflow-hidden h-[630px]">
                    <ElScrollbar class="card rounded-md">
                        <h3 class="text-lg font-semibold mb-4">Others</h3>
                        <EventCreateSetting />
                    </ElScrollbar>
                </ElTabPane>
            </ElTabs>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const activeTab = ref("detail");
const { getOneEvent } = eventController();
const route = useRoute("event-id");

const { data: event } = await getOneEvent(route.params.id);
</script>
