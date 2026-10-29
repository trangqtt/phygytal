import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@components/ui/dialog";

export type PaymentSuccessDialogProps = {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymenSuccessDialog({ isOpen, onClose }: PaymentSuccessDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        Order Success
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
