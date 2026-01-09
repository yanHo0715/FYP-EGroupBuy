package com.egroupbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DailySalesVolume {
    private String rpt_date;
    private double s_total_amt;
    private double g_total_amt;
    private double p_total_amt;
}
