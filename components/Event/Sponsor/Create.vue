<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Create Sponsor" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Logo">
                    <UploadSingle @file-changed="fileChange" />
                    <p v-if="error.logo" class="mt-0.5 text-xs text-red-500">{{ error.logo }}</p>
                </ElFormItem>
                <ElFormItem label="Sponsor Name">
                    <ElInput
                        v-model="form.name"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.name }"
                    />
                    <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p>
                </ElFormItem>
                <ElFormItem label="Sponsor Description">
                    <ElInput
                        v-model="form.description"
                        type="textarea"
                        :rows="3"
                        :class="{ 'border border-red-500': error.description }"
                    />
                    <p v-if="error.description" class="mt-0.5 text-xs text-red-500">{{ error.description }}</p>
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="createSponsor">Save</el-button>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
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
    logo: null,
    description: "",
});

const error = { ...form };

function fileChange(file: any) {
    form.logo = file;
}

function createSponsor() {
    // logic here
    emits("closed");
}
</script>
