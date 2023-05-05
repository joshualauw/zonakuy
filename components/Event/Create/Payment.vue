<template>
    <div class="space-y-8">
        <div class="space-y-5">
            <ElButton type="primary" size="large">
                <Icon name="material-symbols:lock" class="w-4 h-4 mr-2" />
                Integrate With Xendit
            </ElButton>
            <div class="border-2 flex items-center justify-between p-8 text-green-500">
                Successfully Connected to @Joshualauw
                <ElButton type="danger">Remove</ElButton>
            </div>
            <p class="text-gray-500 text-sm">Connect your user account to xendit to receive payments</p>
        </div>
        <div class="space-y-4">
            <h3 class="font-semibold text-lg">Set Event Price</h3>
            <ElInput v-model="price" type="number" size="large">
                <template #prepend>Rp.</template>
            </ElInput>
            <ElButton type="success" size="large">Save</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const price = ref(0);
</script>
