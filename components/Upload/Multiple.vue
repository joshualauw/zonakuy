<template>
    <ElUpload
        v-model:file-list="fileList"
        :on-change="handleFileChanged"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
    >
        <ElIcon><Icon name="fa:plus" class="w-5 h-5"></Icon></ElIcon>
    </ElUpload>
    <ElDialog v-model="dialogVisible">
        <NuxtImg w-full :src="dialogImageUrl" alt="Preview Image" />
    </ElDialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { UploadProps, UploadUserFile, UploadFile } from "element-plus";

const emits = defineEmits(["file-changed"]);
const fileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleFileChanged = (file: UploadFile) => {
    emits(
        "file-changed",
        fileList.value.map((f) => f.raw)
    );
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};
</script>
