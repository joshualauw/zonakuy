<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <ElScrollbar class="lg:col-span-3 h-full overflow-hidden">
            <EventBudgetItem v-if="budgets" v-for="bud in budgets.data" :budget="bud">
                <template #action>
                    <div>
                        <ElButton @click="openEditModal(bud.id)">Edit</ElButton>
                        <ElButton @click="openDeleteModal(bud.id)" type="danger">Delete</ElButton>
                    </div>
                </template>
            </EventBudgetItem>
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
                        <Icon name="material-symbols:add" class="w-6 h-6 mb-1"></Icon> Create Budget
                    </button>
                </div>
            </div>
        </div>
    </div>
    <EventBudgetCreate :edit-id="budgetId" @closed="modalVisible = false" @saved="refresh" :visible="modalVisible" />
    <DeleteModal
        title="Delete Budget"
        @closed="deleteModalVisible = false"
        @deleted="doDeleteBudget"
        :visible="deleteModalVisible"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

const { getAllBudget, deleteBudget } = budgetController();
const globalLoading = loadingStore();
const route = useRoute();

const modalVisible = ref(false);
const deleteModalVisible = ref(false);
const budgetId = ref("");

const { data: budgets, refresh } = await getAllBudget({ slug: route.params.slug as string });

function openEditModal(id: string) {
    modalVisible.value = true;
    budgetId.value = id;
}

function openDeleteModal(id: string) {
    deleteModalVisible.value = true;
    budgetId.value = id;
}

function openCreateModal() {
    modalVisible.value = true;
    budgetId.value = "";
}

async function doDeleteBudget() {
    globalLoading.value = true;
    const { error } = await deleteBudget(budgetId.value);
    globalLoading.value = false;
    if (!error.value) {
        refresh();
    }
}
</script>
