import {PackageItem} from './package-item';

export interface OrderDetail {
  order_details_id?: number;
  order_id?: number;
  product_id: number;
  seller_id: number;
  seller_username: string;
  product_title: string;
  product_unit_price: number;
  product_image_url: string;
  status: string;
  quantity: number;
  sub_total: number;
  delivery_date: string;
  sell_type: string;
  package_grp_id?: number;
  package_grp_name?: string;
  package_id?: number;
  package_name?: string;
  grpbuy_end?: string;
  grpbuy_allocate_qty?: number;
  grpbuy_result?: string;
  shipping_method?: string;
  order_date?: string;
  package_item_list?: PackageItem[];
}
