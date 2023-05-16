<template>
    <ClientOnly>
        <div ref="leafletMap" :class="class"></div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { Marker, Map } from "leaflet";

const { $leaflet } = useNuxtApp();

const props = defineProps<{
    latitude: number;
    longitude: number;
    class: string;
}>();

const leafletMap = ref();
let map: Map;
let marker: Marker;

watchEffect(
    useDebounce(() => {
        if (props.latitude != 0 && props.longitude != 0) {
            plotMap();
        }
    }, 2000)
);

function plotMap() {
    if (!map) map = $leaflet.map(leafletMap.value).setView([props.latitude, props.longitude], 13);

    $leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        })
        .addTo(map);

    if (marker) marker.remove();
    marker = $leaflet.marker([props.latitude, props.longitude]).addTo(map);
    map.setView([props.latitude, props.longitude], 13);
}
</script>
