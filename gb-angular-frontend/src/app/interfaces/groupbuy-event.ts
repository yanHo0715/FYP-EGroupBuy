export interface GroupBuyEvent {
  grpbuy_event_id: number;
  grpbuy_start: string;
  grpbuy_end: string;
  sell_type: string;
  product_id: number;
  package_grp_id: number;
  min_threshold: number;
  success_sold_qty: number;
  grpbuy_result: string;
  event_end_process: string;
  remark: string;
  seller_id: number;
}
