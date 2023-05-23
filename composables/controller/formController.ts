import { DeleteFormResponse } from "~/server/api/form/[id].delete";
import { GetOneFormResponse } from "~/server/api/form/[id].get";
import { SaveFormResponse, SaveFormSchema } from "~/server/api/form/[id].put";
import { GetAllFormQuery, GetAllFormResponse } from "~/server/api/form/index.get";
import { CreateFormResponse, CreateFormSchema } from "~/server/api/form/index.post";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);
    const globalLoading = loadingStore();

    return {
        errors,
        loading,

        async getAllForm(query?: GetAllFormQuery) {
            loading.value = true;
            const res = await useApi<GetAllFormResponse>({ url: "/api/form", query });
            loading.value = false;
            fetcher(res, errors, false);

            return res;
        },

        async getOneForm(id: string) {
            loading.value = true;
            const res = await useApi<GetOneFormResponse>({ url: `/api/form/${id}` });
            loading.value = false;
            fetcher(res, errors, false);

            return res;
        },

        async createForm(payload: CreateFormSchema) {
            globalLoading.value = true;
            const res = await useApi<CreateFormResponse>({ url: "/api/form", method: "POST", body: payload });
            globalLoading.value = false;
            fetcher(res, errors);

            return res;
        },

        async deleteForm(deleteId: string) {
            globalLoading.value = true;
            const res = await useApi<DeleteFormResponse>({ url: `/api/form/${deleteId}`, method: "DELETE" });
            globalLoading.value = false;
            fetcher(res, errors);

            return res;
        },

        async saveForm(payload: SaveFormSchema, editId: string) {
            const formData = new FormData();

            formData.append("name", payload.name);
            payload.fields.forEach((f, idx) => {
                formData.append(`image[${idx}]`, (f.image as string) ?? "");
                formData.append("required", f.required ? "0" : "1");
                formData.append("question", f.question);
                formData.append("type", f.type);
                if (f.options.length > 0) {
                    f.options.forEach((f) => formData.append(`options[${idx}]`, f));
                } else {
                    formData.append(`options[${idx}]`, "");
                }
            });

            loading.value = true;
            const res = await useApi<SaveFormResponse>({ url: `/api/form/${editId}`, method: "PUT", body: formData });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
