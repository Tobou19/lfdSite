
import { ProductsModel } from "../models/products.model.js";

export const getAll = (req, res) => res.json(ProductsModel);

export const getOne = (req, res) => {
  const item = ProductsModel.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Introuvable" });
};

export const create = (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  ProductsModel.push(newItem);
  res.json(newItem);
};

export const update = (req, res) => {
  const index = ProductsModel.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Introuvable" });
  ProductsModel[index] = { ...ProductsModel[index], ...req.body };
  res.json(ProductsModel[index]);
};

export const remove = (req, res) => {
  const index = ProductsModel.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Introuvable" });
  ProductsModel.splice(index, 1);
  res.json({ success: true });
};
