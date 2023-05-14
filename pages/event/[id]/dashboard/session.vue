<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <div class="lg:col-span-3 h-full relative overflow-hidden">
            <ElScrollbar class="rounded-md h-full w-full absolute">
                <EventSessionItem
                    v-if="sessions"
                    v-for="session in sessions.data"
                    @add-speaker="openSpeakerModal(session.id)"
                    :session="session"
                >
                    <template #action>
                        <div>
                            <ElButton @click="openEditModal(session.id)">Edit</ElButton>
                            <ElButton @click="openDeleteModal(session.id)" type="danger">Delete</ElButton>
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
                    <button @click="openCreateModal" class="action-button">
                        <Icon name="material-symbols:add" class="w-6 h-6 mb-1"></Icon> Create Session
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventSessionSpeakerCreate
        @saved="refresh"
        @closed="speakerModalVisible = false"
        :edit-id="sessionId"
        :visible="speakerModalVisible"
    />
    <EventSessionCreate @saved="refresh" @closed="modalVisible = false" :visible="modalVisible" :edit-id="sessionId" />
    <DeleteModal title="Delete Session" @closed="deleteModalVisible = false" :visible="deleteModalVisible" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const route = useRoute();
const modalVisible = ref(false);
const deleteModalVisible = ref(false);
const speakerModalVisible = ref(false);
const sessionId = ref("");

const { getAllSession } = sessionController();

const { data: sessions, refresh } = await getAllSession({ id: (route.params as { id: string }).id as string });

function openSpeakerModal(id: string) {
    speakerModalVisible.value = true;
    sessionId.value = id;
}

function openEditModal(id: string) {
    modalVisible.value = true;
    sessionId.value = id;
}

function openCreateModal() {
    modalVisible.value = true;
    sessionId.value = "";
}

function openDeleteModal(id: string) {
    deleteModalVisible.value = true;
    sessionId.value = id;
}
</script>
