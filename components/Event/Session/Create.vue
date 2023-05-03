<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Create Session" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <ElFormItem label="Title">
                    <ElInput
                        v-model="form.title"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.title }"
                    />
                    <p v-if="error.title" class="mt-0.5 text-xs text-red-500">{{ error.title }}</p>
                </ElFormItem>
                <ElFormItem label="Description">
                    <ElInput
                        v-model="form.description"
                        type="textarea"
                        size="large"
                        :rows="4"
                        :class="{ 'border border-red-500': error.description }"
                    />
                    <p v-if="error.description" class="mt-0.5 text-xs text-red-500">{{ error.description }}</p>
                </ElFormItem>
                <ElFormItem label="Day">
                    <ElDatePicker
                        v-model="form.day"
                        type="date"
                        style="width: 100%"
                        placeholder="Pick a day"
                        size="large"
                    />
                    <!-- <p v-if="error.day" class="mt-0.5 text-xs text-red-500">{{ error.day }}</p> -->
                </ElFormItem>
                <ElFormItem label="Time">
                    <ElTimePicker
                        v-model="form.time_range"
                        size="large"
                        is-range
                        range-separator="to"
                        start-placeholder="Start time"
                        end-placeholder="End time"
                    />
                    <!-- <p v-if="error.time_range" class="mt-0.5 text-xs text-red-500">{{ error.time_range }}</p> -->
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="createSession">Save</el-button>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(["closed"]);
const isVisible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
        isVisible.value = val;
    }
);

const form = useForm({
    title: "",
    description: "",
    day: new Date(),
    time_range: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)] as [Date, Date],
});

const error = { ...form };

function createSession() {
    // logic here
    emits("closed");
}
</script>
