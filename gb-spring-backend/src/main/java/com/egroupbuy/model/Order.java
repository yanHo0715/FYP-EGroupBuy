package com.egroupbuy.model;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    int order_id;
    Timestamp order_date;
    double sub_total;
    double shipping_fee;
    double tax;
    double order_total;
    String shipping_firstname;
    String shipping_lastname;
    String shipping_email;
    String shipping_phone;
    String shipping_address;
    String shipping_country;
    String shipping_post_code;
    String payment_status;
    String payment_method;
    String progress_status;
    int buyer_id;
    String buyer_username;
    String buyer_email;
    String buyer_firstname;
    String buyer_lastname;
    String buyer_phone;
    String buyer_address;
    String buyer_country;
    String buyer_post_code;
    int seller_id;
    String seller_username;
    int product_id;
    String product_title;
    int package_id;
    String package_name;
    int quantity;
    String shipping_method;
    double gateway_fee;
    String card_holder_name;
    String card_number;
    String card_expiry_date;
    String card_cvv;
    List<OrderDetail> order_detail_list;
}
