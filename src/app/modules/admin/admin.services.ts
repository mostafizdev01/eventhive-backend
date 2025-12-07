import { prisma } from "../../shared/prisma"

const getAllUser = async () => {

    const result = await prisma.user.findMany()

    return result
}

export const AdminServices = {
    getAllUser
}