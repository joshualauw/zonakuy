<template>
    <ElForm label-position="top">
        <ElFormItem label="Event Banner">
            <UploadSingle :file-list="fileList" />
        </ElFormItem>
        <ElFormItem label="Event Gallery">
            <UploadMultiple />
        </ElFormItem>
        <div class="space-x-3">
            <ElButton @click="doUploadImageEvent" type="success" size="large">Save</ElButton>
        </div>
    </ElForm>
</template>

<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";
const emits = defineEmits(["success"]);

const fileList = ref<UploadUserFile[]>([]);

function doUploadImageEvent() {
    emits("success", true);
}
</script>
