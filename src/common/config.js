import { GoogleGenerativeAI } from "@google/generative-ai";
import Showdown from "showdown";

export const converter = new Showdown.Converter();
export const genAI = new GoogleGenerativeAI(
  "AIzaSyCVYbRztmqUamxjghxQYoqXTmwGnRD4Z7Q"
);

export const generationConfig = {
  temperature: 1.4,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      language: { type: "string" },
      code: { type: "string" },
      explanation: { type: "string" },
      heading: { type: "string" },
    },
    required: ["language", "code", "explanation", "heading"],
  },
};
