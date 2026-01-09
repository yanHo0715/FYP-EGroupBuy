package com.egroupbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SalesReport {
    private String date;
    private int no_of_orders;
    private int no_of_items;
    private double sales_volume;
    private int single_product_order_count;
    private int single_grpbuy_order_count;
    private int package_grpbuy_order_count;
    private int single_product_qty_count;
    private int single_grpbuy_qty_count;
    private int package_grpbuy_qty_count;
    private double single_product_sub_total;
    private double single_grpbuy_sub_total;
    private double package_grpbuy_sub_total;

}
