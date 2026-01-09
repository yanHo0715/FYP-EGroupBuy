import {PackageItem} from './package-item';

export interface Wishlist {
  wishlist_id?: number;
  user_id: number;
  product_id: number;
  product_title: string;
  package_grp_id?: number;
  package_grp_name?: string;
  package_id?: number;
  package_name?: string;
  product_image: string;
  regular_price?: number;
  sale_price?: number;
  stock_status?: string;
  sell_type: string;
  package_item_list?: PackageItem[];
}
