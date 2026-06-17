// backend/routes/user.js
import express from "express";

import { scheduleTask } from "../controllers/scheduleTask.controller.js";

const router = express.Router();

router.post("/register", scheduleTask);

export default router;
