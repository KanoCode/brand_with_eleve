import { Button } from "@/components/ui/button";
import ThankYouForShoppingWithUs from "./thankYou";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScheduleCall from "./scheduleCall";

import { useState, FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouMessageDialog: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none">
        <ScheduleCall />
      </DialogContent>
    </Dialog>
  );
};
