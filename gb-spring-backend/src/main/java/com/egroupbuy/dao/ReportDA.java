package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.dto.*;
import com.egroupbuy.model.OrderDetail;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service

public class ReportDA {
    PreparedStatement pst;
    ResultSet rs;

    public AdminDashboard getAdminDashboard() {
        AdminDashboard a = new AdminDashboard();

        List<DailySalesVolume> dsvList;
        DailySalesVolume dsv;

        List<MonthlySalesVolume> msvList;
        MonthlySalesVolume msv;

        List<HashMap<String, String>> itemStatusList;
        HashMap<String, String> iStatus;

        List<BestSellProduct> bspList;
        BestSellProduct bsp;

        try {
            // getting total revenue, total profit
/*            pst = db.get().prepareStatement("SELECT SUM(revenue), SUM(platform_profit) FROM revenue_profit");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setRevenue(rs.getDouble(1));
                a.setProfit(rs.getDouble(2));
            }
            rs.close();
            pst.close();*/

            /*// total sellers
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM sellers");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setSellers(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total customer
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM customers");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setCustomers(rs.getInt(1));
            }
            rs.close();
            pst.close();*/

            // total users
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM user");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setUsers(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total new register users within last three 7 days
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM user WHERE DATE(creation_date) > DATE_SUB(CURDATE(), INTERVAL 7 DAY)");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewRegisterUsers(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total new orders within 24 hours
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM orders WHERE DATE(order_date) > DATE_SUB(CURDATE(), INTERVAL 1 DAY)");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewOrders(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total success group buying events within 30 days
            pst = db.get().prepareStatement("SELECT COUNT(*) as total_event, SUM(IF(grpbuy_result='Success', 1, 0)) as success_event FROM grpbuy_event WHERE DATE(grpbuy_end) > DATE_SUB(CURDATE(), INTERVAL 30 DAY)");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setTotalGrgbuyEvents(rs.getInt(1));
                a.setTotalSuccessEvents(rs.getInt(2));
            }
            rs.close();
            pst.close();


            // retrieve the sales volume in last 7 days
            pst = db.get().prepareStatement(
                    "SELECT dl.rpt_date, SUM(IF(d.sell_type='S', d.sub_total, 0)) as s_total_amt, SUM(IF(d.sell_type='G', d.sub_total, 0)) as g_total_amt, SUM(IF(d.sell_type='P', d.sub_total, 0)) as p_total_amt " +
                            "FROM " +
                            "((SELECT CURDATE() AS rpt_date " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY)) dl " +
                            "    LEFT JOIN orders o ON dl.rpt_date = DATE(o.order_date)  " +
                            "    LEFT JOIN order_details d on o.order_id = d.order_id) " +
                            "GROUP BY rpt_date");

            rs = pst.executeQuery();
            dsvList = new ArrayList<>();

            while (rs.next()) {
                dsv = new DailySalesVolume();
                dsv.setRpt_date(rs.getString(1));
                dsv.setS_total_amt(rs.getDouble(2));
                dsv.setG_total_amt(rs.getDouble(3));
                dsv.setP_total_amt(rs.getDouble(4));

                dsvList.add(dsv);
            }

            a.setWeeklySalesVolume(dsvList);

            rs.close();
            pst.close();


            // retrieve the sales volume in last 12 months
            pst = db.get().prepareStatement(
                    "SELECT dl.first_date, dl.last_date, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'S', IFNULL(d.quantity,0) , 0)) as s_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'G', IFNULL(d.quantity,0) , 0)) as g_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'P', IFNULL(d.quantity,0) , 0)) as p_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'S', IFNULL(d.sub_total,0) , 0)) as s_total_amt, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'G', IFNULL(d.sub_total,0) , 0)) as g_total_amt, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'P', IFNULL(d.sub_total,0) , 0)) as p_total_amt " +
                            "FROM " +
                            "(select last_day(curdate() - interval 1 month) + interval 1 day AS first_date, last_day(curdate()) AS last_date " +
                            "   UNION select last_day(curdate() - interval 2 month) + interval 1 day, last_day(curdate() - interval 1 month) " +
                            "   UNION select last_day(curdate() - interval 3 month) + interval 1 day, last_day(curdate() - interval 2 month) " +
                            "   UNION select last_day(curdate() - interval 4 month) + interval 1 day, last_day(curdate() - interval 3 month) " +
                            "   UNION select last_day(curdate() - interval 5 month) + interval 1 day, last_day(curdate() - interval 4 month) " +
                            "   UNION select last_day(curdate() - interval 6 month) + interval 1 day, last_day(curdate() - interval 5 month) " +
                            "   UNION select last_day(curdate() - interval 7 month) + interval 1 day, last_day(curdate() - interval 6 month) " +
                            "   UNION select last_day(curdate() - interval 8 month) + interval 1 day, last_day(curdate() - interval 7 month) " +
                            "   UNION select last_day(curdate() - interval 9 month) + interval 1 day, last_day(curdate() - interval 8 month) " +
                            "   UNION select last_day(curdate() - interval 10 month) + interval 1 day, last_day(curdate() - interval 9 month) " +
                            "   UNION select last_day(curdate() - interval 11 month) + interval 1 day, last_day(curdate() - interval 10 month) " +
                            "   UNION select last_day(curdate() - interval 12 month) + interval 1 day, last_day(curdate() - interval 11 month)) dl " +
                            "LEFT JOIN orders o ON DATE(o.order_date) BETWEEN dl.first_date AND dl.last_date " +
                            "LEFT JOIN order_details d on o.order_id = d.order_id " +
                            "GROUP BY first_date, last_date");

            rs = pst.executeQuery();
            msvList = new ArrayList<>();

            while (rs.next()) {
                msv = new MonthlySalesVolume();
                msv.setRpt_start_date(rs.getString(1));
                msv.setRpt_end_date(rs.getString(2));
                msv.setS_total_qty(rs.getDouble(3));
                msv.setG_total_qty(rs.getDouble(4));
                msv.setP_total_qty(rs.getDouble(5));
                msv.setS_total_amt(rs.getDouble(6));
                msv.setG_total_amt(rs.getDouble(7));
                msv.setP_total_amt(rs.getDouble(8));

                msvList.add(msv);
            }

            a.setMonthlySalesVolume(msvList);

            rs.close();
            pst.close();

            // retrieve the status of the order items within last 30 days
            pst = db.get().prepareStatement(
                    "SELECT d.status, COUNT(d.order_details_id) as no_of_items " +
                            "FROM order_details d " +
                            "JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 31 " +
                            "GROUP BY status ORDER BY status");

            rs = pst.executeQuery();
            itemStatusList = new ArrayList<>();
            while (rs.next()) {
                iStatus = new HashMap<>();
                iStatus.put("status", rs.getString(1));
                iStatus.put("no_of_items", rs.getString(2));
                itemStatusList.add(iStatus);
            }
            a.setOrderItemStatusList(itemStatusList);
            rs.close();
            pst.close();


            // retrieve the top selling 100 items within last 45 days
            pst = db.get().prepareStatement(
                    "SELECT t.p_id as p_id, MAX(t.p_name) as p_name, t.sell_type as sell_type, SUM(IFNULL(t.quantity,0)) as total_quantity, SUM(IFNULL(t.sub_total,0)) as total_amount, MAX(IFNULL(t.product_unit_price,0)) as unit_price , MAX(t.product_image_url) as p_image " +
                            "FROM " +
                            "(SELECT d.product_id as p_id, d.product_title as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url " +
                            "   FROM order_details d " +
                            "   JOIN orders o ON d.order_id = o.order_id " +
                            "   WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'S' " +
                            "UNION ALL " +
                            "   SELECT d.product_id as p_id, d.product_title as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url" +
                            "       FROM order_details d " +
                            "       JOIN orders o ON d.order_id = o.order_id " +
                            "       WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'G' " +
                            "UNION ALL " +
                            "   SELECT d.package_grp_id as p_id, d.package_grp_name as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url " +
                            "       FROM order_details d " +
                            "       JOIN orders o ON d.order_id = o.order_id " +
                            "       WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'P' " +
                            ") t " +
                            "GROUP BY p_id, sell_type " +
                            "ORDER BY total_quantity DESC LIMIT 100 " );

            rs = pst.executeQuery();
            bspList = new ArrayList<>();

            while (rs.next()) {
                bsp = new BestSellProduct();
                bsp.setProd_id(rs.getInt(1));
                bsp.setProd_name(rs.getString(2));
                bsp.setSell_type(rs.getString(3));
                bsp.setTotal_qty(rs.getInt(4));
                bsp.setTotal_amt(rs.getDouble(5));
                bsp.setUnit_price(rs.getDouble(6));
                bsp.setProd_image(rs.getString(7));
                bspList.add(bsp);
            }
            a.setBestSellProductList(bspList);
            rs.close();
            pst.close();



            // getting weekly revenue
