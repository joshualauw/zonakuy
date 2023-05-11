import { DeleteBudgetResponse } from "~/server/api/budget/[id].delete";
import { UpdateBudgetResponse, UpdateBudgetSchema } from "./../../server/api/budget/[id].put";
import { GetAllBudgetQuery, GetAllBudgetResponse } from "~/server/api/budget/index.get";
import { CreateBudgetResponse, CreateBudgetSchema } from "~/server/api/budget/index.post";
import { GetOneBudgetResponse } from "~/server/api/budget/[id].get";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);

    return {
        errors,
        loading,

        async getOneBudget(id: string) {
            loading.value = true;
            const res = await useApi<GetOneBudgetResponse>({ url: `/api/budget/${id}` });
            loading.value = false;

            return res;
        },

        async getAllBudget(query?: GetAllBudgetQuery) {
            loading.value = true;
            const res = await useApi<GetAllBudgetResponse>({ url: "/api/budget", query });
            loading.value = false;

            return res;
        },

        async createBudget(payload: CreateBudgetSchema) {
            loading.value = true;
            const res = await useApi<CreateBudgetResponse>({ url: "/api/budget", method: "POST", body: payload });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async updateBudget(payload: UpdateBudgetSchema, editId: string) {
            loading.value = true;
            const res = await useApi<UpdateBudgetResponse>({
                url: `/api/budget/${editId}`,
                method: "PUT",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async deleteBudget(deleteId: string) {
            loading.value = true;
            const res = await useApi<DeleteBudgetResponse>({
                url: `/api/budget/${deleteId}`,
                method: "DELETE",
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
