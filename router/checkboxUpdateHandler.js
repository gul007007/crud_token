import updateCheckbox from "../controller/updateCheckbox Controller.js";
import express from "express";
const router = express.Router();

router.patch('/:collectionId', updateCheckbox);

export default router;
