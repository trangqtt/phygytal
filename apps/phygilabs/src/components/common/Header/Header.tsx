import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select";

const Header = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const onChangeLang = (value: string) => {
    router.push({ pathname, query }, asPath, {
      locale: value,
    });
  };
  return (
    <header className="fixed z-50 flex h-[64px] w-full bg-mediumBlue md:h-[80px]">
      <div className="m-auto flex w-full items-center justify-between px-[24px] py-[16px] lg:px-[40px]">
        <Link href="/">
          <div className="relative cursor-pointer">
            <img
              src="https://assets.nomion.io/phygilab-website/phygilab-yellow-logo.png"
              alt="Phygilabs"
              className="h-auto w-40 object-cover md:w-60"
            />
          </div>
        </Link>
        <Select value={i18n.language} onValueChange={onChangeLang} >
          <SelectTrigger className="bg-opacity-white hover:bg-opacity-white-hover p-2 text-white backdrop-blur-md rounded-full">
          </SelectTrigger>
          <SelectContent className="bg-opacity-white w-32 text-white backdrop-blur-md">
            <SelectItem className="hover:bg-opacity-white-hover rounded-[4px]" value="vi">Tiếng Việt</SelectItem>
            <SelectItem className="hover:bg-opacity-white-hover rounded-[4px]" value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;
