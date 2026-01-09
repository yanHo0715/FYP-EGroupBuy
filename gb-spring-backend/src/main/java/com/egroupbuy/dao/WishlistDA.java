package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.PackageItem;
import com.egroupbuy.model.Wishlist;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class WishlistDA {
    PreparedStatement pst;

    public List<Wishlist> getWishlist(int uid) {
        List<Wishlist> l = new ArrayList<>();
        try {
            pst = db.get().prepareStatement(
                    "SELECT wishlist_id, user_id, w.product_id, product_title, w.package_grp_id, w.package_grp_name, w.package_id, w.package_name, regular_price, sale_price, stock_status, sell_type, main_image " +
                            "FROM wishlist w JOIN product p ON w.product_id = p.product_id WHERE user_id = ?");
            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();
            Wishlist w;
            while (rs.next()) {
                w = new Wishlist();
                w.setWishlist_id(rs.getInt(1));
                w.setUser_id(rs.getInt(2));
                w.setProduct_id(rs.getInt(3));
                w.setProduct_title(rs.getString(4));
                w.setPackage_grp_id(rs.getInt(5));
                w.setPackage_grp_name(rs.getString(6));
                w.setPackage_id(rs.getInt(7));
                w.setPackage_name(rs.getString(8));
                w.setRegular_price(rs.getDouble(9));
                w.setSale_price(rs.getDouble(10));
                w.setStock_status(rs.getString(11));
                w.setSell_type(rs.getString(12));
                w.setProduct_image(rs.getString(13));
                l.add(w);
            }
            for(int i = 0; i < l.size(); i++) {
                if(l.get(i).getSell_type().equals("P")) {
                    PreparedStatement pst2 = db.get().prepareStatement(
                            "SELECT p.package_item_id, p.product_item_id, p.item_name, p.package_grp_id, p.package_id, p.status, p.popularity, p.likes, i.item_image " +
                                    "FROM package_item p join product_item i on p.product_item_id = i.product_item_id WHERE p.package_id = ? ORDER BY p.product_item_id");

                    pst2.setInt(1, l.get(i).getPackage_id());
                    ResultSet rs2 = pst2.executeQuery();

                    List<PackageItem> packageItemList = new ArrayList<>();
                    PackageItem pi;

                    while (rs2.next()) {
                        pi = new PackageItem();
                        pi.setPackage_item_id(rs2.getInt(1));
                        pi.setProduct_item_id(rs2.getInt(2));
                        pi.setItem_name(rs2.getString(3));
                        pi.setPackage_grp_id(rs2.getInt(4));
                        pi.setPackage_id(rs2.getInt(5));
                        pi.setStatus(rs2.getString(6));
                        pi.setPopularity(rs2.getInt(7));
                        pi.setLikes((rs2.getInt(8)));
                        pi.setPackage_item_image(rs2.getString(9));
                        packageItemList.add(pi);
                    }

                    l.get(i).setPackage_item_list(packageItemList);


                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return l;
    }

    public boolean addWishlistItem(Wishlist w) {
        try {
            System.out.println("addWishlistItem: " + w);
            int x = 0;
            if (w.getSell_type().equals("S") || w.getSell_type().equals("G")){
                System.out.println("addWishlistItem: TTTTTTTTTTTTTTT" + w.getSell_type());
                pst = db.get().prepareStatement(
                        "INSERT INTO wishlist (user_id, product_id, product_title, sell_type) VALUES (?, ?, ?, ?)");
                pst.setInt(1, w.getUser_id());
                pst.setInt(2, w.getProduct_id());
                pst.setString(3, w.getProduct_title());
                pst.setString(4, w.getSell_type());

                x = pst.executeUpdate();
            }
            else {
                pst = db.get().prepareStatement(
                        "INSERT INTO wishlist (user_id, product_id, product_title, package_grp_id, package_grp_name, package_id, package_name, sell_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                pst.setInt(1, w.getUser_id());
                pst.setInt(2, w.getProduct_id());
                pst.setString(3, w.getProduct_title());
                pst.setInt(4, w.getPackage_grp_id());
                pst.setString(5, w.getPackage_grp_name());
                pst.setInt(6, w.getPackage_id());
                pst.setString(7, w.getPackage_name());
                pst.setString(8, w.getSell_type());

                x = pst.executeUpdate();
            }

            System.out.println("$$$$$$$$$$$$$$$$$" + x);
            if (x == 1) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean removeWishlistItem(int wid) {
        try {
            System.out.println("removeWishlistItem: " + wid);
            pst = db.get().prepareStatement("DELETE FROM wishlist WHERE wishlist_id = ?");
            pst.setInt(1, wid);
            int x = pst.executeUpdate();
            System.out.println("@@@@@@@@@@@@@####" + x);
            if (x == 1) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }
}
