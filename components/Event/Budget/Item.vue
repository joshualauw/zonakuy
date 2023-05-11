<template>
    <div class="card rounded-md w-full space-y-5 mb-8">
        <div class="flex items-center justify-between">
            <p class="font-semibold">{{ budget.name }}</p>
            <slot name="action"></slot>
        </div>
        <div class="space-y-3">
            <p class="text-gray-600">
                Total:
                <span :class="limitWarning">Rp. {{ thousandSeparator(budget.current) }}</span> /
                <span class="font-bold">Rp. {{ thousandSeparator(budget.limit) }}</span>
            </p>
            <p>Category: {{ budget.category }}</p>
        </div>
        <div>
            <span v-for="exp in budget.expenses" class="card rounded-sm shadow-sm p-2 bg-gray-100 mb-2 text-sm">
                {{ exp.name }} - Rp. {{ thousandSeparator(exp.amount) }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Budget } from "@prisma/client";

const props = defineProps<{
    budget: Budget;
}>();

const limitWarning = computed(() => (props.budget.current >= props.budget.limit ? "text-red-500" : "text-green-500"));
</script>
