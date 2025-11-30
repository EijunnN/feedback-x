// "use client";

// import { Lock } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { WidgetPreview } from "@/components/widget-preview";

// interface ProjectSettingsFormProps {
//   project: {
//     id: string;
//     name: string;
//     domain: string | null;
//     widgetPosition: string | null;
//     widgetColor: string | null;
//     widgetText: string | null;
//     showBranding: boolean | null;
//     enableBugs: boolean | null;
//     enableIdeas: boolean | null;
//     enableOther: boolean | null;
//     notifyEmail: string | null;
//   };
//   planDetails: {
//     allowCustomization: boolean;
//     allowRemoveBranding: boolean;
//   };
//   updateAction: (formData: FormData) => Promise<void>;
// }

// export function ProjectSettingsForm({
//   project,
//   planDetails,
//   updateAction,
// }: ProjectSettingsFormProps) {
//   const [widgetColor, setWidgetColor] = useState(
//     project.widgetColor || "#6366f1",
//   );
//   const [widgetPosition, setWidgetPosition] = useState(
//     project.widgetPosition || "bottom-right",
//   );
//   const [widgetText, setWidgetText] = useState(
//     project.widgetText || "Feedback",
//   );
//   const [showBranding, setShowBranding] = useState(
//     project.showBranding ?? true,
//   );
//   const [enableBugs, setEnableBugs] = useState(project.enableBugs ?? true);
//   const [enableIdeas, setEnableIdeas] = useState(project.enableIdeas ?? true);
//   const [enableOther, setEnableOther] = useState(project.enableOther ?? true);

//   return (
//     <form action={updateAction} className="space-y-8">
//       <input type="hidden" name="id" value={project.id} />

//       <section>
//         <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="name" className="text-sm font-medium">
//               Project Name
//             </label>
//             <Input id="name" name="name" defaultValue={project.name} required />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="domain" className="text-sm font-medium">
//               Domain
//             </label>
//             <Input
//               id="domain"
//               name="domain"
//               defaultValue={project.domain || ""}
//               placeholder="example.com"
//             />
//           </div>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-lg font-semibold mb-4">Feedback Types</h2>
//         <div className="space-y-3">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="enableBugs"
//               value="true"
//               checked={enableBugs}
//               onChange={(e) => setEnableBugs(e.target.checked)}
//               className="rounded"
//             />
//             <span className="text-sm">Bug Reports</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="enableIdeas"
//               value="true"
//               checked={enableIdeas}
//               onChange={(e) => setEnableIdeas(e.target.checked)}
//               className="rounded"
//             />
//             <span className="text-sm">Feature Ideas</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="enableOther"
//               value="true"
//               checked={enableOther}
//               onChange={(e) => setEnableOther(e.target.checked)}
//               className="rounded"
//             />
//             <span className="text-sm">Other Feedback</span>
//           </label>
//         </div>
//       </section>

//       <section>
//         <div className="flex items-center gap-2 mb-4">
//           <h2 className="text-lg font-semibold">Widget Customization</h2>
//           {!planDetails.allowCustomization && (
//             <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
//               <Lock className="h-3 w-3" /> Pro
//             </span>
//           )}
//         </div>
//         {planDetails.allowCustomization ? (
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="widgetColor" className="text-sm font-medium">
//                 Widget Color
//               </label>
//               <div className="flex gap-2">
//                 <Input
//                   type="color"
//                   id="widgetColor"
//                   name="widgetColor"
//                   value={widgetColor}
//                   onChange={(e) => setWidgetColor(e.target.value)}
//                   className="w-12 h-10 p-1"
//                 />
//                 <Input
//                   type="text"
//                   value={widgetColor}
//                   onChange={(e) => setWidgetColor(e.target.value)}
//                   className="flex-1"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="widgetPosition" className="text-sm font-medium">
//                 Widget Position
//               </label>
//               <select
//                 id="widgetPosition"
//                 name="widgetPosition"
//                 value={widgetPosition}
//                 onChange={(e) => setWidgetPosition(e.target.value)}
//                 className="w-full rounded-md border bg-background px-3 py-2 text-sm"
//               >
//                 <option value="bottom-right">Bottom Right</option>
//                 <option value="bottom-left">Bottom Left</option>
//                 <option value="top-right">Top Right</option>
//                 <option value="top-left">Top Left</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="widgetText" className="text-sm font-medium">
//                 Button Text
//               </label>
//               <Input
//                 id="widgetText"
//                 name="widgetText"
//                 value={widgetText}
//                 onChange={(e) => setWidgetText(e.target.value)}
//                 placeholder="Feedback"
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="notifyEmail" className="text-sm font-medium">
//                 Notification Email
//               </label>
//               <Input
//                 id="notifyEmail"
//                 name="notifyEmail"
//                 type="email"
//                 defaultValue={project.notifyEmail || ""}
//                 placeholder="you@example.com"
//               />
//               <p className="text-xs text-muted-foreground">
//                 Receive email notifications for new feedback
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-lg border bg-muted/30 p-4">
//             <p className="text-sm text-muted-foreground">
//               Upgrade to Pro to customize widget colors, position, and text.
//             </p>
//             <Button asChild size="sm" className="mt-3">
//               <Link href="/billing">Upgrade to Pro</Link>
//             </Button>
//           </div>
//         )}
//       </section>

