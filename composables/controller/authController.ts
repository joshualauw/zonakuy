import { LoginSchema, RegisterSchema } from "~/server/validation/auth";
import fetcher from "~/utils/fetcher";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);
    const user = authStore();

    async function signUp(form: RegisterSchema) {
        loading.value = true;
        const res = await useFetch("/api/auth/register", {
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return { success: !res.error.value, output: res.data.value };
    }

    async function signIn(form: LoginSchema) {
        loading.value = true;
        const res = await useFetch("/api/auth/login", {
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        if (res.data.value) {
            const token = useCookie("token", { maxAge: 3600 });
            token.value = res.data.value.data.token;
            user.value = { token: token.value, credentials: deserialize(res.data.value.data.user) };
        }

        return { success: !res.error.value, output: res.data.value };
    }

    async function signOut() {
        const token = useCookie("token");
        token.value = null;
        user.value = null;

        ElNotification({ type: "success", title: "Success", message: "logout successful" });
    }

    return { signUp, signIn, signOut, errors, loading };
}
