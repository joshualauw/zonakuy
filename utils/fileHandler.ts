export function getFileNameFromUrl(url: string): string {
    const slashIndex = url.lastIndexOf("/");
    const dotIndex = url.lastIndexOf(".");
    return url.substring(slashIndex + 1, dotIndex);
}

export async function getBase64FromUrl(url: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return base64;
}

export async function getFileFromUrl(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName);
}
