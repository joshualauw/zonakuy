<template>
    <ClientOnly>
        <ElDialog
            v-model="isVisible"
            @close="$emit('closed')"
            title="Invite participant"
            width="30%"
            class="rounded-md"
        >
            <ElForm label-position="top">
                <ElFormItem label="Email">
                    <ElInput
                        v-model="form.email"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.email }"
                    />
                    <p v-if="error.email" class="mt-0.5 text-xs text-red-500">{{ error.email }}</p>
                </ElFormItem>
                <ElFormItem class="flex">
                    <ElCheckbox
                        v-model="form.isCollaborator"
                        type="text"
                        label="Invite as collaborator"
                        size="large"
                        :class="{ 'border border-red-500': error.isCollaborator }"
                    />
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="collaborator can help edit your event"
                        placement="top"
                    >
                        <Icon name="material-symbols:info" class="text-gray-500 ml-2"></Icon>
                    </el-tooltip>
                    <p v-if="error.isCollaborator" class="mt-0.5 text-xs text-red-500">{{ error.isCollaborator }}</p>
                    <p class="text-gray-500 text-xs">
                        By sending invitation your recepient will received a code that can be entered to join your event
                        instantly
                    </p>
                </ElFormItem>
            </ElForm>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('closed')">Cancel</el-button>
                    <el-button type="primary" @click="inviteParticipant">Invite</el-button>
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
    email: "",
    isCollaborator: false,
});
const error = { ...form };

function inviteParticipant() {
    // logic here
    emits("closed");
}
</script>
