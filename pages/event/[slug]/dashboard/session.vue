<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <div class="lg:col-span-3 h-full relative overflow-hidden">
            <ElScrollbar class="rounded-md h-full w-full absolute">
                <EventSessionItem @add-speaker="speakerModalVisible = true" v-for="i in 3">
                    <template #action>
                        <div>
                            <ElButton @click="modalVisible = true">Edit</ElButton>
                            <ElButton @click="deleteModalVisible = true" type="danger">Delete</ElButton>
                        </div>
                    </template>
                </EventSessionItem>
            </ElScrollbar>
        </div>
        <div class="md:col-span-1 space-y-8 h-full">
            <div class="card rounded-md h-[375px] overflow-hidden">
                <h3 class="font-semibold mb-4">Activity Log</h3>
                <EventLog />
            </div>
            <div class="card rounded-md h-[225px]">
                <h3 class="font-semibold mb-4">Actions</h3>
                <div class="grid grid-cols-1 gap-4">
                    <button @click="modalVisible = true" class="action-button">
                        <Icon name="material-symbols:add" class="w-6 h-6 mb-1"></Icon> Create Session
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventSessionSpeakerCreate @closed="speakerModalVisible = false" :visible="speakerModalVisible" />
    <EventSessionCreate @closed="modalVisible = false" :visible="modalVisible" />
    <DeleteModal title="Delete Session" @closed="deleteModalVisible = false" :visible="deleteModalVisible" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const modalVisible = ref(false);
const deleteModalVisible = ref(false);
const speakerModalVisible = ref(false);
</script>
