<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="Managed events" name="managed">
            <EventItem v-for="i in 3" :data="i" type="edit" />
        </el-tab-pane>
        <el-tab-pane label="Registered Events" name="registered">
            <EventItem v-for="i in 4" :data="i" type="link" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const activeName = ref("managed");
</script>
