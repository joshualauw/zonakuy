<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="Managed events" name="managed">
            <EventItem
                v-if="managedEvents && managedEvents.data.length > 0"
                v-for="evt in managedEvents.data"
                :data="evt"
                type="edit"
            />
            <p v-else class="text-center text-lg mt-5">-- No Events --</p>
        </el-tab-pane>
        <el-tab-pane label="Registered Events" name="registered">
            <EventItem
                v-if="managedEvents && managedEvents.data.length > 0"
                v-for="evt in managedEvents.data"
                :data="evt"
                type="link"
            />
            <p v-else class="text-center text-lg mt-5">-- No Events --</p>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const { getAllEvent } = eventController();
const user = authStore();
const activeName = ref("managed");

const { data: managedEvents } = await getAllEvent({ user_id: user.value?.id });
</script>
