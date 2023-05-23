<template>
    <div class="h-20 shadow-sm bg-gray-900 px-8 md:px-20 flex justify-between items-center">
        <Logo class="text-2xl" invert link />
        <div v-if="user" class="box space-x-12">
            <button
                @click="$router.push('/event/create')"
                class="text-white tracking-tight text-sm md:text-base cursor-pointer"
            >
                <Icon name="material-symbols:add" class="w-6 h-6 mr-1"></Icon> Create Event
            </button>
            <ElDropdown @visible-change="iconSwap = !iconSwap" trigger="click">
                <span>
                    <Avatar
                        class="text-white shrink-0"
                        :name="user.username"
                        :description="user.email"
                        :image="user.profile_picture"
                    >
                        <template #action>
                            <label class="swap swap-rotate">
                                <input v-model="iconSwap" type="checkbox" disabled />
                                <Icon class="swap-on text-gray-200 ml-2" name="fa:chevron-up" />
                                <Icon class="swap-off text-gray-200 ml-2" name="fa:chevron-down" />
                            </label>
                        </template>
                    </Avatar>
                </span>
                <template #dropdown>
                    <ElDropdownMenu class="md:w-48">
                        <ElDropdownItem @click="navigateTo(`/profile/${user.username}`)">Profile</ElDropdownItem>
                        <ElDropdownItem @click="navigateTo('/event/wishlist')">Wishlist</ElDropdownItem>
                        <ElDropdownItem @click="navigateTo('/event/manage')">Manage Events</ElDropdownItem>
                        <ElDropdownItem @click="doSignOut" divided>Log out</ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </div>
        <button @click="navigateTo('/login')" v-else class="text-white">Sign Up</button>
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
