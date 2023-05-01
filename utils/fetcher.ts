import { ElNotification } from "element-plus";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";

export default function (res: any, errors: Ref<ValidationError[]>, successMessage: boolean = true) {
    errors.value = [];
    if (res.error.value) {
        if (res.error.value.data.statusCode == 400) {
            errors.value.push(...res.error.value.data.data);
        } else {
            ElNotification({ type: "error", title: "Error", message: res.error.value.data.message });
        }
    }
    if (res.data.value && successMessage) {
        ElNotification({ type: "success", title: "Success", message: res.data.value.message });
    }
}
