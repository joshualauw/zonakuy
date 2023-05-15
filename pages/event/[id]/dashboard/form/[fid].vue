<template>
    <div class="p-8">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <NuxtLink :to="`/event/${$route.params.id}/dashboard/form`">form manage</NuxtLink>
            </el-breadcrumb-item>
            <el-breadcrumb-item>form detail</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <ElTabs v-model="activeTab" class="box flex-col w-full space-y-6 p-16">
        <ElTabPane label="Form Fields" name="form-field">
            <ClientOnly>
                <div class="border-t-4 border-blue-500 card w-[650px] flex-row items-center space-x-6 mb-8">
                    <input
                        v-model="formName"
                        type="text"
                        class="w-full outline-none font-semibold"
                        placeholder="Form Name"
                    />
                </div>
                <EventFormField
                    v-for="form in formFields"
                    :form="form"
                    @field-change="onFieldChange"
                    @field-deleted="onDeleteField"
                />
            </ClientOnly>
            <div class="float-right">
                <ElButton @click="addField" type="primary" size="large">+ Add Field</ElButton>
                <ElButton @click="saveForm" type="success" size="large">Save</ElButton>
            </div>
        </ElTabPane>
        <ElTabPane label="Responses" name="response">
            <EventFormResponse v-for="form in formFields" :form="form" />
        </ElTabPane>
        <ElTabPane label="Settings" name="settings">ya</ElTabPane>
    </ElTabs>
</template>

<script setup lang="ts">
import { FormField } from "@prisma/client";

const activeTab = ref("form-field");
const formName = ref("");
const formFields = ref<(FormField & { id: string })[]>([]);

function addField() {
    formFields.value.push({
        id: genId(5),
        question: "",
        type: "shorttext",
        required: false,
        options: [],
        image: null,
    });
}

function saveForm() {
    console.log(formFields.value);
}

function onFieldChange(data: FormField & { id: string }) {
    const formIdx = formFields.value.findIndex((f) => f.id === data.id);
    formFields.value[formIdx] = data;
}

function onDeleteField(id: string) {
    const formIdx = formFields.value.findIndex((f) => f.id === id);
    formFields.value.splice(formIdx, 1);
}
</script>
