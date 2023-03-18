import mongoose from "mongoose";
import { optionModel } from "./option-model";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    options: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: optionModel,
        },
    ],
});

export const questionModel = mongoose.model("Question", questionSchema);
