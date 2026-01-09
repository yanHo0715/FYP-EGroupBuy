import {ProductItem} from './product-item';

export interface PackageItem {
  package_item_id?: number;
  product_item_id: number;
  item_name: string;
  package_grp_id: number;
  package_id: number;
  status: string;
  popularity: number;
  likes: number;
  package_item_image: string
  productItem: ProductItem;
}
