<template>
    <ElUpload
        ref="upload"
        :limit="1"
        v-model:file-list="_fileList"
        :on-exceed="handleExceed"
        :on-remove="handleFileRemoved"
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

const props = defineProps<{ fileList: UploadUserFile[] }>();
const emits = defineEmits(["file-changed", "file-removed"]);
const upload = ref<UploadInstance>();
const _fileList = ref<UploadUserFile[]>([]);

watch(
    () => props.fileList,
    (val) => {
        _fileList.value = [...val];
    },
    { deep: true }
);

watch(_fileList, async (val) => {
    if (val.length > 0) {
        emits("file-changed", await getFileFromUrl(val[0].url!, val[0].name));
    }
});

const handleExceed: UploadProps["onExceed"] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
};

const handleFileRemoved = () => {
    emits("file-removed");
};
</script>
