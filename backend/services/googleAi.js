import { GoogleGenerativeAI } from "@google/generative-ai";

let gemini;

export const initGoogleGenerativeAI = (apiKey) => {
  gemini = new GoogleGenerativeAI(apiKey);
};

export const getGeminiModel = () => {
  if (!gemini) {
    throw new Error("Error initializing model");
  }
  return gemini.getGenerativeModel({ model: "gemini-pro" });
};
