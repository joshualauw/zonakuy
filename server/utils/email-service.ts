import sgMail from "@sendgrid/mail";

export async function sendMail(msg: sgMail.MailDataRequired) {
    const config = useRuntimeConfig();
    sgMail.setApiKey(config.SENDGRID_API_KEY);

    try {
        await sgMail.send(msg);
        console.log(`email successfully sent to ${msg.to}`);
    } catch (err) {
        throw createError({ statusCode: 500, message: ErrorType.email, data: err });
    }
}
