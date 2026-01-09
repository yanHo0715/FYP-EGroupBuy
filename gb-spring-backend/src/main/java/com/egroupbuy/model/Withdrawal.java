package com.egroupbuy.model;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Withdrawal {
    private int withdrawal_id;
    private int user_id;
    private Timestamp request_date;
    private double amount;
    private Timestamp approval_date;
    private Timestamp payment_date;
    private String status;
}
