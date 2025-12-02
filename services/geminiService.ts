import { GoogleGenAI } from "@google/genai";
import { ApologyTone } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateApologyMessage = async (
  recipient: string,
  reason: string,
  tone: ApologyTone
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Buatkan surat permintaan maaf yang personal dalam Bahasa Indonesia (kecuali diminta lain).
      
      Nama Penerima: ${recipient}
      Alasan meminta maaf: ${reason}
      Nada Bicara: ${tone}
      
      Instruksi:
      - Gunakan bahasa Indonesia yang natural, luwes, dan menyentuh hati.
      - Jika nadanya 'Lucu & Gemas', masukkan sedikit candaan ringan (gombalan) tapi tetap manis.
      - Jika nadanya 'Puitis', gunakan kata-kata yang indah.
      - Pastikan panjangnya kurang dari 150 kata.
      - Jangan sertakan placeholder (misal: [Nama Kamu]), langsung tulis seolah-olah dari pengirim.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Aku kehabisan kata-kata, tapi aku benar-benar minta maaf.";
  } catch (error) {
    console.error("Error generating apology:", error);
    return "Maaf, aku sedang kesulitan merangkai kata-kata, tapi ketahuilah aku benar-benar menyesal.";
  }
};