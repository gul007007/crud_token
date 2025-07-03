import fetchTask from "../controller/fetchTaskController.js";
import express from "express";
const router = express.Router();

router.get('/', fetchTask);

export default router;