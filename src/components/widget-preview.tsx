// "use client";

// import type { ReactNode } from "react";
// import { useRef, useState } from "react";

// interface WidgetPreviewProps {
//   color: string;
//   position: string;
//   text: string;
//   showBranding: boolean;
//   enableBugs: boolean;
//   enableIdeas: boolean;
//   enableOther: boolean;
// }

// export function WidgetPreview({
//   color,
//   position,
//   text,
//   showBranding,
//   enableBugs,
//   enableIdeas,
//   enableOther,
// }: WidgetPreviewProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       setSelectedImage(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setSelectedImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const positionStyles: Record<string, React.CSSProperties> = {
//     "bottom-right": { bottom: 16, right: 16 },
//     "bottom-left": { bottom: 16, left: 16 },
//     "top-right": { top: 16, right: 16 },
//     "top-left": { top: 16, left: 16 },
//   };

//   const modalPositionStyles: Record<string, React.CSSProperties> = {
//     "bottom-right": { bottom: 72, right: 16 },
//     "bottom-left": { bottom: 72, left: 16 },
//     "top-right": { top: 72, right: 16 },
//     "top-left": { top: 72, left: 16 },
//   };

//   const enabledTypes = [
//     enableBugs && { key: "bug", label: "Bug", icon: BugIcon },
//     enableIdeas && { key: "idea", label: "Idea", icon: IdeaIcon },
//     enableOther && { key: "other", label: "Other", icon: OtherIcon },
//   ].filter(Boolean) as { key: string; label: string; icon: () => ReactNode }[];

//   if (!selectedType && enabledTypes.length > 0) {
//     setSelectedType(enabledTypes[0].key);
//   }

//   return (
//     <div className="relative bg-zinc-900 rounded-lg h-80 overflow-hidden border">
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

//       <div className="absolute top-3 left-3 flex items-center gap-1.5">
//         <div className="w-3 h-3 rounded-full bg-red-500" />
//         <div className="w-3 h-3 rounded-full bg-yellow-500" />
//         <div className="w-3 h-3 rounded-full bg-green-500" />
//       </div>
//       <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-zinc-800 rounded px-4 py-1 text-xs text-zinc-400">
//         yourwebsite.com
//       </div>

