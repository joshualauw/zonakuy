<template>
    <div class="h-20 shadow-sm bg-gray-900 px-8 md:px-20 flex justify-between items-center">
        <Logo class="text-2xl" invert />
        <ElDropdown @visible-change="iconSwap = !iconSwap" v-if="user" trigger="click">
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
                    <ElDropdownItem>Profile</ElDropdownItem>
                    <ElDropdownItem>History</ElDropdownItem>
                    <ElDropdownItem>Wishlist</ElDropdownItem>
                    <ElDropdownItem>Manage Events</ElDropdownItem>
                    <ElDropdownItem @click="doSignOut" divided>Log out</ElDropdownItem>
                </ElDropdownMenu>
            </template>
        </ElDropdown>
        <button @click="navigateTo('/login')" v-else class="text-white">Log In</button>
    </div>
</template>

<script setup lang="ts">
const user = authStore();
const iconSwap = ref(false);

const { signOut } = authController();

async function doSignOut() {
    await signOut();
    navigateTo("/login");
}
</script>
