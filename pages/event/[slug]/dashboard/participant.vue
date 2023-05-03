<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <div class="lg:col-span-3 h-full relative">
            <div class="card rounded-md h-full w-full absolute overflow-hidden">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold">Participants</h3>
                    <EventParticipantFilter />
                </div>
                <EventParticipantList />
            </div>
        </div>
        <div class="md:col-span-1 space-y-8 h-full">
            <div class="card rounded-md h-[375px] overflow-hidden">
                <h3 class="font-semibold mb-4">Activity</h3>
                <EventLog />
            </div>
            <div class="card rounded-md h-[225px]">
                <h3 class="font-semibold mb-4">Actions</h3>
                <div class="grid grid-cols-1 gap-4">
                    <button @click="modalVisible = true" class="action-button">
                        <Icon name="majesticons:user-group" class="w-6 h-6 mb-1"></Icon> Invite Participant
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventParticipantInvite @closed="modalVisible = false" :visible="modalVisible" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const modalVisible = ref(false);
</script>
