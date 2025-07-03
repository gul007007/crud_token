import express from "express";
import deleteController from "../controller/deleteAController.js";
const router = express.Router();

router.delete('/:id', deleteController);
export default router;