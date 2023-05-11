interface ApiResponse<T> {
    data: T;
    message: any;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Modify<T, R> = Omit<T, keyof R> & R;

type YupMixed<T, K extends keyof T> = {
    [P in K]: AnyPresentValue;
} & Omit<T, K>;

interface ValidationError {
    path: string;
    message: string;
}

interface FormDropdownItem {
    icon: string;
    divided?: boolean;
    name: string;
    type: FormType;
}
