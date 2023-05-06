import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import sgMail from "../utils/sendMail";
import { TokenVerifyContext } from "../api/auth/resend.post";

interface EmailOptions {
    compiledTemplate: HandlebarsTemplateDelegate<any>;
    from: string;
    subject: string;
}

const config = useRuntimeConfig();
let emailOptions: EmailOptions | null;

export function setEmailOptions(template_name: string, subject: string, from: string = "zonakuyz@gmail.com") {
    const template = fs.readFileSync(path.join(process.cwd(), `/assets/template/${template_name}`), "utf8");
    emailOptions = {
        compiledTemplate: Handlebars.compile(template),
        subject,
        from,
    };
}

export async function sendEmailTokenLink(email: string, context: TokenVerifyContext, token: string, extra?: Object) {
    if (!emailOptions) return;

    const redirectPath = context == "account-activation" ? "login" : "resetpass";
    await sgMail.send({
        to: email,
        from: emailOptions.from,
        subject: emailOptions.subject,
        html: emailOptions.compiledTemplate({
            ...extra,
            link: `${config.public.BASE_URL}/${redirectPath}?token=${token}&email=${email}`,
        }),
    });
}
