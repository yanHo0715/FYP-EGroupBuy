import {PackageItem} from './package-item';

export interface Package {
  package_id?: number;
  package_name: string;
  creation_date: string;
  description: string;
  quantity: number;
  regular_price: number;
  sale_price: number;
  product_id: number;
  product_title: string;
  product_item_id: number;
  item_name: string;
  package_grp_id: number;
  status: string;
  popularity: number;
  likes: number;
  wished: string;
  grpbuy_order_count: number;
  package_item_list: PackageItem[];
}
