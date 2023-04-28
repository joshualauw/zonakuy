import yup from "yup";

export const locationSchema = yup.object({
    coordinate: yup.array(yup.number()),
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
    price: yup.number().required(),
    limit: yup.number().required(),
    start_date: yup.date().required(),
    end_date: yup.date().required(),
    tags: yup.array(yup.string()).optional(),
});

export type CreateEventSchema = yup.InferType<typeof createEventSchema>;
