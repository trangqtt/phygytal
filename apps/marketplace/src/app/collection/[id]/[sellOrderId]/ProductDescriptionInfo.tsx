import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { FC } from "react";
import parse from "html-react-parser";

export type ProductDescriptionInfoProps = {
  description: string;
}

const ProductDescriptionInfo: FC<ProductDescriptionInfoProps> = ({ description }) => {
  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-xl" defaultValue="item-1">
      <AccordionItem value="item-1" className="w-full border-none">
        <AccordionTrigger className="px-6 py-4">
          Thông tin sản phẩm
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full px-6 py-4 border-t flex flex-col gap-6">
            {parse(description || "")}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDescriptionInfo;
