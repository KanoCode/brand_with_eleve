import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { AlertDialogActionProps } from "@radix-ui/react-alert-dialog";
import { signOut } from "next-auth/react";
import { FC, ReactNode } from "react";

interface Props {
  actionProps: AlertDialogActionProps;
  triggerButtonProps: ButtonProps;
  alertTile: ReactNode;
  alertDescription: ReactNode;
  actionTitle: ReactNode;
}
const ActionAlert: FC<Props> = ({
  actionProps,
  actionTitle,
  triggerButtonProps,
  alertTile,
  alertDescription,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...triggerButtonProps}>{actionTitle}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTile}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Discard</AlertDialogCancel>
          <AlertDialogAction {...actionProps}>{actionTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionAlert;
