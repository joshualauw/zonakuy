interface ApiResponse<T> {
    data: T;
    message: any;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface ValidationError {
    path: string;
    message: string;
}
