package com.egroupbuy.dao;

import com.egroupbuy.dto.UserUpdateStatus;
import com.egroupbuy.model.*;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.egroupbuy.db.db;

import java.util.ArrayList;
import java.util.List;
@Service
public class AdminDA {

    PreparedStatement pst;

/*    @Autowired
    EmailService mailer;*/

    public Admin findByEmail(String email) throws UsernameNotFoundException {
        Admin admin = null;
        try {

            System.out.println("==========> AdminDA findByEmail " );

            System.out.println("==========> SQL [" +  "SELECT admin_id, name, email, role, password, icon FROM admin WHERE email = '" + email +  "']");

            pst = db.get().prepareStatement("SELECT admin_id, name, email, role, password, icon FROM admin WHERE email = ?");
            pst.setString(1, email);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                admin = new Admin();
                admin.setAdmin_id(rs.getInt(1));
                admin.setName(rs.getString(2));
                admin.setEmail(rs.getString(3));
                admin.setRole(Role.valueOf(rs.getString(4)));
                admin.setPassword(rs.getString(5));
                admin.setIcon(rs.getString(6));
            } else {
                throw new UsernameNotFoundException("User not found");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return admin;
    }

    public List<Product> getAllProducts() {
        List<Product> list = new ArrayList<>();
        try {

            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, p.seller_username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image," +
                            "count(g.package_grp_id) as package_grp_count " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "GROUP BY p.product_id ORDER BY p.product_id DESC ");
//                           "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE'");

//            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();

            Product p;

            while (rs.next()) {
                p = new Product();
                p.setProduct_id(rs.getInt(1));
                p.setTitle(rs.getString(2));
                p.setCreation_date(rs.getTimestamp(3));
                p.setSell_style(rs.getString(4));
                p.setDescription(rs.getString(5));
                p.setImage_urls(rs.getString(6));
                p.setBrand_id(rs.getInt(7));
                p.setMaterial(rs.getString(8));
                p.setDelivery_date(rs.getDate(9));
                p.setDelivery_method(rs.getString(10));
                p.setDelivery_region(rs.getString(11));
                p.setMin_threshold(rs.getInt(12));
                p.setStock_quantity(rs.getInt(13));
                p.setStock_status(rs.getString(14));
                p.setStatus(rs.getString(15));
                p.setCost(rs.getDouble(16));
                p.setCategory_id(rs.getInt(17));
                p.setSeller_id(rs.getInt(18));
                p.setSeller_username(rs.getString(19));
                p.setLikes(rs.getInt(20));
                p.setRegular_price(rs.getDouble(21));
                p.setSale_price(rs.getDouble(22));
                p.setDisplay_position(rs.getInt(23));
                p.setMain_image(rs.getString(24));
                p.setPackage_grp_count(rs.getInt(25));

                list.add(p);


/*                pst = db.get().prepareStatement(
//                    "SELECT product_id, title, photo_links, description, regular_price, sale_price, category_id, brand_id, stock_status, stock_quantity, product.status, username FROM product JOIN user ON user.user_id = product.seller_id");
                    "SELECT p.product_id, p.title, p.main_image, p.description, p.regular_price, p.sale_price, p.category_id, p.brand_id, p.stock_status, p.stock_quantity, p.status, " +
                            "u.username, b.brand_name, c.category_name " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id JOIN brand b ON p.brand_id = b.brand_id JOIN category c ON p.category_id = c.category_id ");
            ResultSet rs = pst.executeQuery();
            Product p;
            while (rs.next()) {
                p = new Product();
                p.setProduct_id(rs.getInt(1));
                p.setTitle(rs.getString(2));
                p.setMain_image(rs.getString(3));
                p.setDescription(rs.getString(4));
                p.setRegular_price(rs.getDouble(5));
                p.setSale_price(rs.getDouble(6));
                p.setCategory_id(rs.getInt(7));
                p.setBrand_id(rs.getInt(8));
                p.setStock_status(rs.getString(9));
                p.setStock_quantity(rs.getInt(10));
                p.setStatus(rs.getString(11));
                p.setSeller_username(rs.getString(12));
                p.setBrand_name(rs.getString(13));
                p.setCategory_name(rs.getString(14));
                list.add(p);
            }*/
            }
        } catch (Exception e) {
            System.out.println(e);
        }
//        System.out.println(list);
        return list;
    }

