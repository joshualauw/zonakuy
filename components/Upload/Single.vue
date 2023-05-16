<template>
    <ElUpload
        ref="upload"
        :limit="1"
        v-model:file-list="fileList"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
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
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from "element-plus";

const props = defineProps<{ fileUrl?: string }>();
const emits = defineEmits(["file-changed", "file-removed"]);
const upload = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);

watchEffect(() => {
    if (props.fileUrl) {
        fileList.value = [{ name: getFileNameFromUrl(props.fileUrl), url: props.fileUrl }];
    } else {
        fileList.value = [];
    }
});

watch(fileList, async (val) => {
    if (val.length > 0) {
        emits("file-changed", await getFileFromUrl(val[0].url!, val[0].name));
    } else {
        emits("file-changed", null);
    }
});

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    fileList.value = fileList.value.filter((f) => f.uid !== uploadFile.uid);
};

const handleExceed: UploadProps["onExceed"] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
};
</script>
