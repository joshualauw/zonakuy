import { CreateEventResponse, CreateEventSchema } from "~/server/api/event/index.post";
import { GetAllEventQuery, GetAllEventResponse } from "./../../server/api/event/index.get";
import fetcher from "~/utils/fetcher";
import { GetOneEventResponse } from "~/server/api/event/[id]/index.get";
import { UpdateEventSchema } from "~/server/api/event/[id]/index.put";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);

    return {
        errors,
        loading,

        async getAllEvent(query: GetAllEventQuery) {
            loading.value = true;
            const res = await useApi<GetAllEventResponse>({
                url: "/api/event",
                query,
                lazy: true,
            });
            loading.value = false;

            return res;
        },

        async getOneEvent(id: string) {
            loading.value = true;
            const res = await useApi<GetOneEventResponse>({
                url: `/api/event/${id}`,
                method: "GET",
            });
            loading.value = false;

            return res;
        },

        async createEvent(payload: CreateEventSchema) {
            loading.value = true;
            const res = await useApi<CreateEventResponse>({
                url: "/api/event",
                method: "POST",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async updateEvent(payload: UpdateEventSchema, editId: string) {
            loading.value = true;
            const res = await useApi<CreateEventResponse>({
                url: `/api/event/${editId}`,
                method: "PUT",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
