<template>
    <div class="card w-[650px] mb-8">
        <div class="flex items-center space-x-6 mb-4">
            <ElInput v-model="_form.question" size="large" placeholder="Question" />
            <div class="box rounded-full p-2 bg-slate-100 relative">
                <input type="file" class="absolute top-0 left-0 w-10 h-10 opacity-0" />
                <Icon name="material-symbols:image" class="w-5 h-5 text-gray-500" />
            </div>
            <ElDropdown trigger="click" size="large" type="primary">
                <div class="flex items-center w-32">
                    {{ formTooltip }}<Icon name="fa:chevron-down" class="ml-3"></Icon>
                </div>
                <template #dropdown>
                    <ElDropdownMenu>
                        <ElDropdownItem @click="setType(item)" v-for="item in dropdownItem" :divided="item.divided">
                            <Icon :name="item.icon" class="w-4 h-5 mr-2"></Icon>{{ item.name }}
                        </ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </div>
        <NuxtImg v-if="_form.image" :src="_form.image" class="rounded-lg w-52"></NuxtImg>
        <p v-for="(opt, idx) in _form.options" class="text-gray-500 text-sm space-x-2 mb-2">
            <ElInput v-model="_form.options[idx]" style="width: 350px" :placeholder="`Option ${idx + 1}`" />
            <Icon @click="addOption" name="material-symbols:add" class="cursor-pointer"></Icon>
            <Icon @click="deleteOption(idx)" name="fa6-solid:xmark" class="cursor-pointer text-red-500"></Icon>
        </p>
        <div class="flex w-full justify-end space-x-3">
            <ElCheckbox v-model="_form.required" label="Required?" size="large" />
            <ElButton @click="$emit('field-deleted', _form.id)" type="danger">Delete</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormField } from "@prisma/client";

const props = defineProps<{ form: FormField & { id: string } }>();
const emits = defineEmits(["field-change", "field-deleted"]);
const _form = reactive({ ...props.form });

watch(
    _form,
    (val) => {
        emits("field-change", deserialize(val));
    },
    { deep: true }
);

function addOption() {
    _form.options.push("");
}

function deleteOption(idx: number) {
    _form.options.splice(idx, 1);
}

function setType(item: FormDropdownItem) {
    if (item.type == "checkbox" || item.type == "radiobutton") {
        _form.options = _form.options.length > 0 ? [..._form.options] : [""];
    } else {
        _form.options = [];
    }
    _form.type = item.type;
    formTooltip.value = item.name;
}

const dropdownItem: FormDropdownItem[] = [
    { icon: "uim:paragraph", name: "Short Text", type: "shorttext" },
    { icon: "system-uicons:paragraph-end", name: "Paragraph", type: "paragraph" },
    { icon: "material-symbols:check-box-outline", name: "Checkbox", divided: true, type: "checkbox" },
    { icon: "ic:baseline-radio-button-checked", name: "Radio Button", type: "radiobutton" },
    { icon: "material-symbols:image", name: "File Upload", type: "fileupload", divided: true },
    { icon: "material-symbols:calendar-add-on", name: "Date Time", type: "datetime" },
];

const formTooltip = ref(dropdownItem[0].name);
</script>
