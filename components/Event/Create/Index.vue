<template>
    <ElForm label-position="top">
        <ElFormItem label="Name">
            <ElInput v-model="form.name" type="text" size="large" :class="{ 'border border-red-500': error.name }" />
            <p v-if="error.name" class="mt-0.5 text-xs text-red-500">{{ error.name }}</p>
        </ElFormItem>

        <ElFormItem label="Description">
            <ElInput
                v-model="form.description"
                type="textarea"
                :rows="6"
                resize="none"
                maxlength="3000"
                show-word-limit
                :class="{ 'border border-red-500': error.description }"
            />
            <p v-if="error.description" class="mt-0.5 text-xs text-red-500">{{ error.description }}</p>
        </ElFormItem>

        <ElFormItem label="Limit">
            <ElInput
                v-model="form.limit"
                type="number"
                min="1"
                size="large"
                :class="{ 'border border-red-500': error.price }"
            >
                <template #append>Users</template>
            </ElInput>
            <p v-if="error.limit" class="mt-0.5 text-xs text-red-500">{{ error.limit }}</p>
        </ElFormItem>

        <ElFormItem label="Date" class="flex flex-col">
            <el-date-picker
                v-model="form.date_range"
                size="large"
                type="daterange"
                range-separator="to"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
            <p v-if="error.date_range" class="mt-0.5 text-xs text-red-500">{{ error.date_range }}</p>
        </ElFormItem>

        <ElFormItem label="Tags">
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
            <p v-if="error.tags" class="mt-0.5 text-xs text-red-500">{{ error.tags }}</p>
        </ElFormItem>
        <ElButton @click="doCreateEvent" type="success" size="large" class="float-right" :loading="loading">
            Save
        </ElButton>
    </ElForm>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
const { createEvent, errors, loading } = eventController();

const emits = defineEmits(["success"]);

const newTag = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const form = useForm({
    name: "",
    description: "",
    limit: 1,
    date_range: "",
    tags: [] as string[],
});

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

async function doCreateEvent() {
    //@ts-ignore: string will be validated to array
    const { error, data } = await createEvent({ ...form });
    if (!error.value && data.value) {
        emits("success", data.value.data.slug);
    }
}
</script>
