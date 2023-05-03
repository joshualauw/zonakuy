<template>
    <div class="box flex-col space-y-4 h-full p-2">
        <ElDropdown trigger="click">
            <ElButton><Icon name="material-symbols:settings" class="w-4 h-4 mr-1" />Options</ElButton>
            <template #dropdown>
                <ElDropdownMenu>
                    <ElDropdownItem @click="navigateTo(editLink)">
                        <Icon name="material-symbols:edit" class="mr-1 w-4 h-4"></Icon> edit
                    </ElDropdownItem>
                    <ElDropdownItem>
                        <Icon name="material-symbols:send" class="mr-1 w-4 h-4"></Icon> main page
                    </ElDropdownItem>
                </ElDropdownMenu>
            </template>
        </ElDropdown>
        <span class="badge badge-outline">
            <div class="rounded-full w-3 h-3 bg-green-500 mr-1"></div>
            Active
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps<{ editLink: string }>();
</script>
