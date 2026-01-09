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
public class PackageGroup {
    int package_grp_id;
    String package_grp_name;
    Timestamp creation_date;
    int quantity;
    int product_id;
    String product_title;
    String status;
    String package_grp_image;
    Timestamp grpbuy_start;
    Timestamp grpbuy_end;
    int grpbuy_duration;
    String grpbuy_duration_type;
    int min_threshold;
    String wished;
    int package_count;
    Product product;
    List<Package> package_list;
}
