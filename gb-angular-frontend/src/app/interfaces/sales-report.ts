export interface SalesReport {
  date: string;
  no_of_orders: number;
  no_of_items: number;
  sales_volume: number;
  single_product_order_count: number;
  single_grpbuy_order_count: number;
  package_grpbuy_order_count: number;
  single_product_qty_count: number;
  single_grpbuy_qty_count: number;
  package_grpbuy_qty_count: number;
  single_product_sub_total: number;
  single_grpbuy_sub_total: number;
  package_grpbuy_sub_total: number;
}
