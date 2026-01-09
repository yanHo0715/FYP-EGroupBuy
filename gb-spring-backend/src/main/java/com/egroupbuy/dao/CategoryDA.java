package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.Category;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CategoryDA {
    PreparedStatement pst;

    public List<Category> getAllCategories() {
        List<Category> list = new ArrayList<>();
        try {
            pst = db.get().prepareStatement("SELECT category_id, category_name, description, icon, parent_id FROM category");
            ResultSet rs = pst.executeQuery();
            Category p;
            while (rs.next()) {
                p = new Category();
                p.setCategory_id(rs.getInt(1));
                p.setCategory_name(rs.getString(2));
                p.setDescription(rs.getString(3));
                p.setIcon(rs.getString(4));
                p.setParent_id(rs.getInt(5));
                list.add(p);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

    public Category createCategory(Category c) {
        try {
            pst = db.get().prepareStatement(
                    "INSERT INTO category (category_name, description, icon, parent_id) VALUES (?, ?, ?, ?)");
            pst.setString(1, c.getCategory_name());
            pst.setString(2, c.getDescription());
            pst.setString(3, c.getIcon());
            pst.setInt(4, c.getParent_id());
            int x = pst.executeUpdate();
            if (x == 1) {
                return c;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public boolean updateCategory(Category c) {
        try {
            pst = db.get().prepareStatement(
                    "UPDATE category SET category_name = ?, description = ?, icon = ?, parent_id = ? WHERE category_id = ?");
            pst.setString(1, c.getCategory_name());
            pst.setString(2, c.getDescription());
            pst.setString(3, c.getIcon());
            pst.setInt(4, c.getParent_id());
            pst.setInt(5, c.getCategory_id());
            int x = pst.executeUpdate();
            if (x == 1) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean deleteCategory(int id) {
        try {
            pst = db.get().prepareStatement("DELETE FROM category WHERE category_id = ?");
            pst.setInt(1, id);
            int x = pst.executeUpdate();
            //System.out.println(x);
            if (x == 1) {
                //System.out.println("delete: true");
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        //System.out.println("delete: false");
        return false;
    }
}
