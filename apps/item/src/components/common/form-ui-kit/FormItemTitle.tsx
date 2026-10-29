import { FormItem } from '@/models/FormItem';
import clsx from 'clsx';

type FormItemTitleProps = Partial<FormItem> & {
  className?: string;
};

export default function FormItemTitle({
  title,
  required,
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
    </p>
  );
}
