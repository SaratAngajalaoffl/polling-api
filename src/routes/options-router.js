import express from "express";
import {
    handleDeleteOption,
    handleVoteForOption,
} from "../controllers/options-controller";

const optionsRouter = express.Router();

optionsRouter.get("/:id/add_vote", handleVoteForOption);
optionsRouter.delete("/:id/delete", handleDeleteOption);

export default optionsRouter;
