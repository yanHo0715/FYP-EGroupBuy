package com.egroupbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class WithdrawalAdmin {
    private int withdrawal_id;
    private int user_id;
    private String username;
    private String email;
    private String holder_name;
    private String account_number;
    private String bank_name;
    private String branch_name;
    private Timestamp request_date;
    private double amount;
    private Timestamp approval_date;
    private Timestamp payment_date;
    private String status;
}
