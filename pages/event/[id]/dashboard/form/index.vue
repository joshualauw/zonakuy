<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <ElScrollbar class="lg:col-span-3 h-full overflow-hidden">
            <div class="h-full w-full grid grid-cols-2 gap-8">
                <EventFormItem v-if="forms" v-for="form in forms.data" :form="form">
                    <template #action>
                        <div>
                            <ElButton @click="navigateTo(`/event/${$route.params.id}/dashboard/form/${form.id}`)">
                                Detail
                            </ElButton>
                            <ElButton @click="openDeleteModal(form.id)" type="danger">Delete</ElButton>
                        </div>
                    </template>
                </EventFormItem>
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
                    <button @click="doCreateForm" class="action-button">
                        <Icon name="material-symbols:edit-document-rounded" class="w-6 h-6 mb-1"></Icon> Create Form
                    </button>
                </div>
            </div>
        </div>
    </div>
    <DeleteModal
        title="Delete Form"
        @deleted="doDeleteForm"
        @closed="deleteModalVisible = false"
        :visible="deleteModalVisible"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const { getAllForm, createForm, deleteForm } = formController();
const deleteModalVisible = ref(false);
const formId = ref("");
const route = useRoute("event-id");

const { data: forms, refresh } = await getAllForm({ event_id: route.params.id });

function openDeleteModal(id: string) {
    formId.value = id;
    deleteModalVisible.value = true;
}

async function doDeleteForm() {
    const { error } = await deleteForm(formId.value);
    deleteModalVisible.value = false;
    if (!error.value) {
        refresh();
    }
}

async function doCreateForm() {
    const { error, data } = await createForm({ event_id: route.params.id });
    if (!error.value && data.value) {
        const { id: form_id } = data.value.data;
        navigateTo(`/event/${route.params.id}/dashboard/form/${form_id}`);
    }
}
</script>
