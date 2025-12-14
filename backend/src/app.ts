import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";

const app = express();

/**
 * ✅ CORS FIX (THIS IS THE KEY)
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/ping", (_req, res) => {
  res.json({ message: "pong" });
});

export default app;
