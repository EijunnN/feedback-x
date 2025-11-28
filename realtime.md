// 1️⃣ SETUP
import { InferRealtimeEvents, Realtime } from "@upstash/realtime"
import { redis } from "./redis"
import z from "zod/v4"

// 👇 realtime events we want to emit
export const schema = {
  notification: z.string(),
}

export const realtime = new Realtime({ schema, redis, verbose: true })
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>

// 2️⃣ TYPE-SAFE FACTORY
import { createRealtime } from "@upstash/realtime/client"
import { RealtimeEvents } from "./realtime"

// 👇 100% type-safe hook for our frontend
export const { useRealtime } = createRealtime<RealtimeEvents>()

// 3️⃣ EMIT EVENT
realtime.emit("notification", "Hello world!")

// 4️⃣ GET REAL-TIME UPDATES
useRealtime({
  events: ["notification"],
  onData: ({ data }) => {
    // 👇 automatically typed as `string`
    console.log(data)
  },
})