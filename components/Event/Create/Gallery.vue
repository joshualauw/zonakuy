<template>
    <ElForm label-position="top">
        <ElFormItem label="Event Banner">
            <UploadSingle />
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
const emits = defineEmits(["success"]);

function doUploadImageEvent() {
    emits("success", true);
}
</script>
