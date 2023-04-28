<template>
    <div class="card relative flex flex-row items-start md:space-x-6 w-full mb-8">
        <NuxtImg class="w-52 hidden md:block h-full rounded-lg" src="/img/default_event.jpg"></NuxtImg>
        <div class="w-3/4 h-full">
            <h1 class="font-bold text-base md:text-lg mb-1">ZonaKuy Conference Event #{{ data }}</h1>
            <p class="text-sm">
                <Icon name="material-symbols:timer" class="text-gray-500 mr-2"></Icon>Sat, 26 Apr - Mon, 28 Apr
            </p>
            <p class="text-sm">
                <Icon name="material-symbols:location-on" class="text-gray-500 mr-2 mb-1"></Icon>Online
            </p>
            <ElTag class="m-1.5 cursor-pointer hover:brightness-90" type="info">Conference</ElTag>
            <ElTag class="m-1.5 cursor-pointer hover:brightness-90" type="info">Meeting</ElTag>
            <ElTag class="m-1.5 cursor-pointer hover:brightness-90" type="info">Hybrid</ElTag>
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="w-1/4 box flex-col h-full rounded-lg">
            <p class="font-extrabold text-base md:text-xl">Rp. 25.000</p>
            <p class="text-gray-500 text-sm md:text-base mb-4">10 slots left</p>
            <ElButton>Register</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(["data"]);
</script>
