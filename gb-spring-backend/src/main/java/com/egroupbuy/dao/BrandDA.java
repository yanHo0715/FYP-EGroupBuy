package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.Brand;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BrandDA {
    PreparedStatement pst;

    public List<Brand> getAllBrands() {
        List<Brand> list = new ArrayList<>();
        try {
            pst = db.get().prepareStatement("SELECT brand_id, brand_name, description, icon FROM brand");
            ResultSet rs = pst.executeQuery();
            Brand p;
            while (rs.next()) {
                p = new Brand();
                p.setBrand_id(rs.getInt(1));
                p.setBrand_name(rs.getString(2));
                p.setDescription(rs.getString(3));
                p.setIcon(rs.getString(4));
                list.add(p);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

    public Brand createBrand(Brand b) {
        try {
            pst = db.get().prepareStatement(
                    "INSERT INTO brand (brand_name, description, icon) VALUES (?, ?, ?)");
            pst.setString(1, b.getBrand_name());
            pst.setString(2, b.getDescription());
            pst.setString(3, b.getIcon());
            int x = pst.executeUpdate();
            if (x != -1) {
                return b;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public boolean updateBrand(Brand b) {
        try {
            pst = db.get().prepareStatement(
                    "UPDATE brand SET brand_name = ?, description = ?, icon = ? WHERE brand_id = ?");
            pst.setString(1, b.getBrand_name());
            pst.setString(2, b.getDescription());
            pst.setString(3, b.getIcon());
            pst.setInt(4, b.getBrand_id());
            int x = pst.executeUpdate();
            if (x != -1) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean deleteBrand(int id) {
        try {
            pst = db.get().prepareStatement("DELETE FROM brand WHERE brand_id = ?");
            pst.setInt(1, id);
            int x = pst.executeUpdate();
            if (x != -1) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }
}
