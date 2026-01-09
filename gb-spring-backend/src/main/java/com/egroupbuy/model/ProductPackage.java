package com.egroupbuy.model;

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductPackage {
    int product_id;
    String title;
    Timestamp creation_date;
    String sell_style;
    String description;
    String image_urls;
    int brand_id;
    String material;
    Timestamp delivery_date;
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
    String sell_type;
    int pkg_grp_id;
    String pkg_grp_name;
    Date pkg_creation_date;
    int pkg_quantity;
    int pkg_product_id;
    String pkg_product_title;
    String pkg_status;
    String pkg_grp_image;
    Timestamp pkg_grpbuy_start;
    Timestamp pkg_grpbuy_end;
    int pkg_grpbuy_duration;
    String pkg_grpbuy_duration_type;
    int pkg_min_threshold;
    String wished;
    int package_count;
    ReviewOverallScore review_overall_score;
}
