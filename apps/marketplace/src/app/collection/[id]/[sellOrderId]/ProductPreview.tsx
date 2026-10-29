import { FC } from "react";

export type ProductPreviewProps = {
  picture: string;
}

const ProductPreview: FC<ProductPreviewProps> = ({ picture }) => {
  return (
    <div className="w-full flex-1 items-center justify-between h-137 bg-white rounded-xl p-6 flex gap-4">
      <div className="flex flex-col gap-4 h-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            className="w-20 h-20 border-2 border-n3 rounded-xl cursor-pointer"
            src={picture}
            alt="product"
          />
        ))}
      </div>
      <div className="w-full h-full">
        <img
          className="w-full h-full border-2 border-n3 rounded-xl object-scale-down"
          src={picture}
          alt="product"
        />
      </div>
    </div>
  );
};

export default ProductPreview;
