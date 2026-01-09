import {OrderDetail} from './order-detail';

export interface UserDashboard {
  // profit?: number;
  // users?: number;
  // newRegisterUsers?: number;
  newSellOrders?: number;
  salesVolume?: number;
  newBuyOrders?: number;
  expense?: number;

  totalGrgbuyEvents?: number;
  totalSuccessEvents?: number;

  usersBuy?: number;
  usersSell?: number;
  biWeeklySalesVolume?: any[];
  monthlySalesVolume?: any[];
  orderItemStatusList?: any[];
  bestSellProductList?: any[];
  latestOrderItemList?: OrderDetail[];

  bestSeller?: any[];
  //orderStatus?: any[];
  revenue?: number;
  profit?: number;
  sellers?: number;
  customers?: number;
  weeklyRevenue?: any[];

}
