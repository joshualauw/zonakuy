<template>
    <ElUpload
        ref="upload"
        :limit="5"
        v-model:file-list="fileList"
        :on-remove="handleRemove"
        list-type="picture-card"
        :auto-upload="false"
    >
        <template #trigger>
            <Icon name="fa:plus" size="24"></Icon>
        </template>
    </ElUpload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadInstance, UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{ fileUrls?: string[] }>();
const emits = defineEmits(["file-changed", "file-removed"]);
const upload = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);

watchEffect(() => {
    if (props.fileUrls && props.fileUrls.length > 0) {
        fileList.value = [...props.fileUrls.map((f) => ({ name: getFileNameFromUrl(f), url: f }))];
    } else {
        fileList.value = [];
    }
});

watch(fileList, async (val) => {
    if (val.length > 0) {
        let files = [];
        for (let i = 0; i < val.length; i++) {
            files.push(await getFileFromUrl(val[i].url!, val[i].name));
        }
        emits("file-changed", files);
    } else {
        emits("file-changed", []);
    }
});

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    fileList.value = fileList.value.filter((f) => f.uid !== uploadFile.uid);
};
</script>
