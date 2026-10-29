export interface ProductItem {
  id: string;
  product_id: string;
  product_name: string;
  item_index: number;
}

export enum ProductType {
  Coffee = 'coffee',
  Sculpture = 'sculpture',
  Astronaut = 'astronaut',
  Orthor = 'orthor',
}
