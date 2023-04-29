import yup from "yup";

export const locationSchema = yup.object({
    coordinate: yup.array(yup.number().required()),
    country: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    venue: yup.string().required(),
    postal_code: yup.string().required(),
});

export type LocationSchema = yup.InferType<typeof locationSchema>;

export const createEventSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required().min(0),
    limit: yup.number().required().min(1),
    date_range: yup.array(yup.string().required()).min(2).required(),
    tags: yup.array(yup.string().required()).required().min(1),
});

export type CreateEventSchema = yup.InferType<typeof createEventSchema>;
