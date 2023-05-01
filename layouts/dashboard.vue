<template>
    <NuxtLayout name="default">
        <div class="w-full h-screen flex">
            <ElMenu
                default-active="0"
                class="el-menu-vertical-demo h-full space-y-4"
                background-color="#082f49"
                text-color="white"
                :collapse="isCollapse"
            >
                <ElMenuItem index="0">
                    <label class="swap swap-rotate">
                        <input type="checkbox" v-model="isCollapse" />
                        <Icon class="swap-on w-7 h-7" name="material-symbols:chevron-right"></Icon>
                        <Icon class="swap-off w-7 h-7" name="material-symbols:chevron-left"></Icon>
                    </label>
                </ElMenuItem>
                <el-menu-item v-for="(nav, i) in sidebarNav" @click="navigateTo(nav.link)" :index="(i + 1).toString()">
                    <Icon class="w-6 h-6" :name="nav.icon"></Icon>
                    <template #title>
                        <span class="ml-2">{{ nav.name }}</span>
                    </template>
                </el-menu-item>
            </ElMenu>
            <div class="h-full w-3/5 p-8">
                <slot></slot>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isCollapse = ref(true);
const route = useRoute();

const sidebarNav = [
    {
        icon: "material-symbols:bar-chart",
        name: "Overview",
        link: `/event/${route.params.slug}/dashboard/report`,
    },
    {
        icon: "majesticons:user-group",
        name: "Participant",
        link: `/event/${route.params.slug}/dashboard/participant`,
    },
    {
        icon: "uis:schedule",
        name: "Session",
        link: `/event/${route.params.slug}/dashboard/session`,
    },
    {
        icon: "material-symbols:account-balance-wallet",
        name: "Budget",
        link: `/event/${route.params.slug}/dashboard/budget`,
    },
    {
        icon: "mdi:hand-heart",
        name: "Sponsor",
        link: `/event/${route.params.slug}/dashboard/sponsor`,
    },
    {
        icon: "material-symbols:edit-document-rounded",
        name: "Form Builder",
        link: `/event/${route.params.slug}/dashboard/form`,
    },
    {
        icon: "mdi:certificate",
        name: "Certificate Builder",
        link: `/event/${route.params.slug}/dashboard/certificate`,
    },
    {
        icon: "material-symbols:settings",
        name: "Settings",
        link: `/event/${route.params.slug}/dashboard/settings`,
    },
];
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
}
</style>
