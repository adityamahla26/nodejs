import { Url } from "../models/url.js";

import { nanoid } from "nanoid";

export async function handleCreateShortId(req, res) {
  const shortId = nanoid(8);
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ msg: `Please provide the url` });
  }
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

export async function handleGetRequiredId(req, res) {
  const shortId = req.params.shortId;
  const url = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  return res.redirect(url.redirectUrl);
}

export async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const url = await Url.findOne({ shortId });

  return res.send({ totalClicks: url.visitHistory.length, url: url });
}
