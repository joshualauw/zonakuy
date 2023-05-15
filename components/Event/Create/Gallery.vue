<template>
    <ElForm label-position="top">
        <ElFormItem label="Event Banner">
            <UploadSingle :file-list="banner" @file-changed="bannerChange" />
        </ElFormItem>
        <ElFormItem label="Event Gallery">
            <UploadMultiple :file-list="gallery" @file-changed="galleryChange" />
        </ElFormItem>
        <div class="space-x-3">
            <ElButton @click="doUploadImageEvent" type="success" size="large">Save</ElButton>
        </div>
    </ElForm>
</template>

<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";
const emits = defineEmits(["success"]);

const banner = ref<UploadUserFile[]>([]);
const gallery = ref<UploadUserFile[]>([]);

function bannerChange(file: any) {
    banner.value = file;
}

function galleryChange(files: any) {
    gallery.value = [...files];
}

function doUploadImageEvent() {
    console.log(banner.value);
    console.log(gallery.value);
    emits("success", true);
}
</script>
