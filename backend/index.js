import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initGoogleGenerativeAI } from "./services/googleAi.js";
import geminiRouter from "./routes/gemini.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

initGoogleGenerativeAI(process.env.API_KEY);

app.use("/gemini", geminiRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening");
});

export default app;
