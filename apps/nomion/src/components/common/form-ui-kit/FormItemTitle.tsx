import { FormItem } from '@/models/FormItem';
import { InfoOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';

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
        'text-[18px] font-bold leading-[24px] mb-[5px]',
        !!className && className
      )}
    >
      {title} {required && <span className="text-red-500">*</span>}{' '}
      {note && (
        <span className="relative top-[-5px]">
          <Tooltip title={note}>
            <InfoOutlined fontSize="small" />
          </Tooltip>
        </span>
      )}
    </p>
  );
}
