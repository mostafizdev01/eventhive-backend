import { prisma } from "../../shared/prisma"


const createReview = async (req: any) => {

    const result = await prisma.review.create({
        data: req
    })

    return result
}

export const ReviewServices = {
    createReview
}