/*            pst = db.get().prepareStatement(
                    "SELECT DATE_FORMAT(date_list.date, '%a') AS day_name, COALESCE(SUM(revenue), 0) AS total_revenue\r\n"
                            + "FROM (\r\n" + "    SELECT CURDATE() AS date\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY)\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY)\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY)\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY)\r\n"
                            + "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY)\r\n" + ") date_list\r\n"
                            + "LEFT JOIN revenue_profit ON date_list.date = revenue_profit.order_date\r\n"
                            + "GROUP BY date_list.date\r\n" + "ORDER BY date_list.date;");
            rs = pst.executeQuery();
            tList = new ArrayList<>();
            while (rs.next()) {
                t = new HashMap<>();
                t.put("dayName", rs.getString(1));
                t.put("revenue", rs.getString(2));
                tList.add(t);
            }
            a.setWeeklyRevenue(tList);
            rs.close();
            pst.close();*/

/*            // getting the best seller
            pst = db.get().prepareStatement(
                    "SELECT username, SUM(revenue) FROM revenue_profit r JOIN user u ON r.seller_id = u.user_id GROUP BY username ORDER BY SUM(revenue) DESC");
            rs = pst.executeQuery();
            tList = new ArrayList<>();
            while (rs.next()) {
                t = new HashMap<>();
                t.put("username", rs.getString(1));
                t.put("revenue", rs.getString(2));
                tList.add(t);
            }
            a.setBestSeller(tList);
            rs.close();
            pst.close();

            // getting order status
            pst = db.get().prepareStatement(
                    "SELECT od.status, COUNT(od.status) FROM order_details AS od JOIN orders USING(order_id) WHERE order_date > DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY od.status");
            rs = pst.executeQuery();
            tList = new ArrayList<>();
            while (rs.next()) {
                t = new HashMap<>();
                t.put("status", rs.getString(1));
                t.put("count", rs.getString(2));
                tList.add(t);
            }
            a.setOrderStatus(tList);
            rs.close();
            pst.close();*/

        } catch (Exception e) {
            System.out.println(e);
        }
        return a;
    }

    public UserDashboard getUserDashboard(int uid) {
        UserDashboard a = new UserDashboard();

        List<DailySalesVolume> dsvList;
        DailySalesVolume dsv;

        List<MonthlySalesVolume> msvList;
        MonthlySalesVolume msv;

        List<HashMap<String, String>> itemStatusList;
        HashMap<String, String> iStatus;

        List<BestSellProduct> bspList;
        BestSellProduct bsp;

        List<OrderDetail> latestOrderItemList;
        OrderDetail loi;

        try {

/*            // total users
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM user");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setUsers(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total new register users within last three 7 days
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM user WHERE DATE(creation_date) > DATE_SUB(CURDATE(), INTERVAL 7 DAY)");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewRegisterUsers(rs.getInt(1));
            }
            rs.close();
            pst.close();*/

            // total new orders within 30 days
            pst = db.get().prepareStatement(
                    "SELECT count(DISTINCT d.order_id) " +
                        "   FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                        "   WHERE d.seller_id = ? AND DATE(o.order_date) > DATE_SUB(CURDATE(), INTERVAL 30 DAY) " +
                        "   GROUP BY d.seller_id ");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewBuyOrders(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // total new orders sales income within 30 days of the seller
            pst = db.get().prepareStatement(
                    "SELECT SUM(IFNULL(d.sub_total,0)) as total " +
                            "FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE d.seller_id = ? AND DATE(o.order_date) > DATE_SUB(CURDATE(), INTERVAL 30 DAY) " +
                            "GROUP BY d.seller_id ");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setSalesVolume(rs.getDouble(1));
            }
            rs.close();
            pst.close();

            // total new buy orders and expense within 30 days of the seller
            pst = db.get().prepareStatement(
                    "SELECT COUNT(o.order_id), SUM(IFNULL(o.order_total,0))" +
                            "FROM orders o " +
                            "WHERE DATE(o.order_date) > DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND buyer_id = ? ");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewSellOrders(rs.getInt(1));
                a.setExpense(rs.getDouble(2));
            }
            rs.close();
            pst.close();


            // total success group buying events within 30 days
            pst = db.get().prepareStatement("SELECT COUNT(*) as total_event, SUM(IF(grpbuy_result='Success', 1, 0)) as success_event FROM grpbuy_event WHERE DATE(grpbuy_end) > DATE_SUB(CURDATE(), INTERVAL 30 DAY)");
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setTotalGrgbuyEvents(rs.getInt(1));
                a.setTotalSuccessEvents(rs.getInt(2));
            }
            rs.close();
            pst.close();


            // retrieve the sales volume in last 14 days of the seller
            pst = db.get().prepareStatement(
                    "SELECT dl.rpt_date, SUM(IF(d.sell_type='S', d.sub_total, 0)) as s_total_amt, SUM(IF(d.sell_type='G', d.sub_total, 0)) as g_total_amt, SUM(IF(d.sell_type='P', d.sub_total, 0)) as p_total_amt " +
                            "FROM " +
                            "((SELECT CURDATE() AS rpt_date " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 7 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 8 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 9 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 10 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 11 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 12 DAY) " +
                            "    UNION SELECT DATE_SUB(CURDATE(), INTERVAL 13 DAY) " +
                            "    ) dl " +
                            "    LEFT JOIN orders o ON dl.rpt_date = DATE(o.order_date) " +
                            "    LEFT JOIN order_details d on o.order_id = d.order_id AND d.seller_id = ? ) " +
                            "    GROUP BY rpt_date");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            dsvList = new ArrayList<>();

            while (rs.next()) {
                dsv = new DailySalesVolume();
                dsv.setRpt_date(rs.getString(1));
                dsv.setS_total_amt(rs.getDouble(2));
                dsv.setG_total_amt(rs.getDouble(3));
                dsv.setP_total_amt(rs.getDouble(4));

                dsvList.add(dsv);
            }

            a.setBiWeeklySalesVolume(dsvList);

            rs.close();
            pst.close();


            // retrieve the sales volume in last 12 months of the seller
            pst = db.get().prepareStatement(
                    "SELECT dl.first_date, dl.last_date, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'S', IFNULL(d.quantity,0) , 0)) as s_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'G', IFNULL(d.quantity,0) , 0)) as g_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'P', IFNULL(d.quantity,0) , 0)) as p_total_qty, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'S', IFNULL(d.sub_total,0) , 0)) as s_total_amt, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'G', IFNULL(d.sub_total,0) , 0)) as g_total_amt, " +
                            "SUM(IF(YEAR(dl.first_date) = YEAR(o.order_date) && MONTH(dl.first_date) = MONTH(o.order_date) && d.sell_type = 'P', IFNULL(d.sub_total,0) , 0)) as p_total_amt " +
                            "FROM " +
                            "(select last_day(curdate() - interval 1 month) + interval 1 day AS first_date, last_day(curdate()) AS last_date " +
                            "   UNION select last_day(curdate() - interval 2 month) + interval 1 day, last_day(curdate() - interval 1 month) " +
                            "   UNION select last_day(curdate() - interval 3 month) + interval 1 day, last_day(curdate() - interval 2 month) " +
                            "   UNION select last_day(curdate() - interval 4 month) + interval 1 day, last_day(curdate() - interval 3 month) " +
                            "   UNION select last_day(curdate() - interval 5 month) + interval 1 day, last_day(curdate() - interval 4 month) " +
                            "   UNION select last_day(curdate() - interval 6 month) + interval 1 day, last_day(curdate() - interval 5 month) " +
                            "   UNION select last_day(curdate() - interval 7 month) + interval 1 day, last_day(curdate() - interval 6 month) " +
                            "   UNION select last_day(curdate() - interval 8 month) + interval 1 day, last_day(curdate() - interval 7 month) " +
                            "   UNION select last_day(curdate() - interval 9 month) + interval 1 day, last_day(curdate() - interval 8 month) " +
                            "   UNION select last_day(curdate() - interval 10 month) + interval 1 day, last_day(curdate() - interval 9 month) " +
                            "   UNION select last_day(curdate() - interval 11 month) + interval 1 day, last_day(curdate() - interval 10 month) " +
                            "   UNION select last_day(curdate() - interval 12 month) + interval 1 day, last_day(curdate() - interval 11 month)) dl " +
                            "LEFT JOIN orders o ON DATE(o.order_date) BETWEEN dl.first_date AND dl.last_date " +
                            "LEFT JOIN order_details d on o.order_id = d.order_id AND d.seller_id = ? " +
                            "GROUP BY first_date, last_date");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            msvList = new ArrayList<>();

            while (rs.next()) {
                msv = new MonthlySalesVolume();
                msv.setRpt_start_date(rs.getString(1));
                msv.setRpt_end_date(rs.getString(2));
                msv.setS_total_qty(rs.getDouble(3));
                msv.setG_total_qty(rs.getDouble(4));
                msv.setP_total_qty(rs.getDouble(5));
                msv.setS_total_amt(rs.getDouble(6));
                msv.setG_total_amt(rs.getDouble(7));
                msv.setP_total_amt(rs.getDouble(8));

                msvList.add(msv);
            }

            a.setMonthlySalesVolume(msvList);

            rs.close();
            pst.close();

            // retrieve the status of the sell order items within last 30 days of the seller
            pst = db.get().prepareStatement(
                    "SELECT d.status, COUNT(d.order_details_id) as no_of_items " +
                            "FROM order_details d " +
                            "JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 31  AND d.seller_id = ? " +
                            "GROUP BY status ORDER BY status");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            itemStatusList = new ArrayList<>();

            while (rs.next()) {
                iStatus = new HashMap<>();
                iStatus.put("status", rs.getString(1));
                iStatus.put("no_of_items", rs.getString(2));
                itemStatusList.add(iStatus);
            }
            a.setOrderItemStatusList(itemStatusList);
            rs.close();
            pst.close();


            // retrieve the latest selling 100 items within 45 days of the seller
