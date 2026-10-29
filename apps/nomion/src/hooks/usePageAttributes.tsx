import { ProductTag } from "@/models/Product";
import { selectPageInfo } from "@/redux/pageSlice";
import { useSelector } from "react-redux";
import _ from "lodash";

const sortData = (data: ProductTag[]) => {
  const productTags = _.cloneDeep(data);
  return productTags?.sort((a: any, b: any) =>
    a.product_detail.product_name.localeCompare(b.product_detail.product_name)
  );
};

export function useHomepageAttributes() {
  const pageInfo = useSelector(selectPageInfo);
  const story = pageInfo?.story || [];

  return {
    story: sortData(story),
  };
}
