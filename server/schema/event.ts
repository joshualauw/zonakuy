import { Event } from "@prisma/client";
import Joi from "joi";

export type CreateEventSchema = Pick<
    Event,
    | "user_id"
    | "name"
    | "description"
    | "price"
    | "banner"
    | "gallery"
    | "limit"
    | "start_date"
    | "end_date"
    | "location"
    | "tags"
>;
