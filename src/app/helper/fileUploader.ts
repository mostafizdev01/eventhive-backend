import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { envVars } from '../../config/env';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination?: string) => void) {
        cb(null, path.join(process.cwd(), "/uploads"))
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination?: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: Express.Multer.File) => {
    // Configuration
    cloudinary.config({
        cloud_name: envVars.cloudinary.CLOUDINARY_CLOUD_NAME,
        api_key: envVars.cloudinary.CLOUDINARY_API_KEY,
        api_secret: envVars.cloudinary.CLOUDINARY_API_SECRET
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });
    return uploadResult;

}

export const fileUploader = {
    upload,
    uploadToCloudinary
}
