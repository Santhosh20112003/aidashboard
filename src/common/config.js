import { GoogleGenerativeAI } from "@google/generative-ai";
import Showdown from "showdown";
// import Unsplash, { toJson } from "unsplash/unsplash-js";

export const converter = new Showdown.Converter();
export const genAI = new GoogleGenerativeAI(
  "AIzaSyBr2cK3DGn5W2EV6IN36V21RFoUTlh0dj4"
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

export const webGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      type: {
        type: "string",
      },
      html: {
        type: "string",
      },
      css: {
        type: "string",
      },
      js: {
        type: "string",
      },
      frameworks: {
        type: "string",
      },
      code: {
        type: "string",
      },
      heading: {
        type: "string",
      },
      explanation: {
        type: "string",
      },
    },
    required: ["type", "heading", "explanation"],
  },
};

// export const unsplash = new Unsplash({
//   accessKey: "f67JNmI7cNKsusb5x59QG8L3ASZMJD5mDdd1zhSYkp8",
// });
