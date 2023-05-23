<template>
    <div class="card space-y-4 mb-8">
        <h1 class="font-bold text-lg">Filter & Search</h1>
        <ElForm label-position="top">
            <ElFormItem label="Keyword">
                <ElInput :prefix-icon="Search" size="large" placeholder="Search events..." rounded></ElInput>
            </ElFormItem>
            <ElFormItem label="Date Range">
                <ElDatePicker type="daterange" size="large" start-placeholder="Start date" end-placeholder="End date" />
            </ElFormItem>
            <ElFormItem label="Price">
                <ElInput size="large" placeholder="Minimum Price..." rounded>
                    <template #prepend>Rp.</template>
                </ElInput>
            </ElFormItem>
            <ElButton type="success" class="float-right">Apply</ElButton>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>
