<template>
    <div class="flex w-full space-x-10">
        <ElForm label-position="top" class="w-1/2">
            <div class="grid grid-cols-2 gap-x-4">
                <ElFormItem label="Country">
                    <ElInput
                        v-model="form.country"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.country }"
                    />
                    <p v-if="error.country" class="mt-0.5 text-xs text-red-500">{{ error.country }}</p>
                </ElFormItem>
                <ElFormItem label="City">
                    <ElInput
                        v-model="form.city"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.city }"
                    />
                    <p v-if="error.city" class="mt-0.5 text-xs text-red-500">{{ error.city }}</p>
                </ElFormItem>
            </div>
            <div class="grid grid-cols-2 gap-x-4">
                <ElFormItem label="Street">
                    <ElInput
                        v-model="form.street"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.street }"
                    />
                    <p v-if="error.street" class="mt-0.5 text-xs text-red-500">{{ error.street }}</p>
                </ElFormItem>
                <ElFormItem label="Postal Code">
                    <ElInput
                        v-model="form.postal_code"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.postal_code }"
                    />
                    <p v-if="error.postal_code" class="mt-0.5 text-xs text-red-500">{{ error.postal_code }}</p>
                </ElFormItem>
            </div>
            <ElFormItem label="Venue">
                <ElInput
                    v-model="form.venue"
                    type="text"
                    size="large"
                    :class="{ 'border border-red-500': error.venue }"
                />
                <p v-if="error.venue" class="mt-0.5 text-xs text-red-500">{{ error.venue }}</p>
            </ElFormItem>
            <ElFormItem label="Suggestions">
                <ElAutocomplete size="large" class="w-full"></ElAutocomplete>
            </ElFormItem>
            <div class="space-x-3 float-right">
                <ElButton type="primary" size="large">
                    <Icon name="material-symbols:search" class="w-5 h-5 mr-2"></Icon>Search in maps
                </ElButton>
                <ElButton type="success" size="large">Save</ElButton>
            </div>
        </ElForm>
        <div class="w-1/2 flex flex-col space-y-5">
            <div class="border box flex-col bg-slate-100 mt-4 h-72 text-center text-gray-500 text-lg font-semibold">
                <Icon name="material-symbols:warning" class="w-12 h-12"></Icon>
                <p class="t">Map not found</p>
            </div>
            <ElForm label-position="top" class="grid grid-cols-2 gap-x-4">
                <ElFormItem label="Latitude">
                    <ElInput
                        v-model="form.latitude"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.latitude }"
                    />
                    <p v-if="error.latitude" class="mt-0.5 text-xs text-red-500">{{ error.latitude }}</p>
                </ElFormItem>
                <ElFormItem label="Longitude">
                    <ElInput
                        v-model="form.longitude"
                        type="text"
                        size="large"
                        :class="{ 'border border-red-500': error.longitude }"
                    />
                    <p v-if="error.longitude" class="mt-0.5 text-xs text-red-500">{{ error.longitude }}</p>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = useForm({
    country: "",
    city: "",
    street: "",
    venue: "",
    postal_code: "",
    latitude: 0,
    longitude: 0,
});

const error = { ...form };
</script>
