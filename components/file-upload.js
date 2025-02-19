"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "lib/uploadthing";

export const FileUpload = ({
    onChange,
    endpoint
}) => {

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("onClientUploadComplete res:", res);
                onChange(res?.[0].url, res?.[0].name);
            }}
            onUploadError={(error) => {
                toast.error(`${error?.message}`);
            }}
        />
    );
}