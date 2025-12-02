
import { envVars } from "../../../config/env";
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs"


const createUser = async (payload: any) => {
    // console.log("Created User Services...", payload.body)
    const body = payload.body;
    const hashPassword = await bcrypt.hash(body.password, Number(envVars.BCRYPT_SALT_ROUND))

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: hashPassword
        }
    })
    return user;

}


export const userServices = {
    createUser
}