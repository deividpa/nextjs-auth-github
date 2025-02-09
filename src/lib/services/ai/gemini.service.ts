import { RoadmapSchema, type RoadmapResponse } from "./schemas/roadmap.schema";
import { initGeminiClient, geminiConfig } from "./config/gemini";

export class GeminiService {
  private client = initGeminiClient();
  
  async generateRoadmap(prompt: string): Promise<RoadmapResponse> {
    try {
      const model = this.client.getGenerativeModel({
        model: geminiConfig.modelName,
        generationConfig: geminiConfig.generationConfig,
        safetySettings: geminiConfig.safetySettings
      });
      
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(this.buildPrompt(prompt));
      return this.parseResponse(result.response.text());
      
    } catch (error) {
      throw new Error(`Gemini service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildPrompt(input: string): string {
    return `Genera un roadmap detallado para: '${input}'. 
      La respuesta DEBE ser en formato JSON válido SIN MARKDOWN con esta estructura:
      {
        "description": "Breve descripción general (máx. 50 palabras)",
        "items": [
          "Paso 1 concreto y accionable",
          "Paso 2 específico y medible",
          ... (mínimo 10 pasos)
        ]
      }

      Requisitos estrictos:
      1. items debe contener EXACTAMENTE 10 pasos
      2. Cada paso debe ser una tarea específica y ejecutable
      3. Usar verbos de acción al inicio (Ej: 'Investigar...', 'Implementar...')
      4. Orden lógico progresivo (de básico a avanzado)
      5. Descripción debe resumir el objetivo principal
      6. ¡Nunca usar markdown o texto adicional!

      Ejemplo de estructura válida:
      {
        "description": "Roadmap para desarrollar una aplicación web full-stack",
        "items": [
          "Definir requisitos funcionales y técnicos",
          "Diseñar arquitectura de base de datos",
          "Configurar entorno de desarrollo frontend",
          "Implementar sistema de autenticación",
          "Desarrollar componente principal de UI",
          ... (10 elementos)
        ]
      }`;
  }

  private parseResponse(text: string): RoadmapResponse {
    const cleanedJson = text.replace(/```json|```/g, '');
    const parsed = JSON.parse(cleanedJson);
    return RoadmapSchema.parse(parsed); // Zod Validation
  }
}