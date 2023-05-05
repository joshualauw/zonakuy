<template>
    <div v-for="stat in reportStats" class="flex flex-grow card rounded-md">
        <div class="flex space-x-4">
            <Icon :name="stat.icon" class="rounded-full w-14 h-14 p-4" :class="stat.theme"></Icon>
            <div>
                <p class="text-gray-800">{{ stat.name }}</p>
                <p class="text-xl font-bold">{{ stat.data }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const reportStats = [
    {
        name: "Participants",
        data: "15",
        icon: "majesticons:user-group",
        theme: "bg-blue-500 text-white",
    },
    {
        name: "Sessions",
        data: "3",
        icon: "uis:schedule",
        theme: "bg-yellow-500 text-white",
    },
    {
        name: "Revenue",
        data: "Rp, 250.000",
        icon: "material-symbols:money",
        theme: "bg-green-500 text-white",
    },
];
</script>
