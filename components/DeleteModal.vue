<template>
    <ClientOnly>
        <ElDialog v-model="isVisible" @close="$emit('closed')" :title="title" :width="width ?? '30%'" center>
            <p class="text-center">are you sure you want to delete this item? this action cannot be undone</p>
            <slot></slot>
            <template #footer>
                <span class="dialog-footer">
                    <ElButton @click="$emit('closed')">Cancel</ElButton>
                    <ElButton type="danger" @click="deleteItem">Delete</ElButton>
                </span>
            </template>
        </ElDialog>
    </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean; title: string; width?: string }>();
const emits = defineEmits(["closed", "deleted"]);
const isVisible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
        isVisible.value = val;
    }
);

function deleteItem() {
    emits("closed");
    emits("deleted");
}
</script>
