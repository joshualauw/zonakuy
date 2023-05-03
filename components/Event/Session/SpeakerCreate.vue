<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Add Speaker" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Upload">
                    <UploadSingle @file-changed="fileChange" />
                    <p v-if="error.image" class="mt-0.5 text-xs text-red-500">{{ error.image }}</p>
                </ElFormItem>
                <ElFormItem label="Speaker Name">
                    <ElInput
                        v-model="form.name"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.name }"
                    />
                    <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p>
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="createSpeaker">Save</el-button>
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
    image: null,
    name: "",
});

const error = { ...form };

function fileChange(file: any) {
    form.image = file;
}

function createSpeaker() {
    // logic here
    emits("closed");
}
</script>
