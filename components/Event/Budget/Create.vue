<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="closeModal" :title="modalTitle" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Name" :error="error.name">
                    <ElInput v-model="form.name" type="text" size="large" placeholder="Budget Name" />
                </ElFormItem>
                <ElFormItem label="Category" :error="error.category">
                    <ElInput v-model="form.category" type="text" size="large" placeholder="Budget Category Label" />
                </ElFormItem>
                <ElFormItem label="Limit" :error="error.limit">
                    <ElInput v-model="form.limit" type="number" size="large">
                        <template #prepend>Rp.</template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem label="Expenses">
                    Add
                    <Icon @click="addExpense" name="material-symbols:add" class="w-5 h-5 ml-1 cursor-pointer"></Icon>
                    <div v-for="(exp, idx) in form.expenses" class="w-full flex items-center mb-3">
                        <ElFormItem :error="error[`expenses[${idx}].name`]">
                            <ElInput v-model="exp.name" type="text" placeholder="Expense name" />
                        </ElFormItem>
                        <span class="mx-2">/</span>
                        <ElFormItem :error="error[`expenses[${idx}].amount`]">
                            <ElInput v-model="exp.amount" type="number">
                                <template #prepend>Rp.</template>
                            </ElInput>
                        </ElFormItem>
                        <Icon
                            @click="deleteExpense(idx)"
                            name="fa6-solid:xmark"
                            class="w-5 h-5 ml-2 text-red-500 cursor-pointer"
                        ></Icon>
                    </div>
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <ElButton @click="closeModal">Cancel</ElButton>
                    <ElButton type="primary" @click="doSaveBudget" :loading="loading">Save</ElButton>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean; editId?: any }>();
const emits = defineEmits(["closed", "saved"]);
const isVisible = ref(props.visible);
watch(
    () => props.visible,
    async (val) => {
        isVisible.value = val;
        if (props.editId && val) {
            const { data, error } = await getOneBudget(props.editId);
            if (!error.value && data.value) {
                const { name, limit, category, expenses } = data.value.data;
                form.name = name;
                form.limit = limit;
                form.category = category;
                form.expenses = expenses;
            }
        } else {
            form.reset();
        }
    }
);

const { getOneBudget, createBudget, updateBudget, loading, errors } = budgetController();
const route = useRoute();

const form = useForm({
    name: "",
    limit: 0,
    category: "",
    expenses: [
        {
            name: "",
            amount: 0,
        },
    ],
});

const error = computed(() => generateErrors(errors.value));
const modalTitle = computed(() => (props.editId ? "Edit Budget" : "Create Budget"));

function addExpense() {
    form.expenses.push({
        name: "",
        amount: 0,
    });
}

function closeModal() {
    errors.value = [];
    emits("closed");
}

function deleteExpense(idx: number) {
    form.expenses.splice(idx, 1);
}

async function doSaveBudget() {
    let error: globalThis.Ref<Error | null>;
    if (props.editId) {
        let { error: updateError } = await updateBudget({ ...form }, props.editId);
        error = updateError;
    } else {
        const { error: createError } = await createBudget({
            ...form,
            event_id: (route.params as { id: string }).id as string,
        });
        error = createError;
    }

    if (!error.value) {
        closeModal();
        emits("saved");
    }
}
</script>
