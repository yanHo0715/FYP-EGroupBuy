import {Package} from './package';
import {Product} from './product';

export interface PackageGroup {
  package_grp_id?: number;
  package_grp_name: string;
  creation_date: string;
  quantity: number;
  product_id: number;
  product_title: string;
  status: string;
  package_grp_image: string;
  grpbuy_start: string;
  grpbuy_end: string;
  grpbuy_duration: number;
  grpbuy_duration_type: string;
  min_threshold: number;
  wished: string;
  package_count: number;
  product: Product;
  package_list: Package[];
}
