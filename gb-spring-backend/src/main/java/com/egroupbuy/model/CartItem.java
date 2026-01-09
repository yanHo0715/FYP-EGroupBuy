package com.egroupbuy.model;

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartItem {
    int cart_id;
    int buyer_id;
    int product_id;
    String product_title;
    int package_id;
    String package_name;
    int seller_id;
    String seller_username;
    int quantity;
    double unit_price;
    double sub_Total;
    String sell_type;
    String item_image_url;
    int package_grp_id;
    String package_grp_name;
    Timestamp grpbuy_end;
    List<PackageItem> package_item_list;
}
