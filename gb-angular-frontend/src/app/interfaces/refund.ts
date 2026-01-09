import { OrderDetail } from './order-detail';

export interface Refund {
  refund_id: number;
  order_id: number;
  order_details_id: number;
  seller_id: number;
  reason: string;
  bank_number: string;
  bank_name: string;
  refund_amount: number;
  progress_status: string;
  requester_id: number;
  request_date: string;
  approval_date: string;
  orderDetail: OrderDetail;
  seller_username: string;
  requester_username: string;
  product_id: number;
  package_id: number;
  sell_type: string;
  grpbuy_end: string;
  refund_qty: number;
  org_amount: number;
  org_qty: number;
  unit_price: number;
  refund_type: string;

}
