import { GoogleGenerativeAI, InputContent } from "@google/generative-ai";

export const startChat = (history: InputContent[]) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return model.startChat({ history });
};

export const generateTitle = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return async (message: string) => {
    const prompt = `generate a title for the following message: ${message}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  };
};
