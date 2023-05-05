<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Create Budget" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Name">
                    <ElInput
                        v-model="form.name"
                        type="text"
                        size="large"
                        placeholder="Budget Name"
                        :class="{ 'border border-red-500': error.name }"
                    />
                    <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p>
                </ElFormItem>
                <ElFormItem label="Category">
                    <ElInput
                        v-model="form.category"
                        type="text"
                        size="large"
                        placeholder="Budget Category Label"
                        :class="{ 'border border-red-500': error.category }"
                    />
                    <p v-if="error.category" class="mt-0.5 text-xs text-red-500">{{ error.category }}</p>
                </ElFormItem>
                <ElFormItem label="Limit">
                    <ElInput
                        v-model="form.limit"
                        type="number"
                        size="large"
                        :class="{ 'border border-red-500': error.limit }"
                    >
                        <template #prepend>Rp.</template>
                    </ElInput>
                    <p v-if="error.limit" class="mt-0.5 text-xs text-red-500">{{ error.limit }}</p>
                </ElFormItem>
                <ElFormItem label="Expenses">
                    Add
                    <Icon @click="addExpense" name="material-symbols:add" class="w-5 h-5 ml-1 cursor-pointer"></Icon>
                    <div v-for="(exp, idx) in form.expenses" class="flex items-center w-full mb-2">
                        <ElInput v-model="exp.name" type="text" placeholder="Expense name" />
                        <span class="mx-2">/</span>
                        <ElInput v-model="exp.amount" type="number">
                            <template #prepend>Rp.</template>
                        </ElInput>
                        <Icon
                            @click="deleteExpense(idx)"
                            name="fa6-solid:xmark"
                            class="w-7 h-7 ml-2 text-red-500 cursor-pointer"
                        ></Icon>
                    </div>
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="createSession">Save</el-button>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import { Expense } from "@prisma/client";

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(["closed"]);
const isVisible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
        isVisible.value = val;
    }
);

const form = useForm({
    name: "",
    limit: "",
    category: "",
    expenses: [
        {
            name: "",
            amount: 0,
        },
    ] as Expense[],
});

const error = { ...form };

function addExpense() {
    form.expenses.push({
        name: "",
        amount: 0,
    });
}

function deleteExpense(idx: number) {
    form.expenses.splice(idx, 1);
}

function createSession() {
    // logic here
    emits("closed");
}
</script>
