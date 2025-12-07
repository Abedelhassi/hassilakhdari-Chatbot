import type { Express } from "express";
import { createServer, type Server } from "http";
import { GoogleGenAI } from "@google/genai";
import { chatRequestSchema } from "@shared/schema";
import { z } from "zod";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "" });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: parsed.error.flatten() 
        });
      }

      const { message, history } = parsed.data;

      if (!process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Gemini API key not configured" 
        });
      }

      const conversationHistory = history?.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })) || [];

      conversationHistory.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: conversationHistory,
      });

      // Extract text from response - handle both property and method access patterns
      let responseText: string;
      if (typeof response.text === 'function') {
        responseText = response.text();
      } else if (response.text) {
        responseText = response.text;
      } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = response.candidates[0].content.parts[0].text;
      } else {
        responseText = "I apologize, but I couldn't generate a response.";
      }

      return res.json({ response: responseText });
    } catch (error) {
      console.error("Gemini API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request format" 
        });
      }

      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMessage.includes("API key")) {
        return res.status(401).json({ 
          error: "Invalid or missing API key" 
        });
      }

      return res.status(500).json({ 
        error: "Failed to get response from AI. Please try again." 
      });
    }
  });

  return httpServer;
}
