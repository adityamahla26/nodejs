import express from "express";

const router = express.Router();

import {
  handleCreateShortId,
  handleGetRequiredId,
  handleAnalytics,
  handleGetHtmlPage,
} from "../controllers/url.js";

router.route("/create").post(handleCreateShortId);

router.route("/:shortId").get(handleGetRequiredId);

router.route("/analytics/:shortId").get(handleAnalytics);

router.route("/test/htmlpage").get(handleGetHtmlPage);

export default router;