//       <section>
//         <div className="flex items-center gap-2 mb-4">
//           <h2 className="text-lg font-semibold">Branding</h2>
//           {!planDetails.allowRemoveBranding && (
//             <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
//               <Lock className="h-3 w-3" /> Max
//             </span>
//           )}
//         </div>
//         {planDetails.allowRemoveBranding ? (
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="showBranding"
//               value="true"
//               checked={showBranding}
//               onChange={(e) => setShowBranding(e.target.checked)}
//               className="rounded"
//             />
//             <span className="text-sm">Show "Powered by Annya" branding</span>
//           </label>
//         ) : (
//           <div className="rounded-lg border bg-muted/30 p-4">
//             <p className="text-sm text-muted-foreground">
//               Upgrade to Max to remove Annya branding from the widget.
//             </p>
//             <Button asChild size="sm" className="mt-3">
//               <Link href="/billing">Upgrade to Max</Link>
//             </Button>
//           </div>
//         )}
//       </section>

//       <section>
//         <h2 className="text-lg font-semibold mb-4">Widget Preview</h2>
//         <p className="text-sm text-muted-foreground mb-3">
//           Click the button to see how your widget will look
//         </p>
//         <WidgetPreview
//           color={planDetails.allowCustomization ? widgetColor : "#6366f1"}
//           position={
//             planDetails.allowCustomization ? widgetPosition : "bottom-right"
//           }
//           text={planDetails.allowCustomization ? widgetText : "Feedback"}
//           showBranding={planDetails.allowRemoveBranding ? showBranding : true}
//           enableBugs={enableBugs}
//           enableIdeas={enableIdeas}
//           enableOther={enableOther}
//         />
//       </section>

//       <Button type="submit">Save Changes</Button>
//     </form>
//   );
// }

"use client";

