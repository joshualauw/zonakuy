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

        <ElFormItem class="flex items-center" label="Price (IDR)" :error="error.price">
            <ElInputNumber v-model="form.price" type="number" :min="10000" :step="5000" :disabled="isFree" size="large">
                <template #prepend>Rp.</template>
            </ElInputNumber>
            <ElCheckbox v-model="isFree" class="ml-4">Free?</ElCheckbox>
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
import { Event } from "@prisma/client";
import { ElInput } from "element-plus";
const { createEvent, updateEvent, errors, loading } = eventController();

const props = defineProps<{ event?: Event }>();
const newTag = ref("");
const isFree = ref(false);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const form = useForm({
    name: "",
    description: "",
    limit: 1,
    price: 10000,
    date_range: [] as unknown as [Date, Date],
    tags: [] as string[],
});

if (props.event) {
    const { name, description, limit, start_date, end_date, tags, price } = props.event;
    form.name = name;
    form.description = description;
    form.limit = limit;
    form.date_range = [start_date, end_date];
    form.tags = tags;
    if (price == 0) {
        form.price = 10000;
        isFree.value = true;
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
    if (props.event) {
        await updateEvent({ ...form, price: isFree.value ? 0 : form.price }, props.event.id);
    } else {
        await createEvent({ ...form, price: isFree.value ? 0 : form.price });
    }
}
</script>
