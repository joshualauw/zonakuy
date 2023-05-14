<template>
    <ElForm label-position="top">
        <ElFormItem label="Name" :error="error.name">
            <ElInput v-model="form.name" type="text" size="large" />
        </ElFormItem>

        <ElFormItem label="Description" :error="error.description">
            <ElInput
                v-model="form.description"
                type="textarea"
                :rows="6"
                resize="none"
                maxlength="3000"
                show-word-limit
            />
        </ElFormItem>

        <ElFormItem label="Limit" :error="error.limit">
            <ElInput v-model="form.limit" type="number" min="1" size="large">
                <template #append>Users</template>
            </ElInput>
        </ElFormItem>

        <ElFormItem label="Date" class="flex flex-col" :error="error.date_range">
            <el-date-picker
                v-model="form.date_range"
                size="large"
                type="daterange"
                range-separator="to"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
        </ElFormItem>

        <ElFormItem label="Tags" :error="error.tags">
            <ElTag
                v-for="tag in form.tags"
                :key="tag"
                class="m-1"
                closable
                size="large"
                :disable-transitions="false"
                @close="deleteTag(tag)"
            >
                {{ tag }}
            </ElTag>
            <ElInput
                v-if="inputVisible"
                ref="InputRef"
                v-model="newTag"
                class="ml-1 absolute w-20"
                @keyup.enter="createTag"
                @blur="createTag"
            />
            <ElButton v-else class="button-new-tag ml-1" @click="showInput"> + New Tag </ElButton>
        </ElFormItem>
        <ElButton @click="doSaveEvent" type="success" size="large" class="float-right" :loading="loading">
            Save
        </ElButton>
    </ElForm>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
const { createEvent, updateEvent, getOneEvent, errors, loading } = eventController();

const props = defineProps<{ editId?: any }>();
const emits = defineEmits(["saved"]);

const newTag = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const form = useForm({
    name: "",
    description: "",
    limit: 1,
    date_range: [] as unknown as [Date, Date],
    tags: [] as string[],
});

if (props.editId) {
    const { data: event, error } = await getOneEvent(props.editId);
    if (!error.value && event.value) {
        const { name, description, limit, start_date, end_date, tags } = event.value.data;
        form.name = name;
        form.description = description;
        form.limit = limit;
        form.date_range = [start_date, end_date];
        form.tags = tags;
    }
}

const error = computed(() => generateErrors(errors.value));

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value!.input!.focus();
    });
};

function deleteTag(tag: string) {
    form.tags.splice(form.tags.indexOf(tag), 1);
}

function createTag() {
    if (newTag.value) form.tags.push(newTag.value);
    inputVisible.value = false;
    newTag.value = "";
}

async function doSaveEvent() {
    let error: globalThis.Ref<Error | null>;
    let data;

    if (props.editId) {
        const { error: updateError, data: updateData } = await updateEvent({ ...form }, props.editId);
        error = updateError;
        data = updateData;
    } else {
        const { error: createError, data: createData } = await createEvent({ ...form });
        error = createError;
        data = createData;
    }

    if (!error.value && data.value) {
        emits("saved", data.value.data.slug);
    }
}
</script>
