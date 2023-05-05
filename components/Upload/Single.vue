<template>
    <ElUpload
        ref="upload"
        :on-change="handleFileChanged"
        :limit="1"
        :on-exceed="handleExceed"
        list-type="picture"
        :auto-upload="false"
    >
        <template #trigger>
            <ElButton type="primary" size="large">Select File</ElButton>
        </template>
    </ElUpload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from "element-plus";

const emits = defineEmits(["file-changed"]);
const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
};

const handleFileChanged = (file: UploadFile) => {
    emits("file-changed", file.raw);
};
</script>
