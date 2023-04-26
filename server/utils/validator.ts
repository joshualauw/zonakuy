import Joi from "joi";

export async function schemaValidator<T>(schema: Joi.ObjectSchema<T>, body: T) {
    const { error, value } = schema.validate(body, { abortEarly: false });
    if (error) {
        throw createError({
            statusCode: 400,
            message: ErrorType.validation,
            data: errorFormatter(error),
        });
    }

    return value;
}

export function errorFormatter(err: Joi.ValidationError) {
    return err.details.map((e) => ({ path: e.path[0], message: e.message }));
}
