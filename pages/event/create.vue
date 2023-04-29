<template>
    <div>
        <div class="mt-8 space-y-4 md:w-4/5 lg:w-3/4 xl:w-1/2 mx-auto card">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="Basic Info" />
                <el-step title="Gallery" />
                <el-step title="Location" />
            </el-steps>
            <EventCreate v-if="active == 0" @success="active++" />
            <ClientOnly v-else-if="active == 1">
                <EventCreateGallery />
            </ClientOnly>
            <EventCreateLocation v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const active = ref(0);
</script>
