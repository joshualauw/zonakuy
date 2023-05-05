<template>
    <div class="card rounded-md w-full space-y-5 mb-8">
        <div class="flex items-center justify-between">
            <p class="font-semibold">Buy Groceries</p>
            <slot name="action"></slot>
        </div>
        <p class="text-gray-600">
            Total:
            <span class="text-green-500">Rp.200.000</span>/
            <span class="text-red-500">Rp.300.000</span>
        </p>
        <div>
            <span v-for="i in 3" class="card rounded-sm shadow-sm p-2 bg-gray-100 mb-2 text-sm"
                >Buy Cabbage - Rp.50.000</span
            >
        </div>
    </div>
</template>
