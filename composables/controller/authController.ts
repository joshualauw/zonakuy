import { LoginResponse, LoginSchema } from "~/server/api/auth/login.post";
import { RegisterResponse, RegisterSchema } from "~/server/api/auth/register.post";
import { ResendTokenResponse, ResendTokenSchema } from "~/server/api/auth/resend.post";
import { ResetPasswordResponse, ResetPasswordSchema } from "~/server/api/auth/reset.put";
import { VerifyEmailResponse, VerifyEmailSchema } from "~/server/api/auth/verify.put";
import fetcher from "~/utils/fetcher";

export default function () {
    const errors = ref<ValidationError[]>([]);
    const loading = ref(false);
    const globalLoading = loadingStore();
    const user = authStore();

    return {
        errors,
        loading,

        async signUp(payload: RegisterSchema) {
            loading.value = true;
            const res = await useApi<RegisterResponse>({
                url: "/api/auth/register",
                method: "POST",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async signIn(payload: LoginSchema) {
            loading.value = true;
            const res = await useApi<LoginResponse>({
                url: "/api/auth/login",
                method: "POST",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async signOut() {
            const token = useCookie("token");
            token.value = null;
            user.value = null;

            ElNotification({ type: "success", title: "Success", message: "logout successful" });
        },

        async verifyToken(payload: VerifyEmailSchema) {
            globalLoading.value = true;
            const res = await useApi<VerifyEmailResponse>({
                url: "/api/auth/verify",
                method: "PUT",
                body: payload,
            });
            globalLoading.value = false;
            fetcher(res, errors);

            return res;
        },

        async resendTokenLink(payload: ResendTokenSchema) {
            loading.value = true;
            const res = await useApi<ResendTokenResponse>({
                url: "/api/auth/resend",
                method: "POST",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },

        async resetPassword(payload: ResetPasswordSchema) {
            loading.value = true;
            const res = await useApi<ResetPasswordResponse>({
                url: "/api/auth/reset",
                method: "PUT",
                body: payload,
            });
            loading.value = false;
            fetcher(res, errors);

            return res;
        },
    };
}
