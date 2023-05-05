<template>
    <div class="grid grid-cols-4 gap-8 h-[600px] w-full">
        <div class="lg:col-span-3 space-y-8 h-full">
            <div class="h-[125px] gap-8 flex flex-col lg:flex-row w-full">
                <EventReportStats />
            </div>
            <div class="card rounded-md h-[475px] overflow-hidden">
                <h3 class="font-semibold mb-4">Transactions</h3>
                <EventReportList />
            </div>
        </div>
        <div class="md:col-span-1 space-y-8 h-full">
            <div class="card rounded-md h-[375px] overflow-hidden">
                <h3 class="font-semibold mb-4">Activity Log</h3>
                <EventLog />
            </div>
            <div class="card rounded-md h-[225px]">
                <h3 class="font-semibold mb-4">Actions</h3>
                <div class="grid grid-cols-2 gap-4">
                    <button class="action-button">
                        <Icon name="material-symbols:event" class="w-6 h-6 mb-1"></Icon> Go To Event
                    </button>
                    <button class="action-button">
                        <Icon name="material-symbols:preview" class="w-6 h-6 mb-1"></Icon> Preview
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});
</script>
