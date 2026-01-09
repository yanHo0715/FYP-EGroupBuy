package com.egroupbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BestSellProduct {
    private int prod_id;
    private String prod_name;
    private String prod_image;
    private String sell_type;
    private int total_qty;
    private double total_amt;
    private double unit_price;
}
