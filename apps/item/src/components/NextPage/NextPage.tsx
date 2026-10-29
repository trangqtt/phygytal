import Link from "next/link";
import CircleDownIcon from "../common/icons/CircleDownIcon";

interface NextPageProps {
  url: string;
  title: string;
}

export default function NextPage({ url, title }: NextPageProps) {
  return (
    <div
      className="z-[1] flex flex-col items-center justify-center gap-[15px] border-t-[1px]  border-solid
    border-lesslightgrey pb-[20px] pt-[15px]"
    >
      <Link href={url}>
        <div className="mb-[10px] uppercase text-white underline">{title}</div>
        <div className="flex flex-col justify-center">
          <div className=" flex justify-center">
            <CircleDownIcon />
          </div>
        </div>
      </Link>
    </div>
  );
}
