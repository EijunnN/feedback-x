// "use client";

// import type { InferSelectModel } from "drizzle-orm";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import type { feedbacks } from "@/db/schema";
// import { useRealtime } from "@/lib/realtime-client";
// import { FeedbackCard } from "./feedback-card";
// import { Button } from "./ui/button";

// type Feedback = InferSelectModel<typeof feedbacks>;

// interface FeedbackListProps {
//   projectId: string;
//   initialFeedbacks: Feedback[];
// }

// export function FeedbackList({
//   projectId,
//   initialFeedbacks,
// }: FeedbackListProps) {
//   const [feedbackList, setFeedbackList] =
//     useState<Feedback[]>(initialFeedbacks);

//   useRealtime({
//     events: ["feedback:new"],
//     onData: ({ event, data }) => {
//       if (event === "feedback:new" && data.projectId === projectId) {
//         const newFeedback: Feedback = {
//           ...data.feedback,
//           createdAt: data.feedback.createdAt
//             ? new Date(data.feedback.createdAt)
//             : null,
//         };
//         setFeedbackList((prev) => [newFeedback, ...prev]);
//       }
//     },
//   });

//   if (feedbackList.length === 0) {
//     return (
//       <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
//         <MessageSquare className="h-12 w-12 text-muted-foreground" />
//         <div>
//           <h2 className="text-xl font-semibold">No feedback yet</h2>
//           <p className="text-muted-foreground">
//             Install the widget to start collecting feedback
//           </p>
//         </div>
//         <Button variant="outline" asChild>
//           <Link href={`/projects/${projectId}/settings`}>
//             View Installation
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-4">
//       {feedbackList.map((feedback) => (
//         <FeedbackCard key={feedback.id} feedback={feedback} />
//       ))}
//     </div>
//   );
// }

"use client";

import type { InferSelectModel } from "drizzle-orm";
import { Inbox } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { feedbacks } from "@/db/schema";
import { useRealtime } from "@/lib/realtime-client";
import { FeedbackCard } from "./feedback-card";
import { Button } from "./ui/button";

type Feedback = InferSelectModel<typeof feedbacks>;

interface FeedbackListProps {
  projectId: string;
  initialFeedbacks: Feedback[];
}

export function FeedbackList({
  projectId,
  initialFeedbacks,
}: FeedbackListProps) {
  const [feedbackList, setFeedbackList] =
    useState<Feedback[]>(initialFeedbacks);

  useRealtime({
    events: ["feedback:new"],
    onData: ({ event, data }) => {
      if (event === "feedback:new" && data.projectId === projectId) {
        const newFeedback: Feedback = {
          ...data.feedback,
          createdAt: data.feedback.createdAt
            ? new Date(data.feedback.createdAt)
            : null,
        };
        setFeedbackList((prev) => [newFeedback, ...prev]);
      }
    },
  });

  if (feedbackList.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-12 text-center border border-dashed border-zinc-800 rounded-sm bg-zinc-900/20">
        <div className="p-4 bg-zinc-900 rounded-full">
          <Inbox className="h-8 w-8 text-zinc-600" />
        </div>
        <div className="max-w-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Awaiting Data
          </h2>
          <p className="text-sm text-zinc-500 font-mono">
            No feedback events detected. Ensure the widget is active on your
            target domain.
          </p>
        </div>
        <Button
          variant="outline"
          asChild
          className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 font-mono text-xs uppercase rounded-sm"
        >
          <Link href={`/projects/${projectId}/settings`}>
            Verify Installation
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {feedbackList.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
}
