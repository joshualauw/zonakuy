import { CreateEventSchema, createEventSchema } from "~/server/schema/eventSchema";

//buat zona
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await schemaValidator<CreateEventSchema>(createEventSchema, body);

    return validated;
});
