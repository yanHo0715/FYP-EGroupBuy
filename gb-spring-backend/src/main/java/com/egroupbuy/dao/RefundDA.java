package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.OrderDetail;
import com.egroupbuy.model.Refund;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class RefundDA {
    PreparedStatement pst;
    ResultSet rs;

    @Autowired
    AdminDA adminDA;


    public Refund createRefund(Refund a) {
        try {
            pst = db.get().prepareStatement(
                    "INSERT INTO refund (order_id, order_details_id, seller_id, reason, bank_number, bank_name, refund_amount, progress_status, request_date, approval_date, requester_id, " +
                            "product_id, package_id, sell_type, grpbuy_end, refund_qty, org_amount, org_qty, unit_price, refund_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            pst.setInt(1, a.getOrder_id());
            pst.setInt(2, a.getOrder_details_id());
            pst.setInt(3, a.getSeller_id());
            pst.setString(4, a.getReason());
            pst.setString(5, a.getBank_number());
            pst.setString(6, a.getBank_name());
            pst.setDouble(7, a.getRefund_amount());
            pst.setString(8, a.getProgress_status());
            pst.setTimestamp(9, a.getRequest_date());
            pst.setTimestamp(10, a.getApproval_date());
            pst.setInt(11, a.getRequester_id());
            pst.setInt(12, a.getProduct_id());
            pst.setInt(13, a.getPackage_id());
            pst.setString(14, a.getSell_type());
            pst.setTimestamp(15, a.getGrpbuy_end());
            pst.setInt(16, a.getRefund_qty());
            pst.setDouble(17, a.getOrg_amount());
            pst.setInt(18, a.getOrg_qty());
            pst.setDouble(19, a.getUnit_price());
            pst.setString(20, a.getRefund_type());

            int x = pst.executeUpdate();
            if (x == 1) {

                OrderDetail o = new OrderDetail();
                o.setOrder_id(a.getOrder_id());
                o.setOrder_details_id(a.getOrder_details_id());
                o.setStatus("Refund Requested");

                adminDA.updateOrder(o);

                return a;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public Refund updateRefund(Refund a) {
        try {
            OrderDetail o = new OrderDetail();
            o.setOrder_id(a.getOrder_id());
            o.setOrder_details_id(a.getOrder_details_id());
            o.setStatus(a.getProgress_status());
            adminDA.updateOrder(o);

            pst = db.get().prepareStatement("UPDATE refund SET progress_status = ? WHERE refund_id = ?");
            pst.setString(1, a.getProgress_status());
            pst.setInt(2, a.getRefund_id());
            //pst.executeUpdate();
            int x = pst.executeUpdate();
            System.out.println("updateRefund: " + x);
            // if order refunded then update seller account balance
            if (a.getProgress_status().equals("Refunded")) {
                PreparedStatement pst2;
                pst2 = db.get().prepareStatement("UPDATE user SET balance = balance - ? WHERE user_id = ?");
                pst2.setDouble(1, a.getRefund_amount());
                pst2.setInt(2, a.getSeller_id());
                pst2.executeUpdate();
            }
            return a;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<Refund> getAllRefund() {
        List<Refund> l = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT r.refund_id, r.order_id, r.order_details_id, r.seller_id, reason, r.bank_number, r.bank_name, refund_amount, progress_status, request_date, approval_date, requester_id, seller.username AS seller_username, requester.username AS requester_username, " +
                            "r.product_id, r.package_id, r.sell_type, r.grpbuy_end, r.refund_qty, r.org_amount, r.org_qty, r.unit_price, r.refund_type " +
                            "FROM refund r JOIN order_details o ON r.order_details_id = o.order_details_id LEFT JOIN user seller ON r.seller_id = seller.user_id LEFT JOIN user requester ON r.requester_id = requester.user_id ORDER BY refund_id DESC" );
            rs = pst.executeQuery();
            Refund rd;
            while (rs.next()) {
                rd = new Refund();
                rd.setRefund_id(rs.getInt(1));
                rd.setOrder_id(rs.getInt(2));
                rd.setOrder_details_id(rs.getInt(3));
                rd.setSeller_id(rs.getInt(4));
                rd.setReason(rs.getString(5));
                rd.setBank_number(rs.getString(6));
                rd.setBank_name(rs.getString(7));
                rd.setRefund_amount(rs.getDouble(8));
                rd.setProgress_status(rs.getString(9));
                rd.setRequest_date(rs.getTimestamp(10));
                rd.setApproval_date(rs.getTimestamp(11));
                rd.setRequester_id(rs.getInt(12));
                rd.setSeller_username(rs.getString(13));
                rd.setRequester_username(rs.getString(14));
                rd.setProduct_id(rs.getInt(15));
                rd.setPackage_id(rs.getInt(16));
                rd.setSell_type(rs.getString(17));
                rd.setGrpbuy_end(rs.getTimestamp(18));
                rd.setRefund_qty(rs.getInt(19));
                rd.setOrg_amount(rs.getDouble(20));
                rd.setOrg_qty(rs.getInt(21));
                rd.setUnit_price(rs.getDouble(22));
                rd.setRefund_type(rs.getString(23));
                l.add(rd);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return l;
    }

    public List<Refund> getAllRefundRequests(int uid) {
        List<Refund> l = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT refund_id, r.order_id, r.order_details_id, r.seller_id, reason, r.bank_number, r.bank_name, refund_amount, r.progress_status, request_date, approval_date, seller.username AS seller_username " +
                            "FROM refund r JOIN order_details o ON r.order_details_id = o.order_details_id LEFT JOIN user seller ON r.requester_id = seller.user_id WHERE r.requester_id = ? ORDER BY refund_id DESC");
            pst.setInt(1, uid);
            rs = pst.executeQuery();
            Refund rd;
            while (rs.next()) {
                rd = new Refund();
                rd.setRefund_id(rs.getInt(1));
                rd.setOrder_id(rs.getInt(2));
                rd.setOrder_details_id(rs.getInt(3));
                rd.setSeller_id(rs.getInt(4));
                rd.setReason(rs.getString(5));
                rd.setBank_number(rs.getString(6));
                rd.setBank_name(rs.getString(7));
                rd.setRefund_amount(rs.getDouble(8));
                rd.setProgress_status(rs.getString(9));
                rd.setRequest_date(rs.getTimestamp(10));
                rd.setApproval_date(rs.getTimestamp(11));
                rd.setSeller_username(rs.getString(12));
                l.add(rd);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return l;
    }

    public List<Refund> getSellRefundList(int sid) {

        List<Refund> rfList = new ArrayList<>();

        try {
            pst = db.get().prepareStatement(
                    "SELECT refund_id, r.order_id, r.order_details_id, r.seller_id, reason, bank_number, bank_name, refund_amount, progress_status, request_date, " +
                            "approval_date, r.product_id, r.package_id, r.sell_type, r.grpbuy_end, r.refund_qty, r.org_amount, r.org_qty, r.unit_price, r.refund_type, " +
                            "o.* FROM refund r JOIN order_details o USING(order_details_id) WHERE r.seller_id = ? ORDER BY refund_id DESC" );

            pst.setInt(1, sid);
            rs = pst.executeQuery();
            Refund rf;

            while (rs.next()) {
                rf = new Refund();
                rf.setRefund_id(rs.getInt(1));
                rf.setOrder_id(rs.getInt(2));
                rf.setOrder_details_id(rs.getInt(3));
                rf.setSeller_id(rs.getInt(4));
                rf.setReason(rs.getString(5));
                rf.setBank_number(rs.getString(6));
                rf.setBank_name(rs.getString(7));
                rf.setRefund_amount(rs.getDouble(8));
                rf.setProgress_status(rs.getString(9));
                rf.setRequest_date(rs.getTimestamp(10));
                rf.setApproval_date(rs.getTimestamp(11));
                rf.setProduct_id(rs.getInt(12));
                rf.setPackage_id(rs.getInt(13));
                rf.setSell_type(rs.getString(14));
                rf.setGrpbuy_end(rs.getTimestamp(15));
                rf.setRefund_qty(rs.getInt(16));
                rf.setOrg_amount(rs.getDouble(17));
                rf.setOrg_qty(rs.getInt(18));
                rf.setUnit_price(rs.getDouble(19));
                rf.setRefund_type(rs.getString(20));
                rfList.add(rf);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return rfList;
    }


    /*public List<Refund> getAllBuyerRefunds(int uid) {
        List<Refund> l = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT refund_id, r.order_id, r.order_details_id, r.requester_id, reason, bank_number, bank_name, refund_amount, r.progress_status, request_date, approval_date, requester.username AS requester_username " +
                            "FROM refund r JOIN order_details o ON r.order_details_id = o.order_details_id LEFT JOIN user requester ON r.requester_id = requester.user_id WHERE r.seller_id = ? ORDER BY refund_id DESC");
            pst.setInt(1, uid);
            rs = pst.executeQuery();
            Refund rd;
            while (rs.next()) {
                rd = new Refund();
                rd.setRefund_id(rs.getInt(1));
                rd.setOrder_id(rs.getInt(2));
                rd.setOrder_details_id(rs.getInt(3));
                rd.setRefund_id(rs.getInt(4));
                rd.setReason(rs.getString(5));
                rd.setBank_number(rs.getString(6));
                rd.setBank_name(rs.getString(7));
                rd.setRefund_amount(rs.getDouble(8));
                rd.setProgress_status(rs.getString(9));
                rd.setRequest_date(rs.getTimestamp(10));
                rd.setApproval_date(rs.getTimestamp(11));
                rd.setRequester_username(rs.getString(12));
                l.add(rd);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return l;
    }*/
}
