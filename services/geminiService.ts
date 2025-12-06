import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Ensure API Key is available
const apiKey = process.env.API_KEY || ''; 

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

// System instruction for the medical assistant
const SYSTEM_INSTRUCTION = `
You are MedigentX, an advanced AI medical assistant. 
Your role is to assist healthcare professionals by:
1. Summarizing patient notes into SOAP format.
2. Providing differential diagnoses based on symptoms.
3. Checking for drug interactions.
4. Answering medical queries based on standard guidelines.

Tone: Professional, clinical, and concise.
Disclaimer: Always append a brief disclaimer that you are an AI and this is not a final diagnosis.
`;

export const createMedicalChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2, // Low temperature for factual consistency
    },
  });
};

export const streamMedicalResponse = async (
  chat: Chat, 
  message: string, 
  onChunk: (text: string) => void
): Promise<string> => {
  let fullText = "";
  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      const text = c.text || "";
      fullText += text;
      onChunk(text);
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n[System Error: Unable to communicate with AI service.]");
  }
  return fullText;
};
