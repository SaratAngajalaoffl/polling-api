import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

export const optionModel = mongoose.model("Option", optionSchema);
