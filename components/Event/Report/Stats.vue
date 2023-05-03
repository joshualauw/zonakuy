<template>
    <div v-for="stat in reportStats" class="flex flex-grow card rounded-md">
        <div class="flex space-x-4">
            <Icon :name="stat.icon" class="rounded-full w-14 h-14 p-4 bg-slate-200"></Icon>
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
    },
    {
        name: "Sessions",
        data: "3",
        icon: "uis:schedule",
    },
    {
        name: "Revenue",
        data: "Rp, 250.000",
        icon: "material-symbols:money",
    },
];
</script>
