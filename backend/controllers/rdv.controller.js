
import { RdvModel } from "../models/rdv.model.js";

export const getAll = (req, res) => res.json(RdvModel);

export const getOne = (req, res) => {
  const item = RdvModel.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Introuvable" });
};

export const create = (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  RdvModel.push(newItem);
  res.json(newItem);
};

export const update = (req, res) => {
  const index = RdvModel.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Introuvable" });
  RdvModel[index] = { ...RdvModel[index], ...req.body };
  res.json(RdvModel[index]);
};

export const remove = (req, res) => {
  const index = RdvModel.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Introuvable" });
  RdvModel.splice(index, 1);
  res.json({ success: true });
};
