import HeadingCustom from "@/components/common/HeadingCustom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center px-16  h-[250px]">
      <hr className="border border-[#656565] w-full" />
      <footer className="flex flex-col items-center w-full py-10 text-neutral">
        <div className=" h-full flex flex-col align-center text-center ">
          <HeadingCustom className="text-white mb-8 whitespace-nowrap">
            <div className="text-4xl">Tầm Chân</div>
          </HeadingCustom>
          <div className="space-y-3">
            <div>Liên lạc với chúng tôi tại</div>
            <address>
              <a
                className="font-semibold text-white not-italic"
                href="mailto:hello@tamchan.vn">
                hello@tamchan.vn
              </a>
            </address>
          </div>
        </div>
        <div className="flex justify-between w-full mt-10">
          <div className="flex w-full justify-center lg:justify-start">
            © 2023 TIDE. All rights reserved.
          </div>

          <div className="flex flex-col justify-end ">
            <div className="flex justify-between px-6 hidden">
              <div>Terms of Service</div>
              <div>Privacy Policy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
