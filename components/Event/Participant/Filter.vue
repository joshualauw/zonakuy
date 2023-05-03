<template>
    <div class="flex items-center space-x-2">
        <ElInput v-model="searchTerm" class="w-50" placeholder="Search Participant Name..." :prefix-icon="Search" />
        <ElSelect v-model="roleTerm" filterable placeholder="Select">
            <ElOption key="reguler" label="reguler" value="reguler" />
            <ElOption key="invited" label="invited" value="invited" />
            <ElOption key="organizer" label="collaborator" value="collaborator" />
            <ElOption key="owner" label="owner" value="owner" />
        </ElSelect>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

const searchTerm = ref("");
const roleTerm = ref("reguler");
</script>
