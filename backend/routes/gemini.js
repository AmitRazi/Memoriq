import express from "express";
import { getGeminiModel } from "../services/googleAi.js";
import {
  parseResponse,
  promptQuestionsGenerator,
  promptSingleQuestionGenerator,
} from "../utils.js";

const geminiRouter = express.Router();

geminiRouter.post("/", async (req, res, next) => {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(
      promptQuestionsGenerator(req.body.query)
    );
    const response = await result.response;
    const text = await response.text();
    const parsedResponse = parseResponse(text);
    res.send(parsedResponse);
  } catch (error) {
    next(error);
  }
});

geminiRouter.post("/single", async (req, res, next) => {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(
      promptSingleQuestionGenerator(req.body.query, req.body.question)
    );
    const response = await result.response;
    const text = await response.text();
    const parsedResponse = parseResponse(text);
    console.log(parsedResponse);

    res.send(parsedResponse);
  } catch (error) {
    next(error);
  }
});

export default geminiRouter;
