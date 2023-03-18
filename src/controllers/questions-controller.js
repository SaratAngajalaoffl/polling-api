import { optionModel } from "../models/option-model";
import { questionModel } from "../models/question-model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../utils/response-utils";

const PORT = process.env.PORT || 8000;

export const handleCreateQuestion = async (req, res) => {
    try {
        const { title } = req.body; // Get required parameters from the post request body, JSON data is already parsed

        const questionObj = await questionModel.create({ title }); // create a new record in the questions collection

        return sendSuccessResponse(res, { question: questionObj.toObject() }); // send the new object as response
    } catch (err) {
        return sendErrorResponse(res, err.message); // Send Error Response
    }
};

export const handleCreateOption = async (req, res) => {
    try {
        const { id } = req.params; // get id for the parent question from url params

        const { title } = req.body; // get title for the option from the POST body

        const questionObj = await questionModel.findById(id); // find the parent question Obj

        if (!questionObj) throw "Question not found"; // if question with provided id is  not found throw error

        const optionObj = await optionModel.create({ title }); // create the object on database

        questionObj.options = [...questionObj.options, optionObj._id]; // link the option to parent question

        await questionObj.save(); // commit changes to db

        return sendSuccessResponse(res, {
            question: questionObj.toObject(),
            option: optionObj.toObject(),
        });
    } catch (err) {
        return sendErrorResponse(res, err.message); // Send Error Response
    }
};

export const handleDeleteQuestion = async (req, res) => {
    try {
        const { id } = req.params; // get id for the question from url params

        const questionObj = await questionModel
            .findById(id)
            .populate({ path: "options" }); // find question and populate options

        // check if any options have votes
        const questionsWithVotes = questionObj.options.filter(
            (option) => option.votes > 0
        );

        // throw errors if any option has votes
        if (questionsWithVotes.length > 0)
            return sendErrorResponse(
                res,
                "Question already has options with votes, can't be deleted"
            );

        await questionModel.findByIdAndDelete(id); // delete the question if no option has votes

        return sendSuccessResponse(res, { question: questionObj });
    } catch (err) {
        return sendErrorResponse(res, err.message); // Send Error Response
    }
};

export const handleGetQuestion = async (req, res) => {
    try {
        const { id } = req.params; // get id for the question from url params

        const questionObj = await questionModel
            .findById(id)
            .populate({ path: "options" }); // find question and populate options

        // Add a link to vote for every option
        const options = questionObj.options.map((option) => ({
            ...option.toObject(),
            link_to_vote: `http://${req.hostname}:${PORT}/options/${option.id}/add_vote`,
        }));

        return sendSuccessResponse(res, {
            question: { ...questionObj.toObject(), options },
        });
    } catch (err) {
        return sendErrorResponse(res, err.message); // Send Error Response
    }
};
