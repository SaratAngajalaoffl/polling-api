import express from "express";

import {
    handleCreateOption,
    handleCreateQuestion,
    handleDeleteQuestion,
    handleGetQuestion,
} from "../controllers/questions-controller.js";

const questionsRouter = express.Router();

questionsRouter.post("/create", handleCreateQuestion);
questionsRouter.post("/:id/options/create", handleCreateOption);
questionsRouter.delete("/:id/delete", handleDeleteQuestion);
questionsRouter.get("/:id", handleGetQuestion);

export default questionsRouter;
