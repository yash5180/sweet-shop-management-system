import express from "express";
import {
  createSweet,
  getSweets,
  updateSweet,
  purchaseSweet,
  restockSweet,
  deleteSweet,
} from "../controllers/sweet.controller";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getSweets);

router.post(
  "/:id/purchase",
  authMiddleware,
  requireRole("USER"),
  purchaseSweet
);

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  createSweet
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateSweet
);

router.put(
  "/:id/restock",
  authMiddleware,
  requireRole("ADMIN"),
  restockSweet
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteSweet
);

export default router;
