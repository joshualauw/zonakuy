<template>
    <div class="flex w-full space-x-10">
        <ElForm label-position="top" class="w-1/2">
            <div class="grid grid-cols-2 gap-x-4">
                <ElFormItem label="Country" :error="error.country">
                    <ElInput v-model="form.country" type="text" size="large" />
                </ElFormItem>
                <ElFormItem label="City" :error="error.city">
                    <ElInput v-model="form.city" type="text" size="large" />
                </ElFormItem>
            </div>
            <div class="grid grid-cols-2 gap-x-4">
                <ElFormItem label="Street" :error="error.street">
                    <ElInput v-model="form.street" type="text" size="large" />
                </ElFormItem>
                <ElFormItem label="Postal Code" :error="error.postal_code">
                    <ElInput v-model="form.postal_code" type="text" size="large" />
                </ElFormItem>
            </div>
            <ElFormItem label="Venue" :error="error.venue">
                <ElInput v-model="form.venue" type="text" size="large" />
            </ElFormItem>
            <ElFormItem label="Suggestions">
                <ElSelect
                    @change="selectLocation"
                    v-model="selectedLocation"
                    size="large"
                    placeholder="Select Location"
                    class="w-full"
                >
                    <ElOption
                        v-for="suggest in suggestions"
                        :value="suggest.coordinate"
                        :label="suggest.name"
                    ></ElOption>
                </ElSelect>
            </ElFormItem>
            <div class="space-x-3 float-right">
                <ElButton @click="searchInMaps" type="primary" size="large">
                    <Icon name="material-symbols:search" class="w-5 h-5 mr-2"></Icon>Search in maps
                </ElButton>
                <ElButton @click="doUpdateEventLocation" type="success" size="large" :loading="loading">Save</ElButton>
            </div>
        </ElForm>
        <div class="w-1/2 flex flex-col space-y-5">
            <Leaflet
                :latitude="form.latitude"
                :longitude="form.longitude"
                class="border box flex-col bg-slate-100 mt-4 h-72 text-center text-gray-500 text-lg font-semibold"
            >
                <Icon name="material-symbols:warning" class="w-12 h-12"></Icon>
                <p class="t">Map not found</p>
            </Leaflet>
            <ElForm label-position="top" class="grid grid-cols-2 w-full gap-x-4" style="width: 100%">
                <ElFormItem label="Latitude" :error="error.latitude">
                    <ElInputNumber
                        v-model="form.latitude"
                        :controls="false"
                        type="text"
                        size="large"
                        style="width: 100%"
                    />
                </ElFormItem>
                <ElFormItem label="Longitude" :error="error.longitude">
                    <ElInputNumber
                        v-model="form.longitude"
                        :controls="false"
                        type="text"
                        size="large"
                        style="width: 100%"
                    />
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Event } from "@prisma/client";

const props = defineProps<{ event?: Event }>();

const suggestions = ref<{ name: string; coordinate: [number, number] }[]>([]);
const globalLoading = loadingStore();
const selectedLocation = ref<[number, number]>([0, 0]);

const { updateEventLocation, errors, loading } = eventController();

const form = useForm({
    country: "",
    city: "",
    street: "",
    venue: "",
    postal_code: "",
    latitude: 0,
    longitude: 0,
});

const error = computed(() => generateErrors(errors.value));

if (props.event && props.event.location) {
    const { country, city, street, venue, postal_code, latitude, longitude } = props.event.location;
    form.country = country;
    form.city = city;
    form.street = street;
    form.venue = venue;
    form.postal_code = postal_code;
    form.latitude = latitude;
    form.longitude = longitude;
}

function selectLocation(val: [number, number]) {
    selectedLocation.value = val;
    form.latitude = val[0];
    form.longitude = val[1];
}

async function searchInMaps() {
    globalLoading.value = true;
    const data = await $fetch<OSMResponse[]>("https://nominatim.openstreetmap.org/search", {
        query: {
            q: `${form.venue}, ${form.street}, ${form.city}, ${form.country}, ${form.postal_code}`,
            format: "json",
            limit: 20,
        },
    });
    globalLoading.value = false;
    suggestions.value = [
        ...data.map((d) => ({
            name: d.display_name,
            coordinate: [Number(d.lat), Number(d.lon)] as [number, number],
        })),
    ];
}

async function doUpdateEventLocation() {
    if (props.event) {
        await updateEventLocation({ ...form }, props.event.id);
    }
}
</script>
