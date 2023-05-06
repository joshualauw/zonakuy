import { LoginResponse, LoginSchema } from "~/server/api/auth/login.post";
import { RegisterResponse, RegisterSchema } from "~/server/api/auth/register.post";
import { EmailResendResponse, ResendTokenSchema } from "~/server/api/auth/resend.post";
import { ResetPasswordResponse, ResetPasswordSchema } from "~/server/api/auth/reset.put";
import { VerifyEmailResponse, VerifyEmailSchema } from "~/server/api/auth/verify.put";
import fetcher from "~/utils/fetcher";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);
    const globalLoading = loadingStore();
    const user = authStore();

    async function signUp(form: RegisterSchema) {
        loading.value = true;
        const res = await useApi<RegisterResponse>({
            url: "/api/auth/register",
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return res;
    }

    async function signIn(form: LoginSchema) {
        loading.value = true;
        const res = await useApi<LoginResponse>({
            url: "/api/auth/login",
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return res;
    }

    async function signOut() {
        const token = useCookie("token");
        token.value = null;
        user.value = null;

        ElNotification({ type: "success", title: "Success", message: "logout successful" });
    }

    async function verifyToken(form: VerifyEmailSchema) {
        globalLoading.value = true;
        const res = await useApi<VerifyEmailResponse>({
            url: "/api/auth/verify",
            method: "PUT",
            body: form,
        });
        globalLoading.value = false;
        fetcher(res, errors);

        return res;
    }

    async function resendTokenLink(form: ResendTokenSchema) {
        loading.value = true;
        const res = await useApi<EmailResendResponse>({
            url: "/api/auth/resend",
            method: "POST",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return res;
    }

    async function resetPassword(form: ResetPasswordSchema) {
        loading.value = true;
        const res = await useApi<ResetPasswordResponse>({
            url: "/api/auth/reset",
            method: "PUT",
            body: form,
        });
        loading.value = false;
        fetcher(res, errors);

        return res;
    }

    return { signUp, signIn, signOut, verifyToken, resendTokenLink, resetPassword, errors, loading };
}
