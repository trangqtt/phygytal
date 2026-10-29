import { ProductType } from '../model/ProductModel';

export const toCoffeeData = (attribute: any) => {
  const {
    acidity,
    sweet,
    bitter,
  } = attribute || {};

  let productAttributes = {
    attribute: {
      ...attribute,
      acidity: +acidity,
      sweet: +sweet,
      bitter: +bitter,
    },
  };
  return productAttributes;
};

export const toSculptureData = (attribute: any) => {
  return attribute;
};

export const toProductData = (productData: any) => {
  const {
    product_name,
    org_id,
    origin,
    total_item,
    type,
    image,
    video,
    three_dimension,
    attribute,
    theme_id,
    author_id,
    data_model_id,
    data_model_value,
    theme,
    theme_pages,
    tags,
    translation,
    description
  } = productData;

  let product = {
    theme_id,
    product_name,
    origin,
    org_id,
    total_item,
    type,
    image,
    video,
    three_dimension,
    author_id,
    attribute,
    data_model_id,
    data_model_value,
    theme,
    theme_pages,
    tags,
    translation,
    description
  };

  let productAttributes = {};
  if (type === ProductType.Coffee) {
    productAttributes = toCoffeeData(attribute);
  }

  return {
    ...product,
    ...productAttributes,
  };
};
