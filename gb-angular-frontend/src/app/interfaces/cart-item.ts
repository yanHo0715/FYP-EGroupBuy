import {Package} from './package';
import {PackageItem} from './package-item';

export interface CartItem {
  cart_id?: number;
  buyer_id: number;
  product_id: number;
  product_title: string;
  package_id?: number
  package_name?: string;
  seller_id?: number;
  seller_username?: string;
  quantity: number;
  unit_price: number;
  sub_Total: number;
  sell_type: string;
  item_image_url: string;
  package_grp_id?: number;
  package_grp_name?: string;
  grpbuy_end?: string;
  package_item_list?: PackageItem[];
}
