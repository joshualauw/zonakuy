<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <ElScrollbar class="lg:col-span-3 h-full overflow-hidden">
            <div class="grid grid-cols-3 h-full w-full gap-8">
                <EventSponsorItem v-if="sponsors" v-for="sponsor in sponsors.data" :sponsor="sponsor">
                    <template #action>
                        <div class="">
                            <ElButton @click="openEditModal(sponsor.id)">Edit</ElButton>
                            <ElButton @click="openDeleteModal(sponsor.id)" type="danger">Delete</ElButton>
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
                    <button @click="openCreateModal" class="action-button">
                        <Icon name="material-symbols:add" class="w-6 h-6 mb-1"></Icon> Create Sponsor
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventSponsorCreate @closed="modalVisible = false" @saved="refresh" :visible="modalVisible" :edit-id="sponsorId" />
    <DeleteModal
        title="Delete Sponsor"
        @deleted="doDeleteSponsor"
        @closed="deleteModalVisible = false"
        :visible="deleteModalVisible"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const { getAllSponsor, deleteSponsor } = sponsorController();
const globalLoading = loadingStore();

const route = useRoute();
const modalVisible = ref(false);
const deleteModalVisible = ref(false);
const sponsorId = ref("");

const { data: sponsors, refresh } = await getAllSponsor({ slug: route.params.slug as string });

function openEditModal(id: string) {
    modalVisible.value = true;
    sponsorId.value = id;
}

function openCreateModal() {
    modalVisible.value = true;
    sponsorId.value = "";
}

function openDeleteModal(id: string) {
    deleteModalVisible.value = true;
    sponsorId.value = id;
}

async function doDeleteSponsor() {
    globalLoading.value = true;
    const { error } = await deleteSponsor(sponsorId.value);
    globalLoading.value = false;
    if (!error.value) {
        deleteModalVisible.value = false;
        refresh();
    }
}
</script>
