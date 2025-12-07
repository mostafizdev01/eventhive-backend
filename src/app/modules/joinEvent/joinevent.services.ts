import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma"
import { envVars } from "../../../config/env";
import { stripe } from "../../helper/stripe";



const createJoinEvent = async (payload: any) => {

    const event = await prisma.event.findUnique({
        where: { id: payload?.eventId }
    })

    const userInfo = await prisma.participant.findUnique({
        where: { id: payload?.userId },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    address: true,
                    profilePhoto: true,
                    status: true,
                    role: true,
                    gender: true,
                }
            }
        }
    })


    const result = await prisma.$transaction(async (tnx) => {

        const joinEventData = await tnx.eventJoin.create({
            data: payload
        })

        const payment =  await tnx.payment.create({
            data: {
                amount: event?.ticketPrice as number,
                eventJoinId: joinEventData?.id
            }
        })

        return {
            joinEventId: joinEventData?.id,
            paymentId: payment?.id
        }
    })


    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: userInfo?.user.email,

        line_items: [
            {
                price_data: {
                    currency: "bdt",
                    product_data: {
                        name: event?.title as string,
                    },
                    unit_amount: Number(event?.ticketPrice) * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            joinEventId: result.joinEventId, 
            paymentId: result.paymentId

        },
        success_url: `${envVars.CLIENT_URL}`,
        cancel_url: `${envVars.CLIENT_URL}`,
    })


    return {
        metaData: session.metadata,
        checkoutUrl: session.url
    }
}

export const JoinEventServices = {
    createJoinEvent
}