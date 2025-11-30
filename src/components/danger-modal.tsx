import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DangerModalProps {
  title?: string;
  description?: string;
  formAction?: string | ((formData: FormData) => void);
  projectId?: string;
}

export const DangerModal = ({
  title,
  description,
  formAction,
  projectId,
}: DangerModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="w-full font-mono text-xs uppercase bg-red-900/20 hover:bg-red-900 border border-red-900 text-red-400 hover:text-white rounded-sm"
        >
          Delete Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl space-y-5">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ||
              "Are you sure you want to proceed with this action? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <form action={formAction}>
            <input type="hidden" name="id" value={projectId} />
            <Button type="submit" variant="destructive">
              Delete Project
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};