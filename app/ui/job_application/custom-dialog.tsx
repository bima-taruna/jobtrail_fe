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
import React from "react";

interface DialogProps {
  dialog_title: string;
  dialog_action?: string;
  dialog_description: string;
  children: React.ReactNode;
  triggerButton: React.ReactNode;
}

export function CustomDialog({
  dialog_title,
  triggerButton,
  dialog_description,
  children,
}: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialog_title}</DialogTitle>
          <DialogDescription>{dialog_description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
