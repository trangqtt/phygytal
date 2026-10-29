import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import Link from "next/link";

const ProductIdentityInfo = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full h-full bg-white rounded-xl"
    >
      <AccordionItem value="item-1" className="w-full border-none">
        <AccordionTrigger className="px-6 py-4">
          Thông tin định danh
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full px-6 py-4 border-t flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-n6 font-normal text-sm">Bộ sưu tập</p>
              <Link href="#" className="text-sm font-semibold underline">
                Cuộc thi Đá Non Nước 2023
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-n6 font-normal text-sm">Hợp đồng thông minh</p>
              <Link
                href="#"
                className="text-sm font-semibold underline text-secondary"
              >
                0xb6a3...786e
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-n6 font-normal text-sm">Tiêu chuẩn</p>
              <p className="text-sm font-medium text-n8">KRC-721</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-n6 font-normal text-sm">Chuỗi</p>
              <p className="text-sm font-medium text-n8">Kardiachain</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductIdentityInfo;
