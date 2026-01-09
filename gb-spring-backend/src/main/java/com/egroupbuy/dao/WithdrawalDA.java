package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.dto.WithdrawalAdmin;
import com.egroupbuy.model.Withdrawal;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class WithdrawalDA {
    PreparedStatement pst;

    // withdraw request for user
    public Withdrawal requestWithdraw(Withdrawal w) {
        try {
            pst = db.get().prepareStatement(
                    "INSERT INTO user_withdrawal (user_id, request_date, amount, status) VALUES (?, ?, ?, ?)");
            pst.setInt(1, w.getUser_id());
//            pst.setDate(2, w.getRequest_date());
            pst.setTimestamp(2, w.getRequest_date());
            pst.setDouble(3, w.getAmount());
            pst.setString(4, "Pending");
            int x = pst.executeUpdate();
            if (x == 1) {

                // then update reduce seller account balance
                pst = db.get().prepareStatement("UPDATE user SET balance = IFNULL(balance,0) - ? WHERE user_id = ?");
                pst.setDouble(1, w.getAmount());
                pst.setInt(2, w.getUser_id());
                pst.executeUpdate();

                return w;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    // paid and decline a withdraw request by admin
    public boolean updateWithdraw(WithdrawalAdmin w) {
        boolean success = false;
        try {
            pst = db.get()
                    .prepareStatement("UPDATE user_withdrawal SET payment_date = ?, approval_date = ?, status = ? WHERE withdrawal_id = ?");
//            pst.setDate(1, w.getPayment_date());
            pst.setTimestamp(1, w.getPayment_date());
            pst.setTimestamp(2, w.getApproval_date());
            pst.setString(3, w.getStatus());
            pst.setInt(4, w.getWithdrawal_id());
            int x = pst.executeUpdate();
            if (x == 1) {

                // if withdraw request is declined then deposit that amount to seller account
                if (w.getStatus().equals("Declined")) {
                    pst = db.get().prepareStatement("UPDATE user SET balance = IFNULL(balance, 0) + ? WHERE user_id = ?");
                    pst.setDouble(1, w.getAmount());
                    pst.setInt(2, w.getUser_id());
                    pst.executeUpdate();
                }

                success = true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return success;
    }

    // get all withdrawal requests for admin
    public List<WithdrawalAdmin> getAllWithdrawals() {
        List<WithdrawalAdmin> withdrawals = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT withdrawal_id, w.user_id, username, holder_name, account_number, bank_name, branch_name, request_date, amount, payment_date, approval_date, w.status, u.email FROM user_withdrawal w JOIN user u ON w.user_id = u.user_id ORDER BY withdrawal_id DESC");
            ResultSet rs = pst.executeQuery();
            WithdrawalAdmin w;
            while (rs.next()) {
                w = new WithdrawalAdmin();
                w.setWithdrawal_id(rs.getInt(1));
                w.setUser_id(rs.getInt(2));
                w.setUsername(rs.getString(3));
                w.setHolder_name(rs.getString(4));
                w.setAccount_number(rs.getString(5));
                w.setBank_name(rs.getString(6));
                w.setBranch_name(rs.getString(7));
//                w.setRequest_date(rs.getDate(8));
                w.setRequest_date(rs.getTimestamp(8));
                w.setAmount(rs.getDouble(9));
//                w.setPayment_date(rs.getDate(10));
                w.setPayment_date(rs.getTimestamp(10));
                w.setApproval_date(rs.getTimestamp(11));
                w.setStatus(rs.getString(12));
                w.setEmail(rs.getString(13));
                withdrawals.add(w);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return withdrawals;
    }

    // get all withdrawals for a seller
    public List<Withdrawal> getWithdrawals(int uid) {
        List<Withdrawal> withdrawals = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT withdrawal_id, user_id, request_date, amount, payment_date, approval_date, status FROM user_withdrawal WHERE user_id = ? ORDER BY withdrawal_id DESC");
            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();
            Withdrawal w;
            while (rs.next()) {
                w = new Withdrawal();
                w.setWithdrawal_id(rs.getInt(1));
                w.setUser_id(rs.getInt(2));
//                w.setRequest_date(rs.getDate(3));
                w.setRequest_date(rs.getTimestamp(3));
                w.setAmount(rs.getDouble(4));
//                w.setPayment_date(rs.getDate(5));
                w.setPayment_date(rs.getTimestamp(5));
                w.setApproval_date(rs.getTimestamp(6));
                w.setStatus(rs.getString(7));
                withdrawals.add(w);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return withdrawals;
    }
}
