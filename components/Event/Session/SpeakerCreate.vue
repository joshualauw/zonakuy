<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Manage Speaker" width="40%" class="rounded-md">
            <ElForm v-for="(speaker, idx) in form" label-position="top" class="relative">
                <ElFormItem label="Upload">
                    <UploadSingle
                        :file-list="fileList[idx]"
                        @file-changed="fileChange($event, idx)"
                        @file-removed="fileRemove(idx)"
                    />
                </ElFormItem>
                <ElFormItem label="Speaker Name">
                    <ElInput v-model="speaker.name" type="text" size="large" />
                </ElFormItem>
                <ElFormItem label="Speaker Role">
                    <ElInput v-model="speaker.role" type="text" size="large" />
                </ElFormItem>
                <span @click="deleteSpeaker(idx)" class="absolute top-2 right-2 text-red-500">
                    <Icon name="fa6-solid:xmark" class="w-4 h-4 cursor-pointer" />
                </span>
            </ElForm>
            <div class="divider"></div>
            <ElButton @click="addSpeaker">Add</ElButton>
            <template #footer>
                <span class="dialog-footer">
                    <ElButton @click="$emit('closed')">Cancel</ElButton>
                    <ElButton type="primary" @click="doSaveSpeaker">Save</ElButton>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import type { UploadUserFile } from "element-plus";

const props = defineProps<{ visible: boolean; editId: any }>();
const emits = defineEmits(["closed", "saved"]);
const isVisible = ref(props.visible);
const fileList = ref<UploadUserFile[][]>([]);
const form = ref([
    {
        avatar: "",
        name: "",
        role: "",
    },
]);

const { getOneSession, saveSpeaker, errors } = sessionController();

watch(
    () => props.visible,
    async (val) => {
        isVisible.value = val;

        fileList.value = [];
        form.value = [];
        const { data, error } = await getOneSession(props.editId);
        if (!error.value && data.value) {
            const { speaker } = data.value.data;
            speaker.forEach((s) => {
                form.value.push({
                    name: s.name,
                    role: s.role ?? "",
                    avatar: s.avatar ?? "",
                });
                if (s.avatar) {
                    fileList.value.push([{ name: s.name, url: s.avatar }]);
                }
            });
        }
    }
);

const error = computed(() => generateErrors(errors.value));

function deleteSpeaker(idx: number) {
    if (form.value.length > 1) {
        form.value.splice(idx, 1);
    }
}

function addSpeaker() {
    form.value.push({
        avatar: "",
        name: "",
        role: "",
    });
    fileList.value.push([]);
}

function fileChange(file: any, idx: number) {
    form.value[idx].avatar = file;
}

function fileRemove(idx: number) {
    form.value[idx].avatar = "";
}

async function doSaveSpeaker() {
    const { error } = await saveSpeaker(form.value, props.editId);

    if (!error.value) {
        emits("closed");
        emits("saved");
    }
}
</script>
