import { type InferRealtimeEvents, Realtime } from "@upstash/realtime";
import z from "zod/v4";
import { redis } from "./redis";

export const schema = {
  "feedback:new": z.object({
    projectId: z.string(),
    feedback: z.object({
      id: z.string(),
      projectId: z.string().nullable(),
      type: z.string(),
      message: z.string(),
      imageUrl: z.string().nullable(),
      userEmail: z.string().nullable(),
      metadata: z.unknown().nullable(),
      status: z.string().nullable(),
      createdAt: z.string().nullable(),
    }),
  }),
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
