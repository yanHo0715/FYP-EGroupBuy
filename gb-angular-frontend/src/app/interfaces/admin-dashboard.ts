export interface AdminDashboard {
  salesVolume?: number;
  // profit?: number;
  users?: number;
  newRegisterUsers?: number;
  newOrders?: number;
  totalGrgbuyEvents?: number;
  totalSuccessEvents?: number;

  usersBuy?: number;
  usersSell?: number;
  weeklySalesVolume?: any[];
  monthlySalesVolume?: any[];
  orderItemStatusList?: any[];
  bestSellProductList?: any[];

  bestSeller?: any[];
  //orderStatus?: any[];
  revenue?: number;
  profit?: number;
  sellers?: number;
  customers?: number;
  weeklyRevenue?: any[];

}
