"use client";

import { formatDistanceToNow } from "date-fns";
import type { InferSelectModel } from "drizzle-orm";
import { Bug, Lightbulb, MessageCircle } from "lucide-react";
import type { feedbacks } from "@/db/schema";

type Feedback = InferSelectModel<typeof feedbacks>;

const typeIcons = {
  bug: Bug,
  idea: Lightbulb,
  other: MessageCircle,
};

const typeColors = {
  bug: "text-red-500",
  idea: "text-yellow-500",
  other: "text-blue-500",
};

const statusColors = {
  new: "bg-blue-500",
  read: "bg-gray-500",
  resolved: "bg-green-500",
};

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const Icon =
    typeIcons[feedback.type as keyof typeof typeIcons] || MessageCircle;
  const typeColor =
    typeColors[feedback.type as keyof typeof typeColors] || "text-blue-500";
  const statusColor =
    statusColors[feedback.status as keyof typeof statusColors] || "bg-gray-500";

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${typeColor}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
            <span className="text-sm text-muted-foreground capitalize">
              {feedback.status}
            </span>
            {feedback.userEmail && (
              <>
                <span className="text-muted-foreground">-</span>
                <span className="text-sm text-muted-foreground">
                  {feedback.userEmail}
                </span>
              </>
            )}
            <span className="text-sm text-muted-foreground ml-auto">
              {feedback.createdAt &&
                formatDistanceToNow(new Date(feedback.createdAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
          <p className="text-sm">{feedback.message}</p>
          {feedback.imageUrl && (
            // biome-ignore lint/performance/noImgElement: external imagekit url
            <img
              src={feedback.imageUrl}
              alt="Feedback screenshot"
              className="mt-2 rounded-md max-h-48 object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
