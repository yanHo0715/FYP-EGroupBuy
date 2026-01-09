package com.egroupbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminDashboard {
    private int users;
    private int newRegisterUsers;
    private int newOrders;
    private int totalGrgbuyEvents;
    private int totalSuccessEvents;
    private List<DailySalesVolume> weeklySalesVolume;
    private List<MonthlySalesVolume> monthlySalesVolume;
    private List<HashMap<String, String>> orderItemStatusList;
    private List<BestSellProduct> bestSellProductList;


    private double salesVolume;
    private double profit;
    private int usersBuy;
    private int usersSell;
//    private List<HashMap<String, String>> weeklySalesVolume;
    private List<HashMap<String, String>> bestSeller;
//    private List<HashMap<String, String>> orderStatus;
    private double revenue;
    private int sellers;
    private int customers;
    private List<HashMap<String, String>> weeklyRevenue;
}
