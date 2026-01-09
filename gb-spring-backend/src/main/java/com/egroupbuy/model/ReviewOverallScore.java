package com.egroupbuy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewOverallScore {
    private int total_review_count;
    private int total_review_score;
    private int total_score5_count;
    private int total_score4_count;
    private int total_score3_count;
    private int total_score2_count;
    private int total_score1_count;
}
