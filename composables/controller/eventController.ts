import { CreateEventSchema } from "~/server/schema/eventSchema";
import fetcher from "~/utils/fetcher";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);
    const user = authStore();

    async function createEvent(form: CreateEventSchema) {
        loading.value = true;
        const res = await useFetch("/api/event", {
            method: "POST",
            body: form,
            headers: { Authorization: `Bearer ${user.value?.token}` },
        });
        loading.value = false;
        fetcher(res, errors);

        return { success: !res.error.value, output: res.data.value };
    }

    return { createEvent, errors, loading };
}
