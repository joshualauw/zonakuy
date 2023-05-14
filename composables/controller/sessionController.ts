import { GetOneSessionResponse } from "~/server/api/session/[id].get";
import { SaveSpeakerResponse, SaveSpeakerSchema } from "~/server/api/session/[id].patch";
import { UpdateSessionResponse, UpdateSessionSchema } from "~/server/api/session/[id].put";
import { GetAllSessionQuery, GetAllSessionResponse } from "~/server/api/session/index.get";
import { CreateSessionResponse, CreateSessionSchema } from "~/server/api/session/index.post";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);

    return {
        errors,
        loading,

        async getAllSession(query?: GetAllSessionQuery) {
            loading.value = true;
            const res = await useApi<GetAllSessionResponse>({ url: "/api/session", query });
            loading.value = false;

            return res;
        },

        async getOneSession(id: string) {
            loading.value = true;
            const res = await useApi<GetOneSessionResponse>({ url: `/api/session/${id}` });
            loading.value = false;

            return res;
        },

        async createSession(payload: CreateSessionSchema) {
            loading.value = true;
            const res = await useApi<CreateSessionResponse>({ url: `/api/session`, method: "POST", body: payload });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async saveSpeaker(payload: SaveSpeakerSchema, editId: string) {
            const form = new FormData();
            payload.forEach((s, idx) => {
                form.append(`speaker[avatar][${idx}]`, s.avatar);
                form.append(`speaker[name][${idx}]`, s.name);
                form.append(`speaker[role][${idx}]`, s.role);
            });

            loading.value = true;
            const res = await useApi<SaveSpeakerResponse>({
                url: `/api/session/${editId}`,
                method: "PATCH",
                body: form,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async updateSession(payload: UpdateSessionSchema, editId: string) {
            loading.value = true;
            const res = await useApi<UpdateSessionResponse>({
                url: `/api/session/${editId}`,
                method: "PUT",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
