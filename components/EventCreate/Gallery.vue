<template>
    <ElUpload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
    >
        <el-icon><Plus /></el-icon>
    </ElUpload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps, UploadUserFile } from "element-plus";

const fileList = ref<UploadUserFile[]>([
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
    {
        name: "food.jpeg",
        url: "/img/default_user.jpg",
    },
]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};
</script>
