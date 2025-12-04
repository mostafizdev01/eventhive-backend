import { Request } from "express";
import { envVars } from "../../../config/env";
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs"
import { fileUploader } from "../../helper/fileUploader";


const createUser = async (req: Request) => {
    // console.log("Created User Services...", payload.body)
    const body = req.body;
    // console.log("file", req.files)

    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        body.profilePhoto = uploadResult?.secure_url
    }

    const hashPassword = await bcrypt.hash(body.password, Number(envVars.BCRYPT_SALT_ROUND))

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashPassword,
            address: body.address,
            profilePhoto: body.profilePhoto
        }
    })
    return user;

}


export const userServices = {
    createUser
}