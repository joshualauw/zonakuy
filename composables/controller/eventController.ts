import { CreateEventResponse, CreateEventSchema } from "~/server/api/event/index.post";
import { GetAllEventQuery, GetAllEventResponse } from "./../../server/api/event/index.get";
import fetcher from "~/utils/fetcher";
import { GetOneEventResponse } from "~/server/api/event/[id]/index.get";
import { UpdateEventSchema } from "~/server/api/event/[id]/index.put";
import { UpdateEventFileResponse, UpdateEventFileSchema } from "~/server/api/event/[id]/file.patch";
import { UpdateEventLocationResponse, UpdateEventLocationSchema } from "~/server/api/event/[id]/location.patch";

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

        async updateEventFile(payload: UpdateEventFileSchema, editId: string) {
            const form = new FormData();
            payload.gallery.forEach((g) => {
                form.append(`gallery`, g as string);
            });
            form.append("banner", payload.banner as string);

            loading.value = true;
            const res = await useApi<UpdateEventFileResponse>({
                url: `/api/event/${editId}/file`,
                method: "PATCH",
                body: form,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async updateEventLocation(payload: UpdateEventLocationSchema, editId: string) {
            loading.value = true;
            const res = await useApi<UpdateEventLocationResponse>({
                url: `/api/event/${editId}/location`,
                method: "PATCH",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
