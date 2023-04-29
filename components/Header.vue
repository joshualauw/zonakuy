<template>
    <div class="h-20 shadow-sm bg-gray-900 px-8 md:px-20 flex justify-between items-center">
        <Logo class="text-2xl" invert link />
        <div v-if="user" class="box space-x-10">
            <button
                @click="$router.push('/event/create')"
                class="text-white tracking-tight text-sm md:text-base cursor-pointer"
            >
                <Icon name="material-symbols:add" class="w-6 h-6 mr-1"></Icon> Create Event
            </button>
            <ElDropdown @visible-change="iconSwap = !iconSwap" trigger="click">
                <span class="el-dropdown-link">
                    <button class="group flex shrink-0 items-center rounded-lg">
                        <NuxtImg
                            :src="user.profile_picture ?? '/img/default_user.jpg'"
                            class="rounded-full w-7 h-7 md:w-10 md:h-10 mr-1"
                        />
                        <p class="ms-2 hidden text-left text-white text-xs sm:block">
                            <strong class="block font-medium">{{ user.username }}</strong>
                            <span class="text-gray-300">{{ user.email }}</span>
                        </p>
                        <label class="swap swap-rotate">
                            <input v-model="iconSwap" type="checkbox" disabled />
                            <Icon class="swap-on text-gray-200 ml-2" name="fa:chevron-up" />
                            <Icon class="swap-off text-gray-200 ml-2" name="fa:chevron-down" />
                        </label>
                    </button>
                </span>
                <template #dropdown>
                    <ElDropdownMenu class="md:w-48">
                        <ElDropdownItem @click="navigateTo(`/profile/${user.username}`)">Profile</ElDropdownItem>
                        <ElDropdownItem @click="navigateTo('/event/wishlist')">Wishlist</ElDropdownItem>
                        <ElDropdownItem @click="navigateTo('/event/manage')">Manage Events</ElDropdownItem>
                        <ElDropdownItem @click="navigateTo('/event/manage')">Notifications</ElDropdownItem>
                        <ElDropdownItem @click="doSignOut" divided>Log out</ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </div>
        <button @click="navigateTo('/login')" v-else class="text-white">Log In</button>
    </div>
</template>

<script setup lang="ts">
const user = authStore();
const iconSwap = ref(false);
const { signOut } = authController();

async function doSignOut() {
    await signOut();
    return navigateTo({ path: "/login", replace: true });
}
</script>
