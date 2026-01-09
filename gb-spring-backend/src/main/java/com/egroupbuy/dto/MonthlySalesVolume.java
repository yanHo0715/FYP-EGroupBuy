package com.egroupbuy.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MonthlySalesVolume {
    private String rpt_start_date;
    private String rpt_end_date;
    private double s_total_qty;
    private double g_total_qty;
    private double p_total_qty;
    private double s_total_amt;
    private double g_total_amt;
    private double p_total_amt;
}

