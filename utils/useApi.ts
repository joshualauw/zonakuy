import { NitroFetchRequest } from "nitropack";

type UseApiOptions = {
    url: NitroFetchRequest;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
    headers?: Record<string, string>;
    body?: any;
    query?: any;
    lazy?: boolean;
};

export function useApi<T>({ url, method = "GET", headers = {}, lazy = false, ...options }: UseApiOptions) {
    const user = authStore();
    const authHeader = user.value ? { Authorization: `Bearer ${user.value.token}` } : {};
    const mergedHeaders = { ...headers, ...authHeader };

    return useAsyncData(
        `${url.toString()}:${method}`,
        //@ts-ignore
        () => $fetch<T>(url, { headers: mergedHeaders, method, ...options }),
        { lazy }
    );
}
