<template>
    <ElUpload
        v-model:file-list="_fileList"
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
import type { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{ fileList: UploadUserFile[] }>();
const emits = defineEmits(["file-changed"]);
const _fileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

watch(
    () => props.fileList,
    (val) => {
        _fileList.value = val && val.length > 0 ? [...val] : [];
    },
    { deep: true }
);

watch(_fileList, async (val) => {
    const files = [];
    for (let i = 0; i < val.length; i++) {
        files.push(await getFileFromUrl(val[i].url!, val[i].name));
    }
    emits("file-changed", files);
});

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    _fileList.value = _fileList.value.filter((f) => f.uid !== uploadFile.uid);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};
</script>
