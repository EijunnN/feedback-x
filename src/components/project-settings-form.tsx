"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WidgetPreview } from "@/components/widget-preview";

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
    project.widgetColor || "#6366f1",
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

  return (
    <form action={updateAction} className="space-y-8">
      <input type="hidden" name="id" value={project.id} />

      <section>
        <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name
            </label>
            <Input id="name" name="name" defaultValue={project.name} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="domain" className="text-sm font-medium">
              Domain
            </label>
            <Input
              id="domain"
              name="domain"
              defaultValue={project.domain || ""}
              placeholder="example.com"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Feedback Types</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="enableBugs"
              value="true"
              checked={enableBugs}
              onChange={(e) => setEnableBugs(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Bug Reports</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="enableIdeas"
              value="true"
              checked={enableIdeas}
              onChange={(e) => setEnableIdeas(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Feature Ideas</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="enableOther"
              value="true"
              checked={enableOther}
              onChange={(e) => setEnableOther(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Other Feedback</span>
          </label>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">Widget Customization</h2>
          {!planDetails.allowCustomization && (
            <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
              <Lock className="h-3 w-3" /> Pro
            </span>
          )}
        </div>
        {planDetails.allowCustomization ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="widgetColor" className="text-sm font-medium">
                Widget Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="widgetColor"
                  name="widgetColor"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="widgetPosition" className="text-sm font-medium">
                Widget Position
              </label>
              <select
                id="widgetPosition"
                name="widgetPosition"
                value={widgetPosition}
                onChange={(e) => setWidgetPosition(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="widgetText" className="text-sm font-medium">
                Button Text
              </label>
              <Input
                id="widgetText"
                name="widgetText"
                value={widgetText}
                onChange={(e) => setWidgetText(e.target.value)}
                placeholder="Feedback"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="notifyEmail" className="text-sm font-medium">
                Notification Email
              </label>
              <Input
                id="notifyEmail"
                name="notifyEmail"
                type="email"
                defaultValue={project.notifyEmail || ""}
                placeholder="you@example.com"
              />
              <p className="text-xs text-muted-foreground">
                Receive email notifications for new feedback
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro to customize widget colors, position, and text.
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link href="/billing">Upgrade to Pro</Link>
            </Button>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">Branding</h2>
          {!planDetails.allowRemoveBranding && (
            <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
              <Lock className="h-3 w-3" /> Max
            </span>
          )}
        </div>
        {planDetails.allowRemoveBranding ? (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showBranding"
              value="true"
              checked={showBranding}
              onChange={(e) => setShowBranding(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Show "Powered by Annya" branding</span>
          </label>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Upgrade to Max to remove Annya branding from the widget.
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link href="/billing">Upgrade to Max</Link>
            </Button>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Widget Preview</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Click the button to see how your widget will look
        </p>
        <WidgetPreview
          color={planDetails.allowCustomization ? widgetColor : "#6366f1"}
          position={
            planDetails.allowCustomization ? widgetPosition : "bottom-right"
          }
          text={planDetails.allowCustomization ? widgetText : "Feedback"}
          showBranding={planDetails.allowRemoveBranding ? showBranding : true}
          enableBugs={enableBugs}
          enableIdeas={enableIdeas}
          enableOther={enableOther}
        />
      </section>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
