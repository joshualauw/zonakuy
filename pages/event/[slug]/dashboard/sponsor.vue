<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <ElScrollbar class="lg:col-span-3 h-full overflow-hidden">
            <div class="rounded-md h-full w-full grid grid-cols-3 gap-8">
                <EventSponsorItem v-for="i in 6">
                    <template #action>
                        <div>
                            <ElButton @click="modalVisible = true">Edit</ElButton>
                            <ElButton @click="deleteModalVisible = true" type="danger">Delete</ElButton>
                        </div>
                    </template>
                </EventSponsorItem>
            </div>
        </ElScrollbar>
        <div class="md:col-span-1 space-y-8 h-full">
            <div class="card rounded-md h-[375px] overflow-hidden">
                <h3 class="font-semibold mb-4">Activity Log</h3>
                <EventLog />
            </div>
            <div class="card rounded-md h-[225px]">
                <h3 class="font-semibold mb-4">Actions</h3>
                <div class="grid grid-cols-1 gap-4">
                    <button @click="modalVisible = true" class="action-button">
                        <Icon name="material-symbols:add" class="w-6 h-6 mb-1"></Icon> Create Sponsor
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventSponsorCreate @closed="modalVisible = false" :visible="modalVisible" />
    <DeleteModal title="Delete Sponsor" @closed="deleteModalVisible = false" :visible="deleteModalVisible" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const modalVisible = ref(false);
const deleteModalVisible = ref(false);
</script>
