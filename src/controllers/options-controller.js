import { optionModel } from "../models/option-model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../utils/response-utils";

export const handleVoteForOption = async (req, res) => {
    try {
        const { id } = req.params; // get id from url params

        const optionObj = await optionModel.findById(id); // find the object for corresponding id in the collection

        if (!optionObj) throw Error("Option Object not found"); // if object with provided id is not found throw error

        optionObj.votes += 1; // increment the votes by 1

        await optionObj.save(); // commit changes to the database

        sendSuccessResponse(res, { option: optionObj.toObject() });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const handleDeleteOption = async (req, res) => {
    try {
        const { id } = req.params; // get id from url params

        const optionObj = await optionModel.findById(id); // find the object for corresponding id in the collection

        if (optionObj.votes > 0) throw "Option has votes and can't be deleted"; // if object with provided id is not found throw error

        await optionModel.findByIdAndDelete(id); // delete the option

        sendSuccessResponse(res, { option: optionObj.toObject() }); // return the deleted option
    } catch (err) {
        sendErrorResponse(res, err);
    }
};
