<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" title="Manage Speaker" width="40%" class="rounded-md">
            <ElForm label-position="top">
                <div class="flex items-center space-x-2">
                    <ElFormItem label="Choose Speaker">
                        <ElSelect v-model="participant" filterable placeholder="Select Participant">
                            <ElOption v-for="i in 10" :key="i" label="John Wick" value="John Wick">
                                <div class="flex space-x-3">
                                    <NuxtImg src="/img/default_user.jpg" class="rounded-full w-8 h-8" />
                                    <p class="text-gray-600">John Wick</p>
                                </div>
                            </ElOption>
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem label="Define Role">
                        <ElInput v-model="role" />
                    </ElFormItem>
                    <ElButton @click="addSpeaker" type="primary" class="ml-2 mt-3">Add +</ElButton>
                </div>
            </ElForm>
            <div class="mt-4">
                <ElTag
                    v-for="(speaker, idx) in speakers"
                    @close="removeTag(idx)"
                    style="height: 65px"
                    effect="plain"
                    class="mb-4 mr-4"
                    closable
                >
                    <div class="box text-black text-sm space-x-2">
                        <NuxtImg src="/img/default_user.jpg" class="rounded-full w-9 h-9" />
                        <div>
                            <p>{{ speaker.name }}</p>
                            <p class="text-gray-500 text-sm">{{ speaker.role }}</p>
                        </div>
                    </div>
                </ElTag>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="saveSpeaker">Save</el-button>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean; editId: any }>();
const emits = defineEmits(["closed", "saved"]);
const isVisible = ref(props.visible);

const participant = ref("");
const role = ref("");
const speakers = ref<{ name: string; role: string }[]>([]);

watch(
    () => props.visible,
    (val) => {
        isVisible.value = val;
    }
);

function addSpeaker() {
    speakers.value.push({
        name: participant.value,
        role: role.value,
    });
}

function saveSpeaker() {
    emits("saved");
}

function removeTag(idx: number) {
    speakers.value.splice(idx, 1);
}
</script>
