import { FC } from "react";

export type LineTextProps = {
  content: string;
}

const LineText: FC<LineTextProps> = (props) => {
  const { content } = props;

  return (
    <div className="flex w-full h-fit items-center justify-center gap-[16px]">
      <div className="h-[1px] w-full rounded-lg border border-white"></div>
      <p className="whitespace-nowrap text-[16px] font-semibold uppercase">
        {content}
      </p>
      <div className="h-[1px] w-full rounded-lg border border-white"></div>
    </div>
  );
};

export default LineText
