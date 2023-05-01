import yup from "yup";
//update lokasi zona
export const locationSchema = yup.object({
    coordinate: yup.array(yup.number().required()),
    country: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    venue: yup.string().required(),
    postal_code: yup.string().required(),
});

export type LocationSchema = yup.InferType<typeof locationSchema>;
