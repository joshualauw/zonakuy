import { ElNotification } from "element-plus";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";

export default function (res: any, errors: Ref<ValidationError[]>, successMessage: boolean = true) {
    errors.value = [];
    if (res.error.value) {
        const { message, statusCode, data } = res.error.value.data;
        if (statusCode == 400) {
            errors.value.push(data);
        } else if (statusCode == 404) {
            throw createError({ statusCode: 404, statusMessage: "not found" });
        } else {
            ElNotification({ type: "error", title: "Error", message });
        }
    }
    if (res.data.value && successMessage) {
        ElNotification({ type: "success", title: "Success", message: res.data.value.message });
    }
}
