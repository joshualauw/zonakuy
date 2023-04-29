import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

export async function sendEmailVerificationLink(email: string, username: string, token: string) {
    const template = fs.readFileSync(path.join(process.cwd(), "/assets/html/email-verification.hbs"), "utf8");
    const compiledTemplate = Handlebars.compile(template);
    const config = useRuntimeConfig();

    //TODO: fix base_url in production environment
    await sendMail({
        to: email,
        from: "zonakuyz@gmail.com",
        subject: "Zonakuy Email Verification",
        html: compiledTemplate({
            name: username,
            link: `${config.public.BASE_URL}/login?token=${token}&email=${email}`,
        }),
    });
}