/*            pst = db.get().prepareStatement(
                    "SELECT t.p_id as p_id, MAX(t.p_name) as p_name, t.sell_type as sell_type, SUM(IFNULL(t.quantity,0)) as total_quantity, SUM(IFNULL(t.sub_total,0)) as total_amount, MAX(IFNULL(t.product_unit_price,0)) as unit_price , MAX(t.product_image_url) as p_image " +
                            "FROM " +
                            "(SELECT d.product_id as p_id, d.product_title as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url " +
                            "   FROM order_details d " +
                            "   JOIN orders o ON d.order_id = o.order_id " +
                            "   WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'S' AND d.seller_id = 8 " +
                            "UNION ALL " +
                            "   SELECT d.product_id as p_id, d.product_title as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url" +
                            "       FROM order_details d " +
                            "       JOIN orders o ON d.order_id = o.order_id " +
                            "       WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'G' AND d.seller_id = 8 " +
                            "UNION ALL " +
                            "   SELECT d.package_grp_id as p_id, d.package_grp_name as p_name, d.sell_type, d.quantity, d.sub_total, d.product_unit_price, d.product_image_url " +
                            "       FROM order_details d " +
                            "       JOIN orders o ON d.order_id = o.order_id " +
                            "       WHERE DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 AND d.sell_type = 'P' AND d.seller_id = 8 " +
                            ") t " +
                            "GROUP BY p_id, sell_type " +
                            "ORDER BY total_quantity DESC LIMIT 100 " );*/


            pst = db.get().prepareStatement(
                    "SELECT  o.order_id, o.order_date, d.order_details_id, d.product_id, d.product_title, d.product_image_url, d.package_id, d.package_name, " +
                            "   d.package_grp_id, d.package_grp_name, d.quantity, d.sub_total, d.product_unit_price, d.status, d.sell_type " +
                            "FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE d.seller_id = ? AND DATEDIFF(CURDATE(), DATE(o.order_date)) <= 46 " +
                            "ORDER BY o.order_date DESC, d.order_id, d.order_details_id " +
                            "LIMIT 100");

            pst.setInt(1, uid);
            rs = pst.executeQuery();
            latestOrderItemList = new ArrayList<>();

            while (rs.next()) {
                loi = new OrderDetail();
                loi.setOrder_id(rs.getInt(1));
                loi.setOrder_date(rs.getTimestamp(2));
                loi.setOrder_details_id(rs.getInt(3));
                loi.setProduct_id(rs.getInt(4));
                loi.setProduct_title(rs.getString(5));
                loi.setProduct_image_url(rs.getString(6));
                loi.setPackage_id(rs.getInt(7));
                loi.setPackage_name(rs.getString(8));
                loi.setPackage_grp_id(rs.getInt(9));
                loi.setPackage_grp_name(rs.getString(10));
                loi.setQuantity(rs.getInt(11));
                loi.setSub_total(rs.getDouble(12));
                loi.setProduct_unit_price(rs.getDouble(13));
                loi.setStatus(rs.getString(14));
                loi.setSell_type(rs.getString(15));

                latestOrderItemList.add(loi);
            }
            a.setLatestOrderItemList(latestOrderItemList);
            rs.close();
            pst.close();


        } catch (Exception e) {
            System.out.println(e);
        }
        return a;
    }


    /*public SellerStat getSellerStat(int sellerId) {
        SellerStat a = new SellerStat();

        try {
            // total order
            pst = db.get().prepareStatement("SELECT COUNT(*) FROM order_details WHERE seller_id = ?");
            pst.setInt(1, sellerId);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setTotalOrder(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // new order
            pst = db.get()
                    .prepareStatement("SELECT COUNT(*) FROM order_details WHERE seller_id = ? AND status = 'Pending'");
            pst.setInt(1, sellerId);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setNewOrder(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // processing
            pst = db.get().prepareStatement(
                    "SELECT COUNT(*) FROM order_details WHERE seller_id = ? AND status IN('Processing', 'Shipped')");
            pst.setInt(1, sellerId);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setProcessing(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // sold items
            pst = db.get().prepareStatement(
                    "SELECT COUNT(*) FROM order_details WHERE seller_id = ? AND status = 'Delivered'");
            pst.setInt(1, sellerId);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setSoldItems(rs.getInt(1));
            }
            rs.close();
            pst.close();

            // getting total revenue, total profit
            pst = db.get().prepareStatement(
                    "SELECT SUM(revenue), SUM(seller_profit) FROM revenue_profit WHERE seller_id = ?");
            pst.setInt(1, sellerId);
            rs = pst.executeQuery();
            while (rs.next()) {
                a.setRevenue(rs.getDouble(1));
                a.setProfit(rs.getDouble(2));
            }
            rs.close();
            pst.close();

        } catch (Exception e) {
            System.out.println(e);
        }
        return a;
    }*/

    /*public List<SalesReportDto> getSellerSalesReport(int sellerId, String startDate, String endDate) {
        List<SalesReportDto> l = new ArrayList<>();
        SalesReportDto a;
        try {
            pst = db.get().prepareStatement(
                    "SELECT order_date, COUNT(*), SUM(revenue), SUM(revenue)-SUM(seller_profit), SUM(seller_profit) FROM revenue_profit WHERE seller_id = ? AND order_date BETWEEN ? AND ? GROUP BY order_date ORDER BY order_date");
            pst.setInt(1, sellerId);
            pst.setString(2, startDate);
            pst.setString(3, endDate);
            rs = pst.executeQuery();
            while (rs.next()) {
                a = new SalesReportDto();
                a.setDate(rs.getString(1));
                a.setItems(rs.getInt(2));
                a.setRevenue(rs.getDouble(3));
                a.setCosts(rs.getDouble(4));
                a.setProfit(rs.getDouble(5));
                l.add(a);
            }
            rs.close();
            pst.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return l;
    }*/

    public List<SalesReport> getAdminSalesReport(String startDate, String endDate) {
        List<SalesReport> srList = new ArrayList<>();
        SalesReport sr;
        try {
            pst = db.get().prepareStatement(
                    "SELECT DATE(o.order_date) as gorder_date, COUNT(DISTINCT o.order_id) as no_of_orders, COUNT(d.order_details_id) as no_of_items, SUM(d.sub_total) as sales_volume, " +
                        "   SUM(IF(d.sell_type='S', 1, 0)) as single_product_order_count, SUM(IF(d.sell_type='G', 1, 0)) as single_grbuy_order_count, SUM(IF(d.sell_type='P', 1, 0)) as package_grpbuy_order_count, " +
                        "   SUM(IF(d.sell_type='S', d.quantity, 0)) as single_product_qty_count, SUM(IF(d.sell_type='G', d.quantity, 0)) as single_grpbuy_qty_count, SUM(IF(d.sell_type='P', d.quantity, 0)) as package_grpbuy_qty_count, " +
                        "   SUM(IF(d.sell_type='S', d.sub_total, 0)) as single_product_sub_total, SUM(IF(d.sell_type='G', d.sub_total, 0)) as single_grpbuy_sub_total, SUM(IF(d.sell_type='P', d.sub_total, 0)) as package_grpbuy_sub_total " +
                        "FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                        "WHERE DATE(o.order_date) BETWEEN ? AND ? GROUP BY gorder_date ORDER BY gorder_date DESC"
            );


            pst.setString(1, startDate);
            pst.setString(2, endDate);

            rs = pst.executeQuery();
            while (rs.next()) {
                sr = new SalesReport();

                sr.setDate(rs.getString(1));
                sr.setNo_of_orders(rs.getInt(2));
                sr.setNo_of_items(rs.getInt(3));
                sr.setSales_volume(rs.getDouble(4));
                sr.setSingle_product_order_count(rs.getInt(5));
                sr.setSingle_grpbuy_order_count(rs.getInt(6));
                sr.setPackage_grpbuy_order_count(rs.getInt(7));
                sr.setSingle_product_qty_count(rs.getInt(8));
                sr.setSingle_grpbuy_qty_count(rs.getInt(9));
                sr.setPackage_grpbuy_qty_count(rs.getInt(10));
                sr.setSingle_product_sub_total(rs.getDouble(11));
                sr.setSingle_grpbuy_sub_total(rs.getDouble(12));
                sr.setPackage_grpbuy_sub_total(rs.getDouble(13));
                srList.add(sr);
            }
            rs.close();
            pst.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return srList;
    }

    public List<SalesReport> getUserSalesReport(int uid, String startDate, String endDate) {
        List<SalesReport> srList = new ArrayList<>();
        SalesReport sr;
        try {
            pst = db.get().prepareStatement(
                    "SELECT DATE(o.order_date) as gorder_date, COUNT(DISTINCT o.order_id) as no_of_orders, COUNT(d.order_details_id) as no_of_items, SUM(d.sub_total) as sales_volume, " +
                            "   SUM(IF(d.sell_type='S', 1, 0)) as single_product_order_count, SUM(IF(d.sell_type='G', 1, 0)) as single_grbuy_order_count, SUM(IF(d.sell_type='P', 1, 0)) as package_grpbuy_order_count, " +
                            "   SUM(IF(d.sell_type='S', d.quantity, 0)) as single_product_qty_count, SUM(IF(d.sell_type='G', d.quantity, 0)) as single_grpbuy_qty_count, SUM(IF(d.sell_type='P', d.quantity, 0)) as package_grpbuy_qty_count, " +
                            "   SUM(IF(d.sell_type='S', d.sub_total, 0)) as single_product_sub_total, SUM(IF(d.sell_type='G', d.sub_total, 0)) as single_grpbuy_sub_total, SUM(IF(d.sell_type='P', d.sub_total, 0)) as package_grpbuy_sub_total " +
                            "FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE d.seller_id = ? AND DATE(o.order_date) BETWEEN ? AND ? GROUP BY gorder_date ORDER BY gorder_date DESC"
            );

            pst.setInt(1, uid);
            pst.setString(2, startDate);
            pst.setString(3, endDate);

            rs = pst.executeQuery();
            while (rs.next()) {
                sr = new SalesReport();

                sr.setDate(rs.getString(1));
                sr.setNo_of_orders(rs.getInt(2));
                sr.setNo_of_items(rs.getInt(3));
                sr.setSales_volume(rs.getDouble(4));
                sr.setSingle_product_order_count(rs.getInt(5));
                sr.setSingle_grpbuy_order_count(rs.getInt(6));
                sr.setPackage_grpbuy_order_count(rs.getInt(7));
                sr.setSingle_product_qty_count(rs.getInt(8));
                sr.setSingle_grpbuy_qty_count(rs.getInt(9));
                sr.setPackage_grpbuy_qty_count(rs.getInt(10));
                sr.setSingle_product_sub_total(rs.getDouble(11));
                sr.setSingle_grpbuy_sub_total(rs.getDouble(12));
                sr.setPackage_grpbuy_sub_total(rs.getDouble(13));
                srList.add(sr);
            }
            rs.close();
            pst.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return srList;
    }

}
