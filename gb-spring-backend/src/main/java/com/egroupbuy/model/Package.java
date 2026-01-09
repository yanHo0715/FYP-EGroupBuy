package com.egroupbuy.model;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Package {
    int package_id;
    String package_name;
    Date creation_date;
    String description;
    int quantity;
    double regular_price;
    double sale_price;
    int product_id;
    String product_title;
    int product_item_id;
    String item_name;
    int package_grp_id;
    String status;
    int popularity;
    int likes;
    String wished;
    int grpbuy_order_count;
    List<PackageItem> package_item_list;
}