//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
//         style={{
//           ...positionStyles[position],
//           backgroundColor: color,
//           width: 48,
//           height: 48,
//         }}
//       >
//         {text === "Feedback" || !text ? (
//           <svg
//             className="w-5 h-5 fill-white"
//             viewBox="0 0 24 24"
//             aria-hidden="true"
//           >
//             <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
//           </svg>
//         ) : (
//           <span className="text-white text-xs font-medium px-1 truncate max-w-[40px]">
//             {text}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div
//           className="absolute w-64 bg-zinc-950 rounded-lg shadow-2xl border border-zinc-800 overflow-hidden"
//           style={modalPositionStyles[position]}
//         >
//           <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
//             <span className="text-sm font-medium text-white">
//               Send Feedback
//             </span>
//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="text-zinc-500 hover:text-white"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="p-3 space-y-3">
//             <div className="flex gap-1.5">
//               {enabledTypes.map((type) => (
//                 <button
//                   key={type.key}
//                   type="button"
//                   onClick={() => setSelectedType(type.key)}
//                   className={`flex-1 p-2 rounded text-xs flex flex-col items-center gap-1 border transition-colors ${
//                     selectedType === type.key
//                       ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
//                       : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   <type.icon />
//                   {type.label}
//                 </button>
//               ))}
//             </div>
//             <div className="bg-zinc-900 rounded border border-zinc-800 p-2 h-16">
//               <span className="text-xs text-zinc-600">
//                 Tell us what&apos;s on your mind...
//               </span>
//             </div>
//             {selectedImage && (
//               <div className="relative">
//                 {/* biome-ignore lint/performance/noImgElement: base64 preview */}
//                 <img
//                   src={selectedImage}
//                   alt="Selected"
//                   className="w-full h-16 object-cover rounded border border-zinc-800"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
//                 >
//                   <svg
//                     className="w-2.5 h-2.5 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             )}
//             <div className="flex gap-2">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 className="hidden"
//               />
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="p-2 rounded border border-zinc-800 text-zinc-500 hover:text-zinc-300"
//                 title="Upload image"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <rect x="3" y="3" width="18" height="18" rx="2" />
//                   <circle cx="8.5" cy="8.5" r="1.5" />
//                   <path d="M21 15l-5-5L5 21" />
//                 </svg>
//               </button>
//               <button
//                 type="button"
//                 className="flex-1 text-xs text-white rounded py-2"
//                 style={{ backgroundColor: color }}
//               >
//                 Send
//               </button>
//             </div>
//             {showBranding && (
//               <div className="text-center">
//                 <span className="text-[10px] text-zinc-600">
//                   Powered by Annya
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function BugIcon() {
//   return (
//     <svg
//       className="w-4 h-4"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M19 8h-1.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H5v2h1.09c-.05.33-.09.66-.09 1v1H5v2h1v1c0 .34.04.67.09 1H5v2h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19v-2h-1.09c.05-.33.09-.66.09-1v-1h1v-2h-1v-1c0-.34-.04-.67-.09-1H19V8zm-6 8h-2v-2h2v2zm0-4h-2v-4h2v4z" />
//     </svg>
//   );
// }

// function IdeaIcon() {
//   return (
//     <svg
//       className="w-4 h-4"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
//     </svg>
//   );
// }

// function OtherIcon() {
//   return (
//     <svg
//       className="w-4 h-4"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
//     </svg>
//   );
// }

"use client";

import type { LucideIcon } from "lucide-react";
import { Bug, Lightbulb, MessageCircle } from "lucide-react";
import { useState } from "react";

interface WidgetPreviewProps {
  color: string;
  position: string;
  text: string;
  showBranding: boolean;
  enableBugs: boolean;
  enableIdeas: boolean;
  enableOther: boolean;
  bugLabel?: string;
  bugEmoji?: string;
  ideaLabel?: string;
  ideaEmoji?: string;
  otherLabel?: string;
  otherEmoji?: string;
  feedbackPlaceholder?: string;
  brandingText?: string;
  brandingLink?: string;
}

export function WidgetPreview({
  color,
  position,
  text,
  showBranding,
  enableBugs,
  enableIdeas,
  enableOther,
  bugLabel = "Bug",
  bugEmoji,
  ideaLabel = "Idea",
  ideaEmoji,
  otherLabel = "Other",
  otherEmoji,
  feedbackPlaceholder = "Describe your issue or idea...",
  brandingText = "Powered by Annya",
  brandingLink = "https://annya.io",
}: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(true); // Default open for preview
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const positionStyles: Record<string, React.CSSProperties> = {
    "bottom-right": { bottom: 20, right: 20 },
    "bottom-left": { bottom: 20, left: 20 },
    "top-right": { top: 20, right: 20 },
    "top-left": { top: 20, left: 20 },
  };

  const modalPositionStyles: Record<string, React.CSSProperties> = {
    "bottom-right": { bottom: 80, right: 20 },
    "bottom-left": { bottom: 80, left: 20 },
    "top-right": { top: 80, right: 20 },
    "top-left": { top: 80, left: 20 },
  };

  const enabledTypes = [
    enableBugs && { key: "bug", label: bugLabel, emoji: bugEmoji, icon: Bug },
    enableIdeas && {
      key: "idea",
      label: ideaLabel,
      emoji: ideaEmoji,
      icon: Lightbulb,
    },
    enableOther && {
      key: "other",
      label: otherLabel,
      emoji: otherEmoji,
      icon: MessageCircle,
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    emoji?: string;
    icon: LucideIcon;
  }[];

  if (!selectedType && enabledTypes.length > 0) {
    setSelectedType(enabledTypes[0].key);
  }

  return (
    <div className="relative bg-zinc-950 rounded-sm h-[500px] overflow-hidden border border-zinc-800 shadow-2xl">
      {/* Fake Browser UI */}
      <div className="bg-black border-b border-zinc-800 h-8 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        </div>
        <div className="bg-zinc-900 h-5 w-40 rounded-sm mx-auto" />
      </div>

      <div className="absolute inset-0 top-8 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 z-10"
        style={{
          ...positionStyles[position],
          backgroundColor: color,
          width: 48,
          height: 48,
        }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="absolute w-72 bg-[#18181b] rounded-xl shadow-2xl border border-zinc-800 overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2"
          style={modalPositionStyles[position]}
        >
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <span className="text-sm font-semibold text-white">
              Send Feedback
            </span>
            <button className="text-zinc-500 hover:text-white">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg">
              {enabledTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSelectedType(type.key)}
                  className={`flex-1 py-2 rounded-md text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    selectedType === type.key
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {type.emoji ? (
                    <span className="text-base">{type.emoji}</span>
                  ) : (
                    <type.icon className="w-4 h-4" />
                  )}
                  {type.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <textarea
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 resize-none h-24"
                placeholder={feedbackPlaceholder}
              />
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Screenshot
              </button>
              <button
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Send Feedback
              </button>
            </div>
          </div>

          {showBranding && (
            <div className="bg-zinc-900 py-2 text-center border-t border-zinc-800">
              <a
                href={brandingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 font-medium hover:text-zinc-400 transition-colors"
              >
                {brandingText}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
