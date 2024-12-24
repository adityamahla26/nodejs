import express from "express";

const router = express.Router();

import {
  handleCreateShortId,
  handleGetRequiredId,
  handleAnalytics,
} from "../controllers/url.js";

router.route("/").post(handleCreateShortId);

router.route("/:shortId").get(handleGetRequiredId);

router.route("/analytics/:shortId").get(handleAnalytics);

export default router;
