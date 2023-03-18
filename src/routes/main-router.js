import express from "express";
import optionsRouter from "./options-router";
import questionsRouter from "./questions-router";

const router = express.Router();

router.use("/questions", questionsRouter);
router.use("/options", optionsRouter);

export default router;
