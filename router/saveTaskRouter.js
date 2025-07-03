import express from "express";
const router = express.Router();
import saveTask from '../controller/saveTaskController.js';

router.post('/', saveTask);

export default router;