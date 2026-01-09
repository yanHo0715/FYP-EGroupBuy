package com.egroupbuy.dto;

import com.egroupbuy.model.OrderDetail;
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
public class UserDashboard {
//    private int users;
//    private int newRegisterUsers;
    private int newSellOrders;
    private double salesVolume;
    private int newBuyOrders;
    private double expense;

    private int totalGrgbuyEvents;
    private int totalSuccessEvents;
    private List<DailySalesVolume> biWeeklySalesVolume;
    private List<MonthlySalesVolume> monthlySalesVolume;
    private List<HashMap<String, String>> orderItemStatusList;
    private List<BestSellProduct> bestSellProductList;
    private List<OrderDetail> latestOrderItemList;


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
