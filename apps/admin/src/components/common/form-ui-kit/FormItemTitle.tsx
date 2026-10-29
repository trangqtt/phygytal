import { InfoOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { FormItem } from '../../../model/FormItem';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shadcn-ui-kit/toolip';

type FormItemTitleProps = Partial<FormItem> & {
  className?: string;
};

export default function FormItemTitle({
  title,
  required,
  note,
  className,
}: FormItemTitleProps) {
  if (!title) {
    return null;
  }

  return (
    <p
      className={clsx(
        'text-[20px] font-normal leading-[24px] mb-[5px]',
        !!className && className
      )}
    >
      {title} {required && <span className="text-red-500">*</span>}{' '}
      {note && (
        <span className="relative top-[-5px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoOutlined fontSize="small" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{note}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      )}
    </p>
  );
}
