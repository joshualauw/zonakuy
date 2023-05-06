<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="Managed events" name="managed">
            <EventItem
                v-if="managedEvents && managedEvents.data.length > 0"
                v-for="evt in managedEvents.data"
                :event="evt"
            >
                <div class="box flex-col space-y-4 h-full p-2">
                    <ElDropdown trigger="click">
                        <ElButton><Icon name="material-symbols:settings" class="w-4 h-4 mr-1" />Options</ElButton>
                        <template #dropdown>
                            <ElDropdownMenu>
                                <ElDropdownItem @click="navigateTo(`/event/${evt.slug}/dashboard/report`)">
                                    <Icon name="material-symbols:edit" class="mr-1 w-4 h-4"></Icon> edit
                                </ElDropdownItem>
                                <ElDropdownItem>
                                    <Icon name="material-symbols:send" class="mr-1 w-4 h-4"></Icon> main page
                                </ElDropdownItem>
                            </ElDropdownMenu>
                        </template>
                    </ElDropdown>
                    <span class="badge badge-outline">
                        <div class="rounded-full w-3 h-3 bg-green-500 mr-1"></div>
                        Active
                    </span>
                </div>
            </EventItem>
            <p v-else class="text-center text-lg mt-5">-- No Events --</p>
        </el-tab-pane>

        <el-tab-pane label="Registered Events" name="registered">
            <EventItem
                v-if="managedEvents && managedEvents.data.length > 0"
                v-for="evt in managedEvents.data"
                :event="evt"
            >
                <div class="box flex-col h-full">
                    <p class="text-green-500 mb-1">Registered successfully</p>
                    <p class="text-gray-500 text-sm mb-3">Joined at: 24 April 2023</p>
                    <ElButton>Main page</ElButton>
                </div>
            </EventItem>
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
