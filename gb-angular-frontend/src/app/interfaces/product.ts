import {Package} from './package';
import {ProductItem} from './product-item';
import {ReviewOverallScore} from './review-overall-score';

export interface Product {
  product_id: number;
  title: string;
  creation_date: string;
  sell_style: string;
  description: string;
  image_urls: string;
  brand_id: number;
  material: string;
  delivery_date: string;
  delivery_method: string;
  delivery_region: string;
  min_threshold: number;
  stock_quantity: number;
  stock_status: string;
  status: string;
  cost: number;
  regular_price?: number;
  sale_price?: number;
  category_id: number;
  seller_id: number;
  seller_username: string;
  likes: number;
  display_position: number;
  main_image: string;
  brand_name: string;
  category_name: string;
  grpbuy_start: string;
  grpbuy_end: string;
  grpbuy_quantity: number;
  grpbuy_regular_price: number;
  grpbuy_sale_price: number;
  grpbuy_status: string;
  grpbuy_order_count: number
  package_grp_count: number;
  product_item_list: ProductItem[];
  review_overall_score?: ReviewOverallScore;
}
