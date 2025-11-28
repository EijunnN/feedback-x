// "use client";

// import { formatDistanceToNow } from "date-fns";
// import type { InferSelectModel } from "drizzle-orm";
// import { Bug, Lightbulb, MessageCircle } from "lucide-react";
// import type { feedbacks } from "@/db/schema";

// type Feedback = InferSelectModel<typeof feedbacks>;

// const typeIcons = {
//   bug: Bug,
//   idea: Lightbulb,
//   other: MessageCircle,
// };

// const typeColors = {
//   bug: "text-red-500",
//   idea: "text-yellow-500",
//   other: "text-blue-500",
// };

// const statusColors = {
//   new: "bg-blue-500",
//   read: "bg-gray-500",
//   resolved: "bg-green-500",
// };

// export function FeedbackCard({ feedback }: { feedback: Feedback }) {
//   const Icon =
//     typeIcons[feedback.type as keyof typeof typeIcons] || MessageCircle;
//   const typeColor =
//     typeColors[feedback.type as keyof typeof typeColors] || "text-blue-500";
//   const statusColor =
//     statusColors[feedback.status as keyof typeof statusColors] || "bg-gray-500";

//   return (
//     <div className="rounded-lg border p-4">
//       <div className="flex items-start gap-3">
//         <Icon className={`h-5 w-5 mt-0.5 ${typeColor}`} />
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <span className={`h-2 w-2 rounded-full ${statusColor}`} />
//             <span className="text-sm text-muted-foreground capitalize">
//               {feedback.status}
//             </span>
//             {feedback.userEmail && (
//               <>
//                 <span className="text-muted-foreground">-</span>
//                 <span className="text-sm text-muted-foreground">
//                   {feedback.userEmail}
//                 </span>
//               </>
//             )}
//             <span className="text-sm text-muted-foreground ml-auto">
//               {feedback.createdAt &&
//                 formatDistanceToNow(new Date(feedback.createdAt), {
//                   addSuffix: true,
//                 })}
//             </span>
//           </div>
//           <p className="text-sm">{feedback.message}</p>
//           {feedback.imageUrl && (
//             // biome-ignore lint/performance/noImgElement: external imagekit url
//             <img
//               src={feedback.imageUrl}
//               alt="Feedback screenshot"
//               className="mt-2 rounded-md max-h-48 object-cover"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { formatDistanceToNow } from "date-fns";
import type { InferSelectModel } from "drizzle-orm";
import { Bug, Lightbulb, MessageCircle, Terminal } from "lucide-react";
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

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const Icon = typeIcons[feedback.type as keyof typeof typeIcons] || MessageCircle;
  const typeColor = typeColors[feedback.type as keyof typeof typeColors] || "text-blue-500";

  return (
    <div className="group rounded-sm border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition-all">
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 p-2 rounded-sm bg-black border border-zinc-800 ${typeColor}`}>
           <Icon className="h-4 w-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-zinc-900 text-zinc-400 border border-zinc-800">
              {feedback.status}
            </span>
            <div className="h-px w-3 bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-500">
                {feedback.userEmail || "Anonymous"}
            </span>
            <span className="text-xs font-mono text-zinc-600 ml-auto">
              {feedback.createdAt &&
                formatDistanceToNow(new Date(feedback.createdAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
          
          <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-3">{feedback.message}</p>
          
          {feedback.imageUrl && (
            <div className="mt-3 border border-zinc-800 rounded-sm overflow-hidden bg-black p-1 inline-block">
                {/* biome-ignore lint/performance/noImgElement: external imagekit url */}
                <img
                src={feedback.imageUrl}
                alt="Evidence"
                className="rounded-sm max-h-40 object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
            </div>
          )}
          
          <div className="mt-4 flex gap-2">
             {/* Metadata tags could go here */}
             <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-mono">
                <Terminal className="h-3 w-3" />
                <span>metadata.json</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}