import { Lock, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { WidgetPreview } from "@/components/widget-preview";
import { toast } from "sonner";

interface ProjectSettingsFormProps {
  project: {
    id: string;
    name: string;
    domain: string | null;
    widgetPosition: string | null;
    widgetColor: string | null;
    widgetText: string | null;
    showBranding: boolean | null;
    enableBugs: boolean | null;
    enableIdeas: boolean | null;
    enableOther: boolean | null;
    notifyEmail: string | null;
    bugLabel: string | null;
    bugEmoji: string | null;
    ideaLabel: string | null;
    ideaEmoji: string | null;
    otherLabel: string | null;
    otherEmoji: string | null;
    feedbackPlaceholder: string | null;
    brandingText: string | null;
    brandingLink: string | null;
  };
  planDetails: {
    allowCustomization: boolean;
    allowRemoveBranding: boolean;
  };
  updateAction: (formData: FormData) => Promise<void>;
}

export function ProjectSettingsForm({
  project,
  planDetails,
  updateAction,
}: ProjectSettingsFormProps) {
  const [widgetColor, setWidgetColor] = useState(
    project.widgetColor || "#ea580c",
  );
  const [widgetPosition, setWidgetPosition] = useState(
    project.widgetPosition || "bottom-right",
  );
  const [widgetText, setWidgetText] = useState(
    project.widgetText || "Feedback",
  );
  const [showBranding, setShowBranding] = useState(
    project.showBranding ?? true,
  );
  const [enableBugs, setEnableBugs] = useState(project.enableBugs ?? true);
  const [enableIdeas, setEnableIdeas] = useState(project.enableIdeas ?? true);
  const [enableOther, setEnableOther] = useState(project.enableOther ?? true);

  // Capture matrix
  const [bugLabel, setBugLabel] = useState(project.bugLabel || "Bug");
  const [bugEmoji, setBugEmoji] = useState(project.bugEmoji || "");
  const [ideaLabel, setIdeaLabel] = useState(project.ideaLabel || "Idea");
  const [ideaEmoji, setIdeaEmoji] = useState(project.ideaEmoji || "");
  const [otherLabel, setOtherLabel] = useState(project.otherLabel || "Other");
  const [otherEmoji, setOtherEmoji] = useState(project.otherEmoji || "");
  const [feedbackPlaceholder, setFeedbackPlaceholder] = useState(
    project.feedbackPlaceholder || "Describe your issue or idea...",
  );

  // Branding customization
  const [brandingText, setBrandingText] = useState(
    project.brandingText || "Powered by Annya",
  );
  const [brandingLink, setBrandingLink] = useState(
    project.brandingLink || "https://annya.io",
  );

  const handleSubmit = async (formData: FormData) => {
    // Manually set checkbox values from React state to ensure they're current
    try {
      formData.set("widgetPosition", widgetPosition);
      formData.set("enableBugs", String(enableBugs));
      formData.set("enableIdeas", String(enableIdeas));
      formData.set("enableOther", String(enableOther));
      formData.set("showBranding", String(showBranding));
      await updateAction(formData);
      toast.success("Configuration saved successfully");
    } catch (error) {
      toast.error("Failed to save configuration");
    }
  };

  return (
    <form action={handleSubmit} className="grid xl:grid-cols-[1fr_400px] gap-8">
      <input type="hidden" name="id" value={project.id} />

      <div className="space-y-8 w-full">
        {/* General Config */}
        <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-6 pb-2 border-b border-zinc-800">
            Configuration
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
              >
                Project Name
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={project.name}
                required
                className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10 focus-visible:ring-orange-500/50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="domain"
                className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
              >
                Target Domain
              </label>
              <Input
                id="domain"
                name="domain"
                defaultValue={project.domain || ""}
                placeholder="*.example.com"
                className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10 focus-visible:ring-orange-500/50"
              />
            </div>
          </div>
        </section>

        {/* Capture Types */}
        <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-6 pb-2 border-b border-zinc-800">
            Capture Matrix
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  id: "enableBugs",
                  label: "Bug Reports",
                  state: enableBugs,
                  set: setEnableBugs,
                  labelValue: bugLabel,
                  setLabel: setBugLabel,
                  emoji: bugEmoji,
                  setEmoji: setBugEmoji,
                  labelName: "bugLabel",
                  emojiName: "bugEmoji",
                },
                {
                  id: "enableIdeas",
                  label: "Feature Ideas",
                  state: enableIdeas,
                  set: setEnableIdeas,
                  labelValue: ideaLabel,
                  setLabel: setIdeaLabel,
                  emoji: ideaEmoji,
                  setEmoji: setIdeaEmoji,
                  labelName: "ideaLabel",
                  emojiName: "ideaEmoji",
                },
                {
                  id: "enableOther",
                  label: "General Input",
                  state: enableOther,
                  set: setEnableOther,
                  labelValue: otherLabel,
                  setLabel: setOtherLabel,
                  emoji: otherEmoji,
                  setEmoji: setOtherEmoji,
                  labelName: "otherLabel",
                  emojiName: "otherEmoji",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-zinc-800 rounded-sm bg-black hover:border-zinc-700 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={item.id}
                      checked={item.state}
                      onCheckedChange={(c) => item.set(c === true)}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-xs text-zinc-300 font-mono cursor-pointer uppercase tracking-wide"
                    >
                      {item.label}
                    </label>
                  </div>
                  <div className="grid grid-cols-[1fr_60px] gap-2">
                    <Input
                      name={item.labelName}
                      value={item.labelValue}
                      onChange={(e) => item.setLabel(e.target.value)}
                      placeholder="Label"
                      className="bg-zinc-900 border-zinc-800 text-white rounded-sm font-mono text-xs h-8"
                    />
                    <Input
                      name={item.emojiName}
                      value={item.emoji}
                      onChange={(e) => item.setEmoji(e.target.value)}
                      placeholder="Emoji"
                      className="bg-zinc-900 border-zinc-800 text-white rounded-sm text-center text-sm h-8"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="feedbackPlaceholder"
                className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
              >
                Feedback Placeholder Text
              </label>
              <Input
                id="feedbackPlaceholder"
                name="feedbackPlaceholder"
                value={feedbackPlaceholder}
                onChange={(e) => setFeedbackPlaceholder(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10"
              />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Interface Design
            </h2>
            {!planDetails.allowCustomization && (
              <span className="flex items-center gap-1 text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm font-mono uppercase">
                <Lock className="h-3 w-3" /> Locked
              </span>
            )}
          </div>
          {planDetails.allowCustomization ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="widgetColor"
                  className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
                >
                  Accent Hex
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <Input
                      type="color"
                      id="widgetColor"
                      name="widgetColor"
                      value={widgetColor}
                      onChange={(e) => setWidgetColor(e.target.value)}
                      className="w-10 h-10 p-1 bg-black border-zinc-800 rounded-sm cursor-pointer absolute opacity-0"
                    />
                    <div
                      className="w-10 h-10 border border-zinc-800 rounded-sm"
                      style={{ backgroundColor: widgetColor }}
                    />
                  </div>
                  <Input
                    type="text"
                    value={widgetColor}
                    onChange={(e) => setWidgetColor(e.target.value)}
                    className="flex-1 bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                  Grid Position
                </label>
                <Select
                  value={widgetPosition}
                  onValueChange={setWidgetPosition}
                  options={[
                    { value: "bottom-right", label: "Bottom Right" },
                    { value: "bottom-left", label: "Bottom Left" },
                    { value: "top-right", label: "Top Right" },
                    { value: "top-left", label: "Top Left" },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="widgetText"
                  className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
                >
                  Trigger Label
                </label>
                <Input
                  id="widgetText"
                  name="widgetText"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-zinc-800 bg-zinc-900/10 p-8 text-center">
              <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
                Unlock advanced interface customization
              </p>
              <Button
                asChild
                size="sm"
                className="bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase rounded-sm font-bold"
              >
                <Link href="/billing">Upgrade Subscription</Link>
              </Button>
            </div>
          )}
        </section>

        {/* Branding Customization */}
        <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Branding
            </h2>
            {!planDetails.allowRemoveBranding && (
              <span className="flex items-center gap-1 text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm font-mono uppercase">
                <Lock className="h-3 w-3" /> Max
              </span>
            )}
          </div>
          {planDetails.allowRemoveBranding ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border border-zinc-800 rounded-sm bg-black">
                <Checkbox
                  id="showBranding"
                  checked={showBranding}
                  onCheckedChange={(c) => setShowBranding(c === true)}
                />
                <label
                  htmlFor="showBranding"
                  className="text-xs text-zinc-300 font-mono cursor-pointer uppercase tracking-wide"
                >
                  Show Branding
                </label>
              </div>
              {showBranding && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="brandingText"
                      className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
                    >
                      Branding Text
                    </label>
                    <Input
                      id="brandingText"
                      name="brandingText"
                      value={brandingText}
                      onChange={(e) => setBrandingText(e.target.value)}
                      placeholder="Powered by Annya"
                      className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="brandingLink"
                      className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider"
                    >
                      Branding Link
                    </label>
                    <Input
                      id="brandingLink"
                      name="brandingLink"
                      value={brandingLink}
                      onChange={(e) => setBrandingLink(e.target.value)}
                      placeholder="https://annya.io"
                      className="bg-black border-zinc-800 text-white rounded-sm font-mono text-sm h-10"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-zinc-800 bg-zinc-900/10 p-8 text-center">
              <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
                Customize or remove branding with Max plan
              </p>
              <Button
                asChild
                size="sm"
                className="bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase rounded-sm font-bold"
              >
                <Link href="/billing">Upgrade to Max</Link>
              </Button>
            </div>
          )}
        </section>
      </div>

      <div className="space-y-6">
        <section className="sticky top-6">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4 pl-1">
            Live Preview
          </h2>
          <WidgetPreview
            color={planDetails.allowCustomization ? widgetColor : "#ea580c"}
            position={
              planDetails.allowCustomization ? widgetPosition : "bottom-right"
            }
            text={planDetails.allowCustomization ? widgetText : "Feedback"}
            showBranding={planDetails.allowRemoveBranding ? showBranding : true}
            enableBugs={enableBugs}
            enableIdeas={enableIdeas}
            enableOther={enableOther}
            bugLabel={bugLabel}
            bugEmoji={bugEmoji}
            ideaLabel={ideaLabel}
            ideaEmoji={ideaEmoji}
            otherLabel={otherLabel}
            otherEmoji={otherEmoji}
            feedbackPlaceholder={feedbackPlaceholder}
            brandingText={
              planDetails.allowRemoveBranding
                ? brandingText
                : "Powered by Annya"
            }
            brandingLink={
              planDetails.allowRemoveBranding
                ? brandingLink
                : "https://annya.io"
            }
          />

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs uppercase font-bold h-12 rounded-sm shadow-[0_0_20px_rgba(234,88,12,0.15)] border border-orange-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </section>
      </div>
    </form>
  );
}
