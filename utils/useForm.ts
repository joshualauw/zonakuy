export default function <V>(initialState: V) {
    const obj = reactive({
        ...initialState,
        reset: () => {
            Object.assign(obj, initialState);
        },
    });
    return obj;
}
