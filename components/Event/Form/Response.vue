<template>
    <div class="card w-[650px] mb-8">
        <p class="font-semibold text-lg">{{ form.question }}</p>
        <NuxtImg v-if="form.image" :src="form.image" class="rounded-lg w-52"></NuxtImg>
        <div v-for="opt in form.options"><span class="w-5 h-5 rounded-full bg-bl"></span> {{ opt }}</div>
    </div>
</template>

<script setup lang="ts">
import { FormField } from "@prisma/client";

defineProps<{ form: FormField & { id: string } }>();
</script>
