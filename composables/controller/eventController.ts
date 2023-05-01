import { CreateEventResponse, CreateEventSchema } from "~/server/api/event/index.post";
import { GetAllEventQuery, GetAllEventResponse } from "./../../server/api/event/index.get";
import fetcher from "~/utils/fetcher";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);

    async function getAllEvent(query: GetAllEventQuery) {
        loading.value = true;
        const res = await useApi<GetAllEventResponse>({
            url: "/api/event",
            method: "GET",
            query,
        });
        loading.value = false;
        fetcher(res, errors, false);

        return res;
    }

    async function createEvent(form: CreateEventSchema) {
        loading.value = true;
        const res = await useApi<CreateEventResponse>({
            url: "/api/event",
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return res;
    }

    return { createEvent, getAllEvent, errors, loading };
}
