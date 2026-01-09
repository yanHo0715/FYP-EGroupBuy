package com.egroupbuy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist {
    private int wishlist_id;
    private int user_id;
    private int product_id;
    private String product_title;
    private int package_grp_id;
    private String package_grp_name;
    private int package_id;
    private String package_name;
    private String product_image;
    private double regular_price;
    private double sale_price;
    private String stock_status;
    private String sell_type;
    List<PackageItem> package_item_list;
}
