package com.egroupbuy.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PackageItem {
    int package_item_id;
    int product_item_id;
    String item_name;
    int package_grp_id;
    int package_id;
    String status;
    int popularity;
    int likes;
    String package_item_image;
    ProductItem productItem;
}
