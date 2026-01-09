package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.GroupBuyEvent;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupBuyEventEndDA {

//    PreparedStatement pst;

    public void productGroupBuyEventEndProcess() {

        CallableStatement cs;

        try {
            cs = db.get().prepareCall("{CALL Product_GroupBuy_EventEnd()}");
            ResultSet rs = cs.executeQuery();
            while (rs.next()) {
                System.out.println("Executed SP CALL Product_GroupBuy_EventEnd()");
            }
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public void packageGroupBuyEventEndProcess() {

        CallableStatement cs;

        try {
            cs = db.get().prepareCall("{CALL Package_GroupBuy_EventEnd()}");
            ResultSet rs = cs.executeQuery();
            while (rs.next()) {
                System.out.println("Executed SP CALL Package_GroupBuy_EventEnd()");
            }
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public static List<GroupBuyEvent> getAllGroupBuyEndEvent() {
        List<GroupBuyEvent> endEventList = new ArrayList<>();
        PreparedStatement pst;

        try {

            pst = db.get().prepareStatement("SELECT grpbuy_event_id, grpbuy_start, grpbuy_end, sell_type, product_id, package_grp_id, min_threshold, success_sold_qty," +
                    "grpbuy_result, event_end_process, remark, seller_id FROM grpbuy_event ORDER BY grpbuy_event_id DESC");
            ResultSet rs = pst.executeQuery();
            GroupBuyEvent ee;
            while (rs.next()) {
                ee = new GroupBuyEvent();
                ee.setGrpbuy_event_id(rs.getInt(1));
                ee.setGrpbuy_start(rs.getTimestamp(2));
                ee.setGrpbuy_end(rs.getTimestamp(3));
                ee.setSell_type(rs.getString(4));
                ee.setProduct_id(rs.getInt(5));
                ee.setPackage_grp_id(rs.getInt(6));
                ee.setMin_threshold(rs.getInt(7));
                ee.setSuccess_sold_qty(rs.getInt(8));
                ee.setGrpbuy_result(rs.getString(9));
                ee.setEvent_end_process(rs.getTimestamp(10));
                ee.setRemark(rs.getString(11));
                ee.setSeller_id(rs.getInt(12));
                endEventList.add(ee);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return endEventList;
    }


    public static List<GroupBuyEvent> getGroupBuyEndEvent(int sid) {
        List<GroupBuyEvent> endEventList = new ArrayList<>();
        PreparedStatement pst;

        try {
            pst = db.get().prepareStatement("SELECT grpbuy_event_id, grpbuy_start, grpbuy_end, sell_type, product_id, package_grp_id, min_threshold, success_sold_qty," +
                    "grpbuy_result, event_end_process, remark, seller_id FROM grpbuy_event WHERE seller_id = ? ORDER BY grpbuy_event_id DESC" );

            pst.setInt(1, sid);
            ResultSet rs = pst.executeQuery();
            GroupBuyEvent ee;

            while (rs.next()) {
                ee = new GroupBuyEvent();
                ee.setGrpbuy_event_id(rs.getInt(1));
                ee.setGrpbuy_start(rs.getTimestamp(2));
                ee.setGrpbuy_end(rs.getTimestamp(3));
                ee.setSell_type(rs.getString(4));
                ee.setProduct_id(rs.getInt(5));
                ee.setPackage_grp_id(rs.getInt(6));
                ee.setMin_threshold(rs.getInt(7));
                ee.setSuccess_sold_qty(rs.getInt(8));
                ee.setGrpbuy_result(rs.getString(9));
                ee.setEvent_end_process(rs.getTimestamp(10));
                ee.setRemark(rs.getString(11));
                ee.setSeller_id(rs.getInt(12));
                endEventList.add(ee);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return endEventList;
    }

}
