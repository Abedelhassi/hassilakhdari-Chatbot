import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export type Message = z.infer<typeof messageSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  history: z.array(messageSchema).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatResponseSchema = z.object({
  response: z.string(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;
