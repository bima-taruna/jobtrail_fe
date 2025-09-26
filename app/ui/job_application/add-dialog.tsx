import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import { PlusIcon } from "lucide-react";
import { Label } from "@/app/ui/components/label";
import { Input } from "@/app/ui/components/input";
import { CreateJobApplicationForm } from "@/app/ui/job_application/add-form";

export function AddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>
            Fill form the data of job application that you are currently hiring
          </DialogDescription>
        </DialogHeader>
        <CreateJobApplicationForm />
      </DialogContent>
    </Dialog>
  );
}
