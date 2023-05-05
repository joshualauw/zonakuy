<template>
    <div class="card rounded-md w-full space-y-6">
        <div class="flex items-center justify-between">
            <p class="font-semibold">BCA</p>
            <slot name="action"></slot>
        </div>
        <div class="box flex-col space-y-5 h-72">
            <NuxtImg src="/img/default_event.jpg" class="rounded-md w-full h-40"></NuxtImg>
            <ElScrollbar class="text-gray-500 text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius maxime, accusamus consectetur ab facilis
                adipisci error amet voluptatibus ipsum? Mollitia, dolorum esse? Ipsum impedit officiis molestias ut
                asperiores dolor sint! (Contact: 0821938291822) Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, excepturi? Eum libero quidem dolor ea doloremque nemo, nam mollitia fugiat voluptate vero
                perspiciatis, voluptas dicta laudantium officia aliquam, rerum sit!
            </ElScrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(["edit"]);
</script>
