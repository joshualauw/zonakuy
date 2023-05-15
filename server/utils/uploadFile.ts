import { NodeIncomingMessage } from "h3";
import { v2 } from "cloudinary";
import formidable from "formidable";

const config = useRuntimeConfig();

v2.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

export async function fileUpload(filePath: string, fileId: string) {
    return await v2.uploader.upload(filePath, {
        public_id: fileId,
        allowed_formats: ["png", "jpg", "gif", "svg"],
    });
}

export async function fileDelete(filePath: string) {
    return await v2.uploader.destroy(filePath);
}

export async function readFormData(req: NodeIncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ ...fields, ...files });
        });
    });
}
