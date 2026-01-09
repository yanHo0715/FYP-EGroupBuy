package com.egroupbuy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private int review_id;
    private String review_subject;
    private String review_content;
    private int score;
    private int poster_id;
    private String poster_username;
    private int product_id;
    private String product_title;
    private int package_id;
    private String package_name;
    private int seller_id;
    private String seller_username;
    private Timestamp post_date;
    private String status;
    private String poster_icon;
    private ReviewOverallScore review_overall_score;
}
