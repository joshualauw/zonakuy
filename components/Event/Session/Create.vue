<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Create Session" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Title" :error="error.title">
                    <ElInput v-model="form.title" type="text" size="large" />
                </ElFormItem>
                <ElFormItem label="Description" :error="error.description">
                    <ElInput v-model="form.description" type="textarea" size="large" :rows="4" />
                </ElFormItem>
                <ElFormItem label="Day" :error="error.day">
                    <ElDatePicker
                        v-model="form.day"
                        type="date"
                        style="width: 100%"
                        placeholder="Pick a day"
                        size="large"
                    />
                </ElFormItem>
                <ElFormItem label="Time" :error="error.time">
                    <ElTimePicker
                        v-model="form.time"
                        size="large"
                        is-range
                        range-separator="to"
                        start-placeholder="Start time"
                        end-placeholder="End time"
                    />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="doSaveSession" :loading="loading">Save</el-button>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{ visible: boolean; editId?: any }>();
const emits = defineEmits(["closed", "saved"]);
const isVisible = ref(props.visible);
const globalLoading = loadingStore();

const { createSession, updateSession, getOneSession, errors, loading } = sessionController();
const route = useRoute();

watch(
    () => props.visible,
    async (val) => {
        isVisible.value = val;

        if (props.editId && val) {
            globalLoading.value = true;
            const { data, error } = await getOneSession(props.editId);
            globalLoading.value = false;

            if (!error.value && data.value) {
                const { title, description, day, start_time, end_time } = data.value.data;
                form.title = title;
                form.description = description;
                form.day = day;
                form.time = [hourToDate(start_time), hourToDate(end_time)];
            }
        } else {
            form.reset();
        }
    }
);

const form = useForm({
    title: "",
    description: "",
    day: new Date(),
    time: [new Date(), new Date()] as [Date, Date],
});

const error = computed(() => generateErrors(errors.value));

function closeModal() {
    errors.value = [];
    emits("closed");
}

async function doSaveSession() {
    let error: globalThis.Ref<Error | null>;
    const timeFormat = [
        form.time ? dayjs(form.time[0]).format("H:mm") : "",
        form.time ? dayjs(form.time[1]).format("H:mm") : "",
    ];

    if (props.editId) {
        const { error: updateError } = await updateSession({ ...form, time: timeFormat }, props.editId);
        error = updateError;
    } else {
        const { error: createError } = await createSession({
            ...form,
            time: timeFormat,
            event_id: (route.params as { id: string }).id as string,
        });
        error = createError;
    }

    if (!error.value) {
        closeModal();
        emits("saved");
    }
}
</script>
