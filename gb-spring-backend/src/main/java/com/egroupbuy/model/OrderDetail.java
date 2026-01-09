package com.egroupbuy.model;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDetail {
    int order_details_id;
    int order_id;
    int product_id;
    int seller_id;
    String seller_username;
    String product_title;
    double product_unit_price;
    String product_image_url;
    String status;
    int quantity;
    double sub_total;
    Timestamp delivery_date;
    String sell_type;
    int package_grp_id;
    String package_grp_name;
    int package_id;
    String package_name;
    Timestamp grpbuy_end;
    int grpbuy_allocate_qty;
    String grpbuy_result;
    String shipping_method;
    Timestamp order_date;
    List<PackageItem> package_item_list;
}
