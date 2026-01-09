import {OrderDetail} from './order-detail';

export interface Order {
  order_id?: number;
  order_date: string;
  sub_total: number;
  shipping_fee: number;
  tax: number;
  order_total: number;

  shipping_firstname: string;
  shipping_lastname: string;
  shipping_email: string;
  shipping_phone: string;

  shipping_address: string;
  shipping_country: string;
  shipping_post_code: string;
  payment_status: string;
  payment_method: string;
  progress_status: string;
  buyer_id: number;
  buyer_username: string;
  buyer_email:string;

  buyer_firstname: string;
  buyer_lastname: string;
  buyer_phone: string;
  buyer_address: string;
  buyer_country: string;
  buyer_post_code: string;

  seller_id: number;
  seller_username: string;
  product_id: number;
  product_title: string;
  package_id: number;
  package_name: string
  quantity: number;

  shipping_method: string;
  gateway_fee: number;
  card_holder_name: string;
  card_number: string;
  card_expiry_date: string;
  card_cvv: string;
  order_detail_list: OrderDetail[];
}
