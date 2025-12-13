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

    const result = await prisma.$transaction(async (tnx) => {
        const user = await tnx.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashPassword,
                address: body.address,
                profilePhoto: body.profilePhoto
            }
        })
        return await tnx.participant.create(({
            data: {
                userId: user.id,
            }
        }))
    })


    return result

}

const createHost = async (req: Request) => {
    // console.log("Created User Services...", payload.body)
    const body = req.body;
    // console.log("file", req.files)

    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        body.profilePhoto = uploadResult?.secure_url
    }

    const hashPassword = await bcrypt.hash(body.password, Number(envVars.BCRYPT_SALT_ROUND))

    const result = await prisma.$transaction(async (tnx) => {
        const user = await tnx.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashPassword,
                address: body.address,
                profilePhoto: body.profilePhoto,
                role: "HOST"
            }
        })

        return await tnx.host.create({
            data: {
                userId: user?.id
            }
        })
    })

    return result

}


const getUserInfo = async (email: string) => {
    if (!email) {
        throw new Error("Email are required");
    }

    // Step 1: find user
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Step 2: set relational include based on role
    const include: any = {};

    if (user?.role === "USER") include.participant = true;
    if (user?.role === "HOST") include.host = true;

    // Step 3: fetch full relational data
    const fullUser = await prisma.user.findUnique({
        where: { email },
        include,
    });


    const { password, ...rest } = fullUser ?? {};

    return rest;
};



export const userServices = {
    createUser,
    createHost,
    getUserInfo
}