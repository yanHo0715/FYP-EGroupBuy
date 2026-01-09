package com.egroupbuy.model;

import lombok.*;

import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GroupBuyEvent {
    private int grpbuy_event_id;
    private Timestamp grpbuy_start;
    private Timestamp grpbuy_end;
    private String sell_type;
    private int product_id;
    private int package_grp_id;
    private int min_threshold;
    private int success_sold_qty;
    private String grpbuy_result;
    private Timestamp event_end_process;
    private String remark;
    private int seller_id;
}
