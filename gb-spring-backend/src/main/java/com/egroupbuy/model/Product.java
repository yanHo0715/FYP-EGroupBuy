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
public class Product {
    int product_id;
    String title;
    Timestamp creation_date;
    String sell_style;
    String description;
    String image_urls;
    int brand_id;
    String material;
    Date delivery_date;
    String delivery_method;
    String delivery_region;
    int min_threshold;
    int stock_quantity;
    String stock_status;
    String status;
    double cost;
    int category_id;
    int seller_id;
    String seller_username;
    int likes;
    double regular_price;
    double sale_price;
    int display_position;
    String main_image;
    String brand_name;
    String category_name;
    Timestamp grpbuy_start;
    Timestamp grpbuy_end;
    int grpbuy_quantity;
    double grpbuy_regular_price;
    double grpbuy_sale_price;
    String grpbuy_status;
    int grpbuy_order_count;
    int package_grp_count;
    List<ProductItem> product_item_list;
    ReviewOverallScore review_overall_score;

}
