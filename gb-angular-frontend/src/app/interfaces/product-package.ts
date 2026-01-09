import {Package} from './package';
import {EndTime} from './end-time';
import {ReviewOverallScore} from './review-overall-score';

export interface ProductPackage {
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
  regular_price: number;
  sale_price: number;
  category_id: number;
  seller_id: number;
  seller_username: string;
  likes: number;
  display_position: number;
  main_image: string;
  brand_name: string;
  category_name: string
  grpbuy_start: string;
  grpbuy_end: string;
  grpbuy_quantity: number;
  grpbuy_regular_price: number;
  grpbuy_sale_price: number;
  grpbuy_status: string;
  sell_type: string
  pkg_grp_id: number;
  pkg_grp_name: string;
  pkg_creation_date: string;
  pkg_quantity: number;
  pkg_product_id: number;
  pkg_product_title: string;
  pkg_status: string;
  pkg_grp_image: string;
  pkg_grpbuy_start: string;
  pkg_grpbuy_end: string;
  pkg_grpbuy_duration: number;
  pkg_grpbuy_duration_type: string;
  pkg_min_threshold: number;
  pkg_end_time_counter: EndTime;
  wished: string;
  package_count: number;
  review_overall_score?: ReviewOverallScore;
  timer:any;
}
