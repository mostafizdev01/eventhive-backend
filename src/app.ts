import compression from "compression";
import cors from "cors";
import express from "express";
import router from "./app/routes";
import { paymentController } from "./app/modules/payment/payment.controller";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery


app.post( "/webhook", express.raw({type: "application/json"}),
paymentController.handleStripeWebhookPayment)

app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: ["http://localhost:3000", "https://eventhive-frontend-8eb6.vercel.app"],
    credentials: true,
  })
);

// Default route for testing
app.get("/", (_req, res) => {
  res.send("WellCome To Event Hive API...");
});

app.use("/api", router);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
