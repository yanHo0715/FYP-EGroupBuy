package com.egroupbuy.model;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Refund {
    private int refund_id;
    private int order_id;
    private int order_details_id;
    private int seller_id;
    private String reason;
    private String bank_number;
    private String bank_name;
    private double refund_amount;
    private String progress_status;
    private int requester_id;
    private Timestamp request_date;
    private Timestamp approval_date;
    private OrderDetail orderDetail;
    private String seller_username;
    private String requester_username;
    private int product_id;
    private int package_id;
    private String sell_type;
    private Timestamp grpbuy_end;
    private int refund_qty;
    private double org_amount;
    private int org_qty;
    private double unit_price;
    private String refund_type;
}
