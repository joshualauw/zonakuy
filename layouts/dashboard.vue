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
                <el-menu-item v-for="(nav, i) in sidebarNav" @click="goToMenuPage(nav)" :index="(i + 1).toString()">
                    <Icon class="w-6 h-6" :name="nav.icon"></Icon>
                    <template #title>
                        <span class="ml-2">{{ nav.name }}</span>
                    </template>
                </el-menu-item>
            </ElMenu>
            <div class="h-full w-full px-10 pb-8 pt-4 overflow-auto">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-lg font-semibold">{{ currentPageName }}</h1>
                    <ElDropdown v-if="user" @visible-change="iconSwap = !iconSwap" trigger="click">
                        <span>
                            <Avatar
                                class="shrink-0"
                                :name="user.username"
                                :description="user.email"
                                :image="user.profile_picture"
                            >
                                <template #action>
                                    <label class="swap swap-rotate">
                                        <input v-model="iconSwap" type="checkbox" disabled />
                                        <Icon class="swap-on ml-2" name="fa:chevron-up" />
                                        <Icon class="swap-off ml-2" name="fa:chevron-down" />
                                    </label>
                                </template>
                            </Avatar>
                        </span>
                        <template #dropdown>
                            <ElDropdownMenu class="md:w-48">
                                <ElDropdownItem @click="navigateTo(`/profile/${user.username}`)">
                                    Profile
                                </ElDropdownItem>
                                <ElDropdownItem @click="navigateTo('/event')" divided>Back to Home</ElDropdownItem>
                            </ElDropdownMenu>
                        </template>
                    </ElDropdown>
                </div>
                <slot></slot>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isCollapse = ref(true);
const router = useRouter();
const user = authStore();
const iconSwap = ref(false);

const { getOneEvent } = eventController();

const route = useRoute();

const { error } = await getOneEvent(route.params.slug as string);
if (error.value) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const currentPath = computed(() => router.currentRoute.value);

const sidebarNav = [
    {
        icon: "material-symbols:bar-chart",
        name: "Overview",
        link: `/event/${currentPath.value.params.slug}/dashboard/report`,
    },
    {
        icon: "majesticons:user-group",
        name: "Participant",
        link: `/event/${currentPath.value.params.slug}/dashboard/participant`,
    },
    {
        icon: "uis:schedule",
        name: "Session",
        link: `/event/${currentPath.value.params.slug}/dashboard/session`,
    },
    {
        icon: "material-symbols:account-balance-wallet",
        name: "Budget",
        link: `/event/${currentPath.value.params.slug}/dashboard/budget`,
    },
    {
        icon: "mdi:hand-heart",
        name: "Sponsor",
        link: `/event/${currentPath.value.params.slug}/dashboard/sponsor`,
    },
    {
        icon: "material-symbols:edit-document-rounded",
        name: "Form Builder",
        link: `/event/${currentPath.value.params.slug}/dashboard/form`,
    },
    {
        icon: "mdi:certificate",
        name: "Certificate Builder",
        link: `/event/${currentPath.value.params.slug}/dashboard/certificate`,
    },
    {
        icon: "material-symbols:settings",
        name: "Settings",
        link: `/event/${currentPath.value.params.slug}/dashboard/settings`,
    },
];

const currentPageName = ref(sidebarNav.find((n) => n.link == currentPath.value.fullPath)?.name);

function goToMenuPage(nav: (typeof sidebarNav)[0]) {
    currentPageName.value = nav.name;
    navigateTo(nav.link);
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
}
</style>
