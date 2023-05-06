import sgMail from "@sendgrid/mail";

const config = useRuntimeConfig();
sgMail.setApiKey(config.SENDGRID_API_KEY);

export default sgMail;
