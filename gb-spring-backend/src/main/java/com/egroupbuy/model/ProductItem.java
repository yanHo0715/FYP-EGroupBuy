package com.egroupbuy.model;

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductItem {
    int product_item_id;
    String item_name;
    Timestamp creation_date;
    double regular_price;
    double sale_price;
    int quantity;
    String description;
    int popularity;
    String status;
    int product_id;
    String product_title;
    String item_image;
    int item_seq;
    String action;
}
