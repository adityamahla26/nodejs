import express from "express";
const router = express.Router();

import { Url } from "../models/url.js";

router.get("/", async (req, res) => {
  const allUrl = await Url.find({});
  res.render("home", { urls: allUrl });
});

export default router;
