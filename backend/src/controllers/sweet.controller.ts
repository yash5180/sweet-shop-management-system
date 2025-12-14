import { Request, Response } from "express";
import Sweet from "../models/Sweet";

/* ADMIN: CREATE */
export const createSweet = async (req: Request, res: Response) => {
  const { name, price, quantity, category } = req.body;

  if (!name || !price || !quantity || !category) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sweet = await Sweet.create({ name, price, quantity, category });
  res.status(201).json(sweet);
};

/* PUBLIC: GET */
export const getSweets = async (_req: Request, res: Response) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

/* ADMIN: UPDATE */
export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json(sweet);
};

/* ADMIN: DELETE */
export const deleteSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json({ message: "Sweet deleted successfully" });
};

/* USER: PURCHASE */
export const purchaseSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.json({ message: "Purchased", sweet });
};

/* ADMIN: RESTOCK */
export const restockSweet = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid restock amount" });
  }

  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += amount;
  await sweet.save();

  res.json({ message: "Restocked", sweet });
};
