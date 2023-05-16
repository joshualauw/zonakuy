<template>
    <ClientOnly>
        <ElForm label-position="top">
            <ElFormItem label="Event Banner" :error="error.banner">
                <UploadSingle :file-url="form.banner" @file-changed="bannerChange" />
            </ElFormItem>
            <ElFormItem label="Event Gallery" :error="error.gallery">
                <UploadMultiple :file-urls="form.gallery" @file-changed="galleryChange" />
            </ElFormItem>
            <div class="space-x-3">
                <ElButton @click="doUploadImageEvent" type="success" size="large" :loading="loading">Save</ElButton>
            </div>
        </ElForm>
    </ClientOnly>
</template>

<script lang="ts" setup>
const emits = defineEmits(["success"]);
import type { UploadUserFile } from "element-plus";

const form = useForm({
    banner: "",
    gallery: [] as string[],
});

const { errors, loading, updateEventFile, getOneEvent } = eventController();
const error = computed(() => generateErrors(errors.value));
const route = useRoute("event-id");

const bannerFile = ref<UploadUserFile | null>(null);
const galleryFiles = ref<UploadUserFile[]>([]);

onMounted(async () => {
    const { error: getOneEventError, data } = await getOneEvent(route.params.id);
    if (!getOneEventError.value && data.value) {
        const { banner, gallery } = data.value.data;
        if (banner) form.banner = banner;
        form.gallery = [...gallery];
    }
});

function bannerChange(file: any) {
    bannerFile.value = file;
}

function galleryChange(files: any[]) {
    galleryFiles.value = [...files];
}

async function doUploadImageEvent() {
    const { error } = await updateEventFile(
        { banner: bannerFile.value as any, gallery: galleryFiles.value },
        route.params.id
    );
    if (!error.value) {
        emits("success", true);
    }
}
</script>
