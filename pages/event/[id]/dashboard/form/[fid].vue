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
                <ElButton @click="doSaveForm" :loading="loading" type="success" size="large">Save</ElButton>
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

type PreFormField = FormField & {
    id: string;
    file: File | null;
};

const { saveForm, getOneForm, loading } = formController();
const route = useRoute("event-id-dashboard-form-fid");
const activeTab = ref("form-field");
const formName = ref("");
const formFields = ref<PreFormField[]>([]);

const { data: form, error } = await getOneForm(route.params.fid);
if (form.value && !error.value) {
    const { name, fields } = form.value.data;
    formName.value = name;
    formFields.value.push(...fields.map((f) => ({ ...f, id: genId(5), file: null })));
}

function addField() {
    formFields.value.push({
        id: genId(5),
        question: "",
        type: "shorttext",
        required: false,
        options: [],
        image: null,
        file: null,
    });
}

async function doSaveForm() {
    const fields = formFields.value.map((f) => exclude({ ...f, image: f.file as any }, ["id", "file"]));
    await saveForm({ name: formName.value, fields }, route.params.fid);
}

function onFieldChange(data: PreFormField) {
    const formIdx = formFields.value.findIndex((f) => f.id === data.id);
    formFields.value[formIdx] = data;
}

function onDeleteField(id: string) {
    const formIdx = formFields.value.findIndex((f) => f.id === id);
    formFields.value.splice(formIdx, 1);
}
</script>
