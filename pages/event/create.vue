<template>
    <div>
        <div class="mt-8 space-y-4 md:w-4/5 lg:w-3/4 xl:w-1/2 mx-auto card">
            <h1 class="text-lg font-semibold mb-4 text-center">Create New Event</h1>
            <EventCreate @saved="goToEventDashboard" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

function goToEventDashboard(slug: string) {
    navigateTo(`/event/${slug}/dashboard/report`);
}
</script>
