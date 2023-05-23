<template>
    <div class="card rounded-md w-full space-y-6">
        <div class="flex items-center justify-between">
            <p class="font-semibold">{{ form.name == "" ? "Untitled" : form.name }}</p>
            <slot name="action"></slot>
        </div>
        <div class="space-y-2">
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:calendar-month" class="text-gray-500 mr-1 w-4 h-4"></Icon
                >{{ form.fields.length }} Fields
            </p>
            <p class="text-sm flex items-center">
                <Icon name="material-symbols:timer" class="text-gray-500 mr-1 w-4 h-4"></Icon
                >{{ form.responses.length }} Responses
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form } from "@prisma/client";

defineProps<{ form: Form }>();
</script>
