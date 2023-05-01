<template>
    <ElForm label-position="top">
        <ElFormItem label="Event Banner">
            <ElUpload
                ref="upload"
                list-type="picture"
                :limit="1"
                :on-exceed="handleExceed"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <template #trigger>
                    <el-button type="primary">select file</el-button>
                </template>
            </ElUpload>

            <!-- <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p> -->
        </ElFormItem>

        <ElFormItem label="Event Gallery">
            <ElUpload
                v-model:file-list="fileList"
                list-type="picture-card"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </ElUpload>
            <!-- <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p> -->
        </ElFormItem>
        <div class="float-right space-x-3">
            <ElButton @click="emits('success')" size="large">Skip</ElButton>
            <ElButton @click="doUploadImageEvent" type="success" size="large">Save & Next</ElButton>
        </div>
    </ElForm>
    <el-dialog v-model="dialogVisible" width="25%" title="preview">
        <img class="w-full h-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadInstance, UploadRawFile } from "element-plus";

const emits = defineEmits(["success"]);

const handleExceed: UploadProps["onExceed"] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    upload.value!.handleStart(file);
};

const fileList = ref<UploadUserFile[]>([]);
const upload = ref<UploadInstance>();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};

function doUploadImageEvent() {
    emits("success", true);
}
</script>
