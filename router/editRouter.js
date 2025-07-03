

import express from "express";
import editTaskController from "../controller/editController.js";
const router = express.Router();

router.patch('/:currentId', editTaskController);

export default router;