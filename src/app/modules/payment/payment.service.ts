import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus, TicketStatus } from "../../../../generated/prisma/enums";

const handleStripeWebhookPayment = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {

      const session = event.data.object;

      const joinEventId = session?.metadata?.joinEventId
      const paymentId = session?.metadata?.paymentId


      if (!joinEventId || !paymentId) {
        console.error("❌ Missing metadata");
        return;
      }

      // --- PAYMENT SUCCESS ---

      await prisma.$transaction(async (tnx) => {

        await tnx.payment.update({
          where: { id: paymentId },
          data: {
                amount: session?.amount_total as number,
                eventJoinId: joinEventId,
                transactionId: session?.payment_intent as string,
                status: PaymentStatus?.PAID,
                paymentGetWay: session?.payment_method_types[0]
          }
        })

        await tnx.eventJoin.update({
          where: {id: joinEventId},
          data: {
            paymentStatus: PaymentStatus.PAID,
            status: TicketStatus.CONFIRMED
          }
        })
      })



      // await prisma.eventJoin.update({
      //   where: { id: event?.id },
      //   data: { paymentStatus: PaymentStatus.PAID }
      // })

      // await prisma.payment.update({
      //   where: { id: paymentId },
      //   data: {
      //     status:
      //       session.payment_status === "paid"
      //         ? PaymentStatus.PAID
      //         : PaymentStatus.FAILED,
      //     transactionId: session.payment_intent,
      //   },
      // });

      // await prisma.eventJoin.update({
      //   where: { id: participantId },
      //   data: {
      //     paymentStatus:
      //       session.payment_status === "paid"
      //         ? PaymentStatus.PAID
      //         : PaymentStatus.FAILED,
      //   },
      // });

      // Update host earnings (optional)
      // const payment = await prisma.payment.findUniqueOrThrow({
      //   where: { id: paymentId },
      // });

      console.log("✔ Payment Completed & Participant Updated");
      break;
    }


    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

};

export const paymentService = {
  handleStripeWebhookPayment,
};