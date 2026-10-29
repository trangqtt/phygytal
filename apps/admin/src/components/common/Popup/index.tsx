import { FC, ReactElement, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui-kit/dialog';

export type PopupProps = {
  open: boolean;
  children: ReactNode;
  triggerEle?: ReactElement;
  title?: string;
  actionEle?: ReactElement;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

const Popup: FC<PopupProps> = ({
  open,
  title,
  children,
  triggerEle,
  actionEle,
  className,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!!triggerEle && <DialogTrigger>{triggerEle}</DialogTrigger>}
      <DialogContent className={className}>
        {title && (
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>
        )}
          {children}
        {!!actionEle && <DialogFooter className='sticky bottom-0'>{actionEle}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
