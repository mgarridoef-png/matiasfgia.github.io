
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("La variable de entorno API_KEY no está configurada.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    if (
        response.candidates &&
        response.candidates[0] &&
        response.candidates[0].content &&
        response.candidates[0].content.parts
    ) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64ImageBytes: string = part.inlineData.data;
              const mimeType = part.inlineData.mimeType;
              return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }
    }
    
    throw new Error("No se pudo extraer la imagen de la respuesta de la API.");

  } catch (error) {
    console.error("Error al generar imagen con Gemini:", error);
    throw new Error("No se pudo generar la imagen. Por favor, revisa tu prompt y la configuración de la API.");
  }
};
