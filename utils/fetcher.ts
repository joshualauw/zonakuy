//NOTE: use this as a wrapper for api call other than GET request
//shape toast message and error
import { ElNotification } from "element-plus";

export default function (res: any, errors: Ref<ValidationError[]>) {
    errors.value = [];
    if (res.error.value) {
        if (res.error.value.data.statusCode == 400) {
            errors.value.push(...res.error.value.data.data);
        } else {
            ElNotification({ type: "error", title: "Error", message: res.error.value.data.data });
        }
    }
    if (res.data.value) {
        ElNotification({ type: "success", title: "Success", message: res.data.value.message });
    }

    return errors;
}
