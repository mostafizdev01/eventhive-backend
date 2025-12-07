import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { stripe } from "../../helper/stripe";
import sendResponse from "../../shared/sendResponse";
import { paymentService } from "./payment.service";

const handleStripeWebhookPayment = catchAsync(
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret =
      "whsec_92829b8dd8ab2337ca49103290bafab4b421aea0037bf65bc3f2e8c6dd991b4f";

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await paymentService.handleStripeWebhookPayment(event);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Webhook req send successfully",
      data: result,
    });
  }
);

export const paymentController = {
  handleStripeWebhookPayment,
};