    public List<Product> getSearchAllProducts(String str) {
        List<Product> list = new ArrayList<>();
        try {

            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, p.seller_username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image," +
                            "count(g.package_grp_id) as package_grp_count " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "WHERE p.title LIKE ? " +
                            "GROUP BY p.product_id ORDER BY p.product_id DESC ");
//                           "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE'");

            pst.setString(1, "%" + str + "%");
            ResultSet rs = pst.executeQuery();

            Product p;

            while (rs.next()) {
                p = new Product();
                p.setProduct_id(rs.getInt(1));
                p.setTitle(rs.getString(2));
                p.setCreation_date(rs.getTimestamp(3));
                p.setSell_style(rs.getString(4));
                p.setDescription(rs.getString(5));
                p.setImage_urls(rs.getString(6));
                p.setBrand_id(rs.getInt(7));
                p.setMaterial(rs.getString(8));
                p.setDelivery_date(rs.getDate(9));
                p.setDelivery_method(rs.getString(10));
                p.setDelivery_region(rs.getString(11));
                p.setMin_threshold(rs.getInt(12));
                p.setStock_quantity(rs.getInt(13));
                p.setStock_status(rs.getString(14));
                p.setStatus(rs.getString(15));
                p.setCost(rs.getDouble(16));
                p.setCategory_id(rs.getInt(17));
                p.setSeller_id(rs.getInt(18));
                p.setSeller_username(rs.getString(19));
                p.setLikes(rs.getInt(20));
                p.setRegular_price(rs.getDouble(21));
                p.setSale_price(rs.getDouble(22));
                p.setDisplay_position(rs.getInt(23));
                p.setMain_image(rs.getString(24));
                p.setPackage_grp_count(rs.getInt(25));

                list.add(p);


            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

    public Product updateProduct(Product a) {
        try {
            pst = db.get().prepareStatement("UPDATE product SET status = ? WHERE product_id = ?");
            pst.setString(1, a.getStatus());
            pst.setInt(2, a.getProduct_id());
            int x = pst.executeUpdate();
            if (x != -1) {
                return a;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<User> getAllCustomers() {
        List<User> list = new ArrayList<>();
        try {
            pst = db.get().prepareStatement("SELECT user_id, username, email, balance, status, role, hold_fund FROM user ORDER BY user_id DESC");
            ResultSet rs = pst.executeQuery();
            User a;
            while (rs.next()) {
                a = new User();
                a.setUser_id(rs.getInt("user_id"));
                a.setUsername(rs.getString("username"));
                a.setEmail(rs.getString("email"));
                a.setBalance(rs.getDouble("balance"));
                a.setStatus(rs.getString("status"));
                a.setRole(Role.valueOf(rs.getString("role")));
                a.setHold_fund(rs.getDouble("hold_fund"));
                list.add(a);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

    public UserUpdateStatus updateCustomer(UserUpdateStatus a) {
        try {
            pst = db.get().prepareStatement("UPDATE user SET status = ? WHERE user_id = ?");
            pst.setString(1, a.getStatus());
            pst.setInt(2, a.getUser_id());
            int x = pst.executeUpdate();
          //  if (x != -1) {
            if (x == 1) {
                return a;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<Order> getOrders() {
        try {

            pst = db.get().prepareStatement(
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, " +
                            "payment_status, payment_method, progress_status, buyer_id, gateway_fee FROM orders ORDER BY order_id DESC ");

            ResultSet rs = pst.executeQuery();
            List<Order> o = new ArrayList<>();
            Order a;
            while (rs.next()) {
                a = new Order();
                a.setOrder_id(rs.getInt(1));
                a.setOrder_date(rs.getTimestamp(2));
                a.setSub_total(rs.getDouble(3));
                a.setShipping_fee(rs.getDouble(4));
                a.setTax(rs.getDouble(5));
                a.setOrder_total(rs.getDouble(6));
                a.setShipping_address(rs.getString(7));
                a.setShipping_country(rs.getString(8));
                a.setShipping_post_code(rs.getString(9));
                a.setPayment_status(rs.getString(10));
                a.setPayment_method(rs.getString(11));
                a.setProgress_status(rs.getString(12));
                a.setBuyer_id(rs.getInt(13));
                a.setGateway_fee(rs.getDouble(14));
                o.add(a);
            }
            return o;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public Order getOrder(int orderId) {
        try {
            System.out.println("getting order!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pst = db.get().prepareStatement(
                    //"SELECT order_id, order_date, order_total, customer_id, discount, shipping_charge, tax, shipping_street, shipping_city, shipping_post_code, shipping_state, shipping_country, status, sub_total, payment_status, payment_method, card_number, card_cvv, card_holder_name, card_expiry_date, gateway_fee FROM order WHERE order_id = ?");
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, progress_status, buyer_id, gateway_fee FROM orders WHERE order_id = ?");

            pst.setInt(1, orderId);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                Order a = new Order();
                a.setOrder_id(rs.getInt(1));
                a.setOrder_date(rs.getTimestamp(2));
                a.setSub_total(rs.getDouble(3));
                a.setShipping_fee(rs.getDouble(4));
                a.setTax(rs.getDouble(5));
                a.setOrder_total(rs.getDouble(6));
                a.setShipping_address(rs.getString(7));
                a.setShipping_country(rs.getString(8));
                a.setShipping_post_code(rs.getString(9));
                a.setPayment_status(rs.getString(10));
                a.setPayment_method(rs.getString(11));
                a.setProgress_status(rs.getString(12));

                a.setBuyer_id(rs.getInt(13));
                a.setGateway_fee(rs.getDouble(14));


                PreparedStatement pst2 = db.get().prepareStatement(
                        "SELECT order_details_id, order_id, product_id, seller_id, seller_username, product_title, product_unit_price, product_image_url, package_id, package_name, status, quantity, sub_total, delivery_date, sell_type FROM order_details WHERE order_id = ?");
                pst2.setInt(1, orderId);
                ResultSet rs2 = pst2.executeQuery();
                List<OrderDetail> orderDetails = new ArrayList<>();
                OrderDetail o;
                while (rs2.next()) {
                    o = new OrderDetail();
                    o.setOrder_details_id(rs2.getInt(1));
                    o.setOrder_id(rs2.getInt(2));
                    o.setProduct_id(rs2.getInt(3));
                    o.setSeller_id(rs2.getInt(4));
                    o.setSeller_username(rs2.getString(5));
                    o.setProduct_title(rs2.getString(6));
                    o.setProduct_unit_price(rs2.getDouble(7));
                    o.setProduct_image_url(rs2.getString(8));
                    o.setPackage_id(rs2.getInt(9));
                    o.setPackage_name(rs2.getString(10));
                    o.setStatus(rs2.getString(11));
                    o.setQuantity(rs2.getInt(12));
                    o.setSub_total(rs2.getDouble(13));
                    o.setDelivery_date(rs2.getTimestamp(14));
                    o.setSell_type(rs2.getString(15));
                    orderDetails.add(o);
                }
                a.setOrder_detail_list(orderDetails);
//                System.out.println(a);
                System.out.println("get order COMPLETED!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return a;

            }
        } catch (Exception e) {
            System.out.println("get order FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println(e);
        }
        return null;
    }

    public boolean updateOrder(OrderDetail o) {
        boolean success = false;
        try {
            pst = db.get().prepareStatement("UPDATE order_details SET status = ? , delivery_date = ? WHERE order_details_id = ?");
            pst.setString(1, o.getStatus());
            pst.setTimestamp(2, o.getDelivery_date());
            pst.setInt(3, o.getOrder_details_id());
            int r = pst.executeUpdate();
            if (r == 1) {
                success = true;
            }

            // checking any order-details table order is processing or not
            pst = db.get().prepareStatement("SELECT status FROM order_details WHERE order_id = ?");
            pst.setInt(1, o.getOrder_id());
            ResultSet rs = pst.executeQuery();
            String status = "Processing";
            while (rs.next()) {
                String s = rs.getString(1);
                if (s.equals("Canceled") || s.equals("Delivered") || s.equals("Refunded")) {
                    status = "Completed";
                }
            }

            // update main order table status
            pst = db.get().prepareStatement("UPDATE orders SET progress_status = ? WHERE order_id = ?");
            pst.setString(1, status);
            pst.setInt(2, o.getOrder_id());
            pst.executeUpdate();

            // if the orderDetails is delivered then update revenueProfit
/*            if (o.getStatus().equals("Delivered")) {
                RevenueProfit rp = new RevenueProfit();
                rp.setSellerId(o.getSeller_id());
                rp.setOrderId(o.getOrder_id());
                rp.setDeliveryDate(o.getDelivery_date());
                rp.setOrderDetailsId(o.getOrder_details_id());
                rp.setRevenue(o.getSub_total());
                rp.setCosts(0);
                rp.setPlatformProfit(rp.getRevenue() * .02); // 2% platform commission
                rp.setSellerProfit(rp.getRevenue() - (rp.getCosts() + rp.getPlatformProfit()));

                pst = db.get().prepareStatement(
                        "INSERT INTO revenue_profit (seller_id, order_id, order_date, order_details_id, revenue, costs, platform_profit, seller_profit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                pst.setInt(1, rp.getSellerId());
                pst.setInt(2, rp.getOrderId());
                pst.setTimestamp(3, rp.getDeliveryDate());
                pst.setInt(4, rp.getOrderDetailsId());
                pst.setDouble(5, rp.getRevenue());
                pst.setDouble(6, rp.getCosts());
                pst.setDouble(7, rp.getPlatformProfit());
                pst.setDouble(8, rp.getSellerProfit());
                pst.executeUpdate();

                // then update seller account balance
                pst = db.get().prepareStatement("UPDATE user SET balance = balance + ? WHERE user_id = ?");
                pst.setDouble(1, rp.getSellerProfit());
                pst.setInt(2, rp.getSellerId());
                pst.executeUpdate();
            }*/

        } catch (Exception e) {
            System.out.println(e);
        }
        return success;
    }

    public List<OrderDetail> getShippedOrderDetailList() {
        try {

/*
            "SELECT orders.order_id, orders.order_date, orders.sub_total, orders.shipping_fee, orders.tax, orders.order_total, orders.shipping_address, orders.shipping_country, " +
                    "orders.shipping_post_code, orders.payment_status, orders.payment_method, orders.progress_status, orders.buyer_id, orders.gateway_fee, order_details.status " +
                    "FROM orders JOIN order_details ON orders.order_id = order_details.order_id WHERE order_details.status = 'Shipped'"
*/

            pst = db.get().prepareStatement(

                    "SELECT d.order_details_id, d.order_id, d.product_id, d.seller_id, d.seller_username, d.product_title, d.product_unit_price, d.product_image_url, d.status, d.quantity, d.sub_total, " +
                            "d.delivery_date, d.package_grp_id, d.package_grp_name, d.package_id, d.package_name, d.sell_type, d.grpbuy_end, d.grpbuy_allocate_qty, d.grpbuy_result, " +
                            "o.shipping_method, o.order_date " +
                            "FROM order_details d JOIN orders o ON d.order_id = o.order_id " +
                            "WHERE d.status = 'Shipped'");

            ResultSet rs = pst.executeQuery();
            List<OrderDetail> odList = new ArrayList<>();
            OrderDetail od;

            while (rs.next()) {
                od = new OrderDetail();
                od.setOrder_details_id(rs.getInt(1));
                od.setOrder_id(rs.getInt(2));
                od.setProduct_id(rs.getInt(3));
                od.setSeller_id(rs.getInt(4));
                od.setSeller_username(rs.getString(5));
                od.setProduct_title(rs.getString(6));
                od.setProduct_unit_price(rs.getDouble(7));
                od.setProduct_image_url(rs.getString(8));
                od.setStatus(rs.getString(9));
                od.setQuantity(rs.getInt(10));
                od.setSub_total(rs.getDouble(11));
                od.setDelivery_date(rs.getTimestamp(12));
                od.setPackage_grp_id(rs.getInt(13));
                od.setPackage_grp_name(rs.getString(14));
                od.setPackage_id(rs.getInt(15));
                od.setPackage_name(rs.getString(16));
                od.setSell_type(rs.getString(17));
                od.setGrpbuy_end(rs.getTimestamp(18));
                od.setGrpbuy_allocate_qty(rs.getInt(19));
                od.setGrpbuy_result(rs.getString(20));
                od.setShipping_method(rs.getString(21));
                od.setOrder_date(rs.getTimestamp(22));

                odList.add(od);

            }

            return odList;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public Admin getAdminProfile(int aid) {
        Admin adm = null;
        try {
            pst = db.get().prepareStatement(
                    "SELECT admin_id, name, password, email, icon, role " +
                            " FROM admin WHERE admin_id = ?");

            pst.setInt(1, aid);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                adm = new Admin();
                adm.setAdmin_id(rs.getInt(1));
                adm.setName(rs.getString(2));
                adm.setPassword(null);
                adm.setEmail(rs.getString(4));
                adm.setIcon(rs.getString(5));
                adm.setRole(Role.valueOf(rs.getString(6)));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return adm;
    }

    public boolean updateAdminProfile(Admin adm) {

        try {

            pst = db.get().prepareStatement("UPDATE admin SET name = ?, email = ?, icon = ?, role = ? WHERE admin_id = ?");

            pst.setString(1, adm.getName());
            pst.setString(2, adm.getEmail());
            pst.setString(3, adm.getIcon());
            pst.setString(4, adm.getRole().toString());
            pst.setInt(5, adm.getAdmin_id());

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean updateAdminProfileWithPwd(Admin adm) {

        try {

            pst = db.get().prepareStatement("UPDATE admin SET name = ?, email = ?, icon = ?, role = ?, password = ? WHERE admin_id = ?");

            pst.setString(1, adm.getName());
            pst.setString(2, adm.getEmail());
            pst.setString(3, adm.getIcon());
            pst.setString(4, adm.getRole().toString());
            pst.setString(5, adm.getPassword());
            pst.setInt(6, adm.getAdmin_id());

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

}
