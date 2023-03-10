// Libs
import { Router } from "express";

import IpController from "@controllers/ipController";
import LoggerMiddleware from "@middlewares/loggerMiddleware";

// Data
const router = Router();

// Paths
router.use(LoggerMiddleware.setLogger);

router.get("/ip/", IpController.get.bind(IpController));
router.get("/ip/all", IpController.getAll.bind(IpController));
router.delete("/ip/:ip", IpController.del.bind(IpController));

// Code
export default router;
