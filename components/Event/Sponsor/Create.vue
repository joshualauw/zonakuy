<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="closeModal" title="Create Sponsor" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Logo" :error="error.logo">
                    <UploadSingle :file-list="fileList" @file-changed="fileChange" @file-removed="form.logo = ''" />
                </ElFormItem>
                <ElFormItem label="Sponsor Name" :error="error.name">
                    <ElInput v-model="form.name" type="text" size="large" />
                </ElFormItem>
                <ElFormItem label="Sponsor Description" :error="error.description">
                    <ElInput v-model="form.description" type="textarea" :rows="3" />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <ElButton @click="closeModal">Cancel</ElButton>
                    <ElButton type="primary" @click="doSaveSponsor" :loading="loading">Save</ElButton>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import type { UploadUserFile } from "element-plus";

const props = defineProps<{ visible: boolean; editId?: any }>();
const emits = defineEmits(["closed", "saved"]);
const isVisible = ref(props.visible);
const globalLoading = loadingStore();
const fileList = ref<UploadUserFile[]>([]);

watch(
    () => props.visible,
    async (val) => {
        isVisible.value = val;

        if (props.editId && val) {
            globalLoading.value = true;
            const { data, error } = await getOneSponsor(props.editId);
            globalLoading.value = false;

            if (!error.value && data.value) {
                const { name, logo, description } = data.value.data;
                if (logo) {
                    fileList.value[0] = { name, url: logo };
                    form.logo = logo;
                }
                console.log(fileList.value);
                form.name = name;
                form.description = description;
            }
        } else {
            form.reset();
            fileList.value = [];
        }
    }
);

const { createSponsor, getOneSponsor, updateSponsor, errors, loading } = sponsorController();
const route = useRoute();

const form = useForm({
    name: "",
    logo: "",
    description: "",
});

const error = computed(() => generateErrors(errors.value));

function closeModal() {
    errors.value = [];
    emits("closed");
}

function fileChange(file: any) {
    form.logo = file;
}

async function doSaveSponsor() {
    let error: globalThis.Ref<Error | null>;
    if (props.editId) {
        const { error: updateError } = await updateSponsor({ ...form }, props.editId);
        error = updateError;
    } else {
        const { error: createError } = await createSponsor({ ...form, event_id: (route.params as { id: string }).id });
        error = createError;
    }

    if (!error.value) {
        closeModal();
        emits("saved");
    }
}
</script>
