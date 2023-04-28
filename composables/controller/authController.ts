import { EmailVerifySchema } from "./../../server/schema/authSchema";
import { LoginSchema, RegisterSchema } from "~/server/schema/authSchema";
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
            user.value = { ...deserialize(res.data.value.data.user), token: token.value };
        }

        return { success: !res.error.value, output: res.data.value };
    }

    async function signOut() {
        const token = useCookie("token");
        token.value = null;
        user.value = null;

        ElNotification({ type: "success", title: "Success", message: "logout successful" });
    }

    async function verifyAccount(form: EmailVerifySchema) {
        const globalLoading = loadingStore();
        globalLoading.value = true;
        const res = await useFetch("/api/auth/verify", {
            method: "PUT",
            body: form,
        });
        globalLoading.value = false;
        fetcher(res, errors);
    }

    async function resendVerificationLink(email: string | null) {
        loading.value = true;
        const res = await useFetch("/api/auth/resend", {
            method: "POST",
            body: email,
        });
        loading.value = false;
        fetcher(res, errors);
    }

    return { signUp, signIn, signOut, verifyAccount, resendVerificationLink, errors, loading };
}
