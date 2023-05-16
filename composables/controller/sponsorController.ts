import { UpdateSponsorSchema, UpdateSponsorResponse } from "~/server/api/sponsor/[id].put";
import { GetOneSponsorResponse } from "./../../server/api/sponsor/[id].get";
import { GetAllSponsorQuery, GetAllSponsorResponse } from "~/server/api/sponsor/index.get";
import { CreateSponsorSchema, CreateSponsorResponse } from "~/server/api/sponsor/index.post";
import { DeleteSponsorResponse } from "~/server/api/sponsor/[id].delete";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);

    return {
        errors,
        loading,

        async getAllSponsor(query?: GetAllSponsorQuery) {
            loading.value = true;
            const res = await useApi<GetAllSponsorResponse>({ url: "/api/sponsor", query });
            loading.value = false;

            return res;
        },

        async getOneSponsor(id: string) {
            loading.value = true;
            const res = await useApi<GetOneSponsorResponse>({ url: `/api/sponsor/${id}` });
            loading.value = false;

            return res;
        },

        async updateSponsor(payload: UpdateSponsorSchema, editId: string) {
            const form = new FormData();
            form.append("logo", (payload.logo as Blob) ?? "");
            form.append("name", payload.name ?? "");
            form.append("description", payload.description ?? "");

            loading.value = true;
            const res = await useApi<UpdateSponsorResponse>({
                url: `/api/sponsor/${editId}`,
                method: "PUT",
                body: form,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async createSponsor(payload: CreateSponsorSchema) {
            const form = new FormData();
            form.append("logo", (payload.logo as Blob) ?? "");
            form.append("name", payload.name ?? "");
            form.append("description", payload.description ?? "");
            form.append("event_id", payload.event_id ?? "");

            loading.value = true;
            const res = await useApi<CreateSponsorResponse>({ url: "/api/sponsor", method: "POST", body: form });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async deleteSponsor(deleteId: string) {
            loading.value = true;
            const res = await useApi<DeleteSponsorResponse>({
                url: `/api/sponsor/${deleteId}`,
                method: "DELETE",
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
