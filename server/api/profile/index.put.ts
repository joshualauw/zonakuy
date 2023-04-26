//update current profile user
export default defineEventHandler(async (event) => {
    return event.context.auth;
});
