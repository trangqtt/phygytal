import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import GoogleIcon from "@components/ui/icons/GoogleIcon";
import { signInGoogle } from "@lib/firebase/gmail";
import jwtDecode from "jwt-decode";

export type SignInDialogProps = {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInDialog({ isOpen, onClose }: SignInDialogProps) {
  const onSignIn = async () => {
    const response = await signInGoogle();

      if (response && !response.errorCode) {
        const token = jwtDecode(response.data.accessToken) as any;
        onClose();
      }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize text-center">sign in</DialogTitle>
        </DialogHeader>
        <Button variant={"outline"} className="flex items-center gap-2 focus:ring-0" onClick={onSignIn}>
          <GoogleIcon /> Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
