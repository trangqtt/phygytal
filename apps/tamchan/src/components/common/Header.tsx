import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black bg-opacity-80 lg:bg-opacity-0 lg:backdrop-blur-0 backdrop-blur-xl fixed z-50 w-full py-4 px-16 flex align-center lg:justify-between justify-center">
      <Link href="/" className="text-white uppercase text-3xl font-lost-type">
        Tầm Chân
      </Link>
      {/*<LanguageIcon />*/}
    </header>
  );
};

export default Header;
