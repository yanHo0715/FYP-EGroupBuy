package com.egroupbuy.dao;

import com.egroupbuy.db.db;
import com.egroupbuy.model.*;
import com.egroupbuy.model.Package;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;

@Service
public class UserDA {
    PreparedStatement pst;

    public User userSignup(User a) {

        try {
            System.out.println("============ User Signup ============");
            System.out.println(a);
            System.out.println("============ User Signup ============");

            KeyHolder keyHolder = new GeneratedKeyHolder();

            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            pst = db.get().prepareStatement(
                    "INSERT INTO user (first_name, last_name, email, password, role, creation_date) VALUES (?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);

            pst.setString(1, a.getFirst_name());
            pst.setString(2, a.getLast_name());
            pst.setString(3, a.getEmail());
            pst.setString(4, a.getPassword());
            pst.setString(5, a.getRole().name());
            pst.setTimestamp(6, createDateTime);

            int x = pst.executeUpdate();
            if (x != -1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
                    System.out.println("============ Saved New User ID ============");
                    System.out.println(key);
                    System.out.println("============ Saved New User ID ============");
                }
                a.setUser_id(key);
                return a;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


    public User findUserByEmail(String email) throws UsernameNotFoundException {
        User user = null;

        try {
            pst = db.get().prepareStatement(
                    "SELECT user_id, first_name, last_name, username, email, role, password FROM user WHERE email = ?");
//            "SELECT user_id, first_name, last_name, username, email, role, password FROM user WHERE email = ? AND status = 'Active'");
            pst.setString(1, email);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                user = new User();
                user.setUser_id(rs.getInt(1));
                user.setFirst_name(rs.getString(2));
                user.setLast_name(rs.getString(3));
                user.setUsername(rs.getString(4));
                user.setEmail(rs.getString(5));
                user.setRole(Role.valueOf(rs.getString(6)));
                user.setPassword(rs.getString(7));
            } else {
                throw new UsernameNotFoundException("User ID [" + email + "] not found");
            }

        } catch (Exception e) {

            System.out.println(e);
        }

        return user;
    }

    public Product addProductMain(Product a) {
        try {
            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            pst = db.get().prepareStatement(
                    "INSERT INTO product (title, description, category_id, brand_id, stock_status, regular_price, sale_price, stock_quantity, display_position, seller_id, " +
                            "seller_username, status, creation_date, main_image, image_urls, sell_style, grpbuy_start, grpbuy_end, grpbuy_quantity, grpbuy_regular_price, grpbuy_sale_price, min_threshold, grpbuy_status)" +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? , ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, a.getTitle());
            pst.setString(2, a.getDescription());
            pst.setInt(3, a.getCategory_id());
            pst.setInt(4, a.getBrand_id());
            pst.setString(5, a.getStock_status());
            pst.setDouble(6, a.getRegular_price());
            pst.setDouble(7, a.getSale_price());
            pst.setInt(8, a.getStock_quantity());
            pst.setInt(9, a.getDisplay_position());
            pst.setInt(10, a.getSeller_id());
            pst.setString(11, a.getSeller_username());
            pst.setString(12, a.getStatus());
//            pst.setDate(13, a.getCreation_date());
            pst.setTimestamp(13, createDateTime);
            pst.setString(14, a.getMain_image());
            pst.setString(15, a.getImage_urls());
            pst.setString(16, a.getSell_style());
            if (isNull(a.getGrpbuy_start())) {
                pst.setTimestamp(17, null);
            } else {
                pst.setTimestamp(17, (new java.sql.Timestamp(a.getGrpbuy_start().getTime())));
            }
//            pst.setTimestamp(17, (new java.sql.Timestamp(a.getGrpbuy_start().getTime())));
            if (isNull(a.getGrpbuy_end())) {
                pst.setTimestamp(18, null);
            } else {
                pst.setTimestamp(18, (new java.sql.Timestamp(a.getGrpbuy_end().getTime())));
            }
//            pst.setTimestamp(18, (new java.sql.Timestamp(a.getGrpbuy_end().getTime())));
            pst.setInt(19, a.getGrpbuy_quantity());
            pst.setDouble(20, a.getGrpbuy_regular_price());
            pst.setDouble(21, a.getGrpbuy_sale_price());
            pst.setInt(22, a.getMin_threshold());
            pst.setString(23, a.getGrpbuy_status());

            int x = pst.executeUpdate();
//            if (x != -1) {
//                return a;
//            }

            if (x != -1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
                    System.out.println("============ Saved New Product ID ============");
                    System.out.println(key);
                    System.out.println("============ Saved New Product ID ============");
                }
                a.setProduct_id(key);
                return a;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


    public boolean updateProductMain(Product a) {
        try {
            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            pst = db.get().prepareStatement(
                    "UPDATE product SET title = ?, description = ?, category_id = ?, brand_id = ?, stock_status = ?, regular_price = ?, sale_price = ?, stock_quantity = ?, display_position = ?, " +
                            "seller_username = ?, status = ?, creation_date = ?, main_image = ?, image_urls = ?, sell_style = ?, grpbuy_start = ? , grpbuy_end = ?, grpbuy_quantity = ?, grpbuy_regular_price = ?, " +
                            "grpbuy_sale_price = ?, min_threshold = ?, grpbuy_status = ? WHERE product_id = ? and seller_id = ?");



            pst.setString(1, a.getTitle());
            pst.setString(2, a.getDescription());
            pst.setInt(3, a.getCategory_id());
            pst.setInt(4, a.getBrand_id());
            pst.setString(5, a.getStock_status());
            pst.setDouble(6, a.getRegular_price());
            pst.setDouble(7, a.getSale_price());
            pst.setInt(8, a.getStock_quantity());
            pst.setInt(9, a.getDisplay_position());
            pst.setString(10, a.getSeller_username());
            pst.setString(11, a.getStatus());
            pst.setTimestamp(12, createDateTime);
            pst.setString(13, a.getMain_image());
            pst.setString(14, a.getImage_urls());
            pst.setString(15, a.getSell_style());
            if (isNull(a.getGrpbuy_start())) {
                pst.setTimestamp(16, null);
            } else {
                pst.setTimestamp(16, (new java.sql.Timestamp(a.getGrpbuy_start().getTime())));
            }
            if (isNull(a.getGrpbuy_end())) {
                pst.setTimestamp(17, null);
            } else {
                pst.setTimestamp(17, (new java.sql.Timestamp(a.getGrpbuy_end().getTime())));
            }

            pst.setInt(18, a.getGrpbuy_quantity());
            pst.setDouble(19, a.getGrpbuy_regular_price());
            pst.setDouble(20, a.getGrpbuy_sale_price());
            pst.setInt(21, a.getMin_threshold());
            pst.setString(22, a.getGrpbuy_status());
            pst.setInt(23, a.getProduct_id());
            pst.setInt(24, a.getSeller_id());

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }


    public boolean updatePackageGroup(PackageGroup pg) {
        try {
            java.sql.Timestamp newDateTime = new java.sql.Timestamp(new java.util.Date().getTime());


            pst = db.get().prepareStatement(
                    "UPDATE package_group SET package_grp_name = ?, creation_date = ?, quantity = ?, status = ?, grpbuy_start = ?, grpbuy_end = ?, min_threshold = ? " +
                            "WHERE package_grp_id = ?" );


            pst.setString(1, pg.getPackage_grp_name());
            pst.setTimestamp(2, newDateTime);
            pst.setInt(3, pg.getQuantity());
            pst.setString(4, pg.getStatus());
            if (isNull(pg.getGrpbuy_start())) {
                pst.setTimestamp(5, null);
            } else {
                pst.setTimestamp(5, (new java.sql.Timestamp(pg.getGrpbuy_start().getTime())));
            }
            if (isNull(pg.getGrpbuy_end())) {
                pst.setTimestamp(6, null);
            } else {
                pst.setTimestamp(6, (new java.sql.Timestamp(pg.getGrpbuy_end().getTime())));
            }
            pst.setInt(7, pg.getMin_threshold());
            pst.setInt(8, pg.getPackage_grp_id());

            int x = pst.executeUpdate();

            List<Package> pkglist = new ArrayList<>();
            pkglist = pg.getPackage_list();

            for (int i = 0; i < pkglist.size(); i++) {

                pst = db.get().prepareStatement(
                        "UPDATE package SET package_name = ?, creation_date = ?, description = ?, quantity = ? , regular_price = ?, sale_price = ? " +
                                "WHERE package_id = ?" );

                pst.setString(1, pkglist.get(i).getPackage_name());
                pst.setTimestamp(2, newDateTime);
                pst.setString(3, pkglist.get(i).getDescription());
                pst.setInt(4, pkglist.get(i).getQuantity());
                pst.setDouble(5, pkglist.get(i).getRegular_price());
                pst.setDouble(6, pkglist.get(i).getSale_price());
                pst.setInt(7, pkglist.get(i).getPackage_id());

                int y = pst.executeUpdate();

                if (y == 1) {
                    System.out.println("=====> Success to update Package ID : " + pkglist.get(i).getPackage_id());
                } else {
                    System.out.println("=====> Fail to update Product ID : " + pkglist.get(i).getPackage_id());
                    return false;
                }
            }

            if (x == 1) {
                System.out.println("=====> Success to update Package Group ID : " + pg.getPackage_grp_id());
                return true;
            }


        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

//    public ProductItem[] productItemsManip(ProductItem[] a) {
    public List<ProductItem> productItemsManip(ProductItem[] a) {
        try {

            int noOfItem = 0;
            ProductItem tmpProdItem;
            List<ProductItem> prodItemlist = new ArrayList<>();

            noOfItem = a.length;
            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            for (int i = 0; i < noOfItem; i++) {

                tmpProdItem = a[i];

                System.out.println("=====> productItemsManip tmpProdItem : " + tmpProdItem.getProduct_item_id());

//                System.out.println("============ Saved New Product Item ID ===========> =" + a[i] );

                if (tmpProdItem.getAction().equals("I")) {
                    pst = db.get().prepareStatement(
                            "INSERT INTO product_item (item_name, description, quantity, popularity, status, regular_price, sale_price, creation_date, product_id, product_title, item_image, item_seq)"
                                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                    pst.setString(1, tmpProdItem.getItem_name());
                    pst.setString(2, tmpProdItem.getDescription());
                    pst.setInt(3, tmpProdItem.getQuantity());
                    pst.setInt(4, tmpProdItem.getPopularity());
                    pst.setString(5, tmpProdItem.getStatus());
                    pst.setDouble(6, tmpProdItem.getRegular_price());
                    pst.setDouble(7, tmpProdItem.getSale_price());
//                pst.setDate(8, tmpProdItem.getCreation_date());
                    pst.setTimestamp(8, createDateTime);
                    pst.setInt(9, tmpProdItem.getProduct_id());
                    pst.setString(10, tmpProdItem.getProduct_title());
                    pst.setString(11, tmpProdItem.getItem_image());
                    pst.setInt(12, tmpProdItem.getItem_seq());

                    int x = pst.executeUpdate();

                    if (x != -1) {
                        int key = -1;
                        key = 0;

                        ResultSet rs = pst.getGeneratedKeys();
                        if (rs.next()) {
                            key = rs.getInt(1);
                            System.out.println("=====> Success to create new Product Item with ID : " + key);
//                            System.out.println(key);
//                            System.out.println("============ Saved New Product Item ID ============");
                        }

                        a[i].setProduct_item_id(key);
                        prodItemlist.add(a[i]);
                    } else {
                        System.out.println("=====> Fail to create new Product Item with name : " + tmpProdItem.getItem_name());
                    }
                }

                if (tmpProdItem.getAction().equals("U")) {
                    pst = db.get().prepareStatement(
                            "UPDATE product_item SET item_name = ?, description = ?, quantity = ?, popularity = ?, status = ?, regular_price = ? , sale_price = ?, creation_date = ?, " +
                                    "product_id = ?, product_title = ?, item_image = ?, item_seq =? " +
                                    "WHERE product_item_id = ?");

                    pst.setString(1, tmpProdItem.getItem_name());
                    pst.setString(2, tmpProdItem.getDescription());
                    pst.setInt(3, tmpProdItem.getQuantity());
                    pst.setInt(4, tmpProdItem.getPopularity());
                    pst.setString(5, tmpProdItem.getStatus());
                    pst.setDouble(6, tmpProdItem.getRegular_price());
                    pst.setDouble(7, tmpProdItem.getSale_price());
                    pst.setTimestamp(8, createDateTime);
                    pst.setInt(9, tmpProdItem.getProduct_id());
                    pst.setString(10, tmpProdItem.getProduct_title());
                    pst.setString(11, tmpProdItem.getItem_image());
                    pst.setInt(12, tmpProdItem.getItem_seq());
                    pst.setInt(13, tmpProdItem.getProduct_item_id());

                    int y = pst.executeUpdate();

                    if (y == 1) {
                        prodItemlist.add(a[i]);
                        System.out.println("=====> Success to update Product Item with ID : " + tmpProdItem.getProduct_item_id());
                    } else {
                        System.out.println("=====> Fail to update Product Item with ID : " + tmpProdItem.getProduct_item_id());
                    }

                }

                if (tmpProdItem.getAction().equals("D")) {
                    pst = db.get().prepareStatement(
                            "UPDATE product_item SET status = 'Inactive' WHERE product_item_id = ?");
                    pst.setInt(1, tmpProdItem.getProduct_item_id());

                    int z = pst.executeUpdate();

                    if (z == 1) {
                        System.out.println("=====> Success to update Product Item ID to Inactive : " + tmpProdItem.getProduct_item_id());
                    } else {
                        System.out.println("=====> Fail to update Product Item ID to Inactive : " + tmpProdItem.getProduct_item_id());
                    }

                }

            }
            return prodItemlist;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public PackageGroup addPackageGroup(PackageGroup p) {
        try {
            pst = db.get().prepareStatement(
                    "INSERT INTO package_group (package_grp_name, creation_date, quantity, product_id, product_title, status)"
                            + "VALUES (?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, p.getPackage_grp_name());
            pst.setTimestamp(2, p.getCreation_date());
            pst.setInt(3, p.getQuantity());
            pst.setInt(4, p.getProduct_id());
            pst.setString(5, p.getProduct_title());
            pst.setString(6, p.getStatus());
            int x = pst.executeUpdate();

            if (x != -1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
                    System.out.println("============ Saved New PackageGroup ID ============");
                    System.out.println(key);
                    System.out.println("============ Saved New PackageGroup ID ============");
                }
                p.setPackage_grp_id(key);
                return p;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public ProductItem[][] addPackageList_OLD(ProductItem[][] pi) {
        try {

            int noOfPack = 0;
            Package tmpPackage;

            noOfPack = pi.length;
            int packageGroupID = 0;
            int packageID = 0;
            int packageItemID = 0;

            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());
            int parentID = 0;
            String parentTitle = "";

            parentID = pi[0][0].getProduct_id();
            parentTitle = pi[0][0].getProduct_title();


            // To create a package group
            pst = db.get().prepareStatement(
                    "INSERT INTO package_group (package_grp_name, creation_date, quantity, product_id, product_title, status)"
                            + "VALUES (?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, "AAAAAAA");
            pst.setTimestamp(2, createDateTime);
            pst.setInt(3, 1);
            pst.setInt(4, pi[0][0].getProduct_id());
            pst.setString(5, pi[0][0].getProduct_title());
            pst.setString(6, "SUBMIT");

            int x = pst.executeUpdate();

            if (x != -1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
                    System.out.println("============ Saved New Package Group ID ============");
                    System.out.println(key);
                    System.out.println("============ Saved New Package Group ID ============");
                    packageGroupID = key;
                }
//                p.setPackage_grp_id(key);
            }

            // To create the list of packages link to the parent package group

            if(packageGroupID > 1) {
                for (int i = 0; i < noOfPack - 1; i++) {

                    //tmpProdItem = a[i];

//                System.out.println("============ Saved New Product Item ID ===========> =" + a[i] );

                    pst = db.get().prepareStatement(
                            "INSERT INTO package (package_name, creation_date, description, quantity, regular_price, sale_price, product_id, product_title, product_item_id, item_name, package_grp_id, status, popularity, likes)"
                                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                    pst.setString(1, "ZZZZZZZZZ");
                    pst.setTimestamp(2, createDateTime);
                    pst.setString(3, "");
                    pst.setInt(4, 1);
                    pst.setDouble(5, 2);
                    pst.setDouble(6, 3);
                    pst.setInt(7, pi[0][0].getProduct_id());
                    pst.setString(8, pi[0][0].getProduct_title());
                    pst.setInt(9, 1);
                    pst.setString(10, "");
                    pst.setInt(11, packageGroupID);
                    pst.setString(12, "SUBMIT");
                    pst.setInt(13, 0);
                    pst.setInt(14, 0);


                    int y = pst.executeUpdate();

                    if (y != -1) {
                        int pKey = -1;
                        pKey = 0;

                        ResultSet pRs = pst.getGeneratedKeys();
                        if (pRs.next()) {
                            pKey = pRs.getInt(1);
                            System.out.println("============ Saved New Package ID ============");
                            System.out.println(pKey);
                            System.out.println("============ Saved New Package ID ============");
                            packageID = pKey;

                            // Add package items to the package after the package id created successfully
                            int noItemInPack = 0;
                            noItemInPack = pi[i].length;

                            for (int j = 0; j < noItemInPack; j++) {
                                pst = db.get().prepareStatement(
                                        "INSERT INTO package_item (product_item_id, item_name, package_grp_id, package_id, status, popularity, likes)"
                                                + "VALUES (?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                                pst.setInt(1, pi[i][j].getProduct_item_id());
                                pst.setString(2, pi[i][j].getItem_name());
//                                pst.setInt(1, 99);
//                                pst.setString(2, "p[i][j].getItem_name()");
                                pst.setInt(3, packageGroupID);
                                pst.setInt(4, packageID);
                                pst.setString(5, "SUBMIT");
                                pst.setInt(6, 0);
                                pst.setInt(7, 0);

                                int z = pst.executeUpdate();

                                if (z != -1) {
                                    int piKey = -1;
                                    piKey = 0;

                                    ResultSet piRs = pst.getGeneratedKeys();
                                    if (piRs.next()) {
                                        piKey = piRs.getInt(1);
                                        System.out.println("============ Saved New PackageItem ID ============");
                                        System.out.println(piKey);
                                        System.out.println("============ Saved New PackageItem ID ============");
                                        packageItemID = piKey;
                                    }
                                }

                            }


                        }

                    }



                }
            }

            return pi;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


    public PackageGroup addPackageList(PackageGroup pg) {
        try {

            int noOfPack = 0;
            Package tmpPackage;

            noOfPack = pg.getPackage_list().size();
            int packageGroupID = 0;
            int packageID = 0;
            int packageItemID = 0;

            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            // To create a package group
            pst = db.get().prepareStatement(
                    "INSERT INTO package_group (package_grp_name, creation_date, quantity, product_id, product_title, status, " +
                            "package_grp_image, grpbuy_start, grpbuy_end, grpbuy_duration, grpbuy_duration_type, min_threshold)"
                            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, pg.getPackage_grp_name());
            pst.setTimestamp(2, createDateTime);
            pst.setInt(3, pg.getQuantity());
            pst.setInt(4, pg.getProduct_id());
            pst.setString(5, pg.getProduct_title());
            pst.setString(6, pg.getStatus());
            pst.setString(7, pg.getPackage_grp_image());

            if (isNull(pg.getGrpbuy_start())) {
                pst.setTimestamp(8, null);
            } else {
                pst.setTimestamp(8, (new java.sql.Timestamp(pg.getGrpbuy_start().getTime())));
            }

            if (isNull(pg.getGrpbuy_end())) {
                pst.setTimestamp(9, null);
            } else {
                pst.setTimestamp(9, (new java.sql.Timestamp(pg.getGrpbuy_end().getTime())));
            }

            pst.setInt(10, pg.getGrpbuy_duration());
            pst.setString(11, pg.getGrpbuy_duration_type());
            pst.setInt(12, pg.getMin_threshold());

            int x = pst.executeUpdate();

            if (x != -1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
                    System.out.println("============ Saved New Package Group ID ============");
                    System.out.println(key);
                    System.out.println("============ Saved New Package Group ID ============");
                    packageGroupID = key;
                }
//                p.setPackage_grp_id(key);
            }

            // To create the list of packages link to the parent package group

            if(packageGroupID > 1) {
                for (int i = 0; i < noOfPack - 1; i++) {  // ignore the last empty/dummy package

                    //tmpProdItem = a[i];

//                System.out.println("============ Saved New Product Item ID ===========> =" + a[i] );

                    pst = db.get().prepareStatement(
                            "INSERT INTO package (package_name, creation_date, description, quantity, regular_price, sale_price, product_id, product_title, product_item_id, item_name, " +
                                    "package_grp_id, status, popularity, likes)"
                                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                    pst.setString(1, pg.getPackage_list().get(i).getPackage_name());
                    pst.setTimestamp(2, createDateTime);
                    pst.setString(3, pg.getPackage_list().get(i).getDescription());
                    pst.setInt(4, pg.getPackage_list().get(i).getQuantity());
                    pst.setDouble(5, pg.getPackage_list().get(i).getRegular_price());
                    pst.setDouble(6, pg.getPackage_list().get(i).getSale_price());
                    pst.setInt(7, pg.getPackage_list().get(i).getProduct_id());
                    pst.setString(8, pg.getPackage_list().get(i).getProduct_title());
                    pst.setInt(9, pg.getPackage_list().get(i).getProduct_item_id());
                    pst.setString(10, pg.getPackage_list().get(i).getItem_name());
                    pst.setInt(11, packageGroupID);
                    pst.setString(12, pg.getPackage_list().get(i).getStatus());
                    pst.setInt(13, pg.getPackage_list().get(i).getPopularity());
                    pst.setInt(14, pg.getPackage_list().get(i).getLikes());

                    int y = pst.executeUpdate();

                    if (y != -1) {
                        int pKey = -1;
                        pKey = 0;

                        ResultSet pRs = pst.getGeneratedKeys();
                        if (pRs.next()) {
                            pKey = pRs.getInt(1);
                            System.out.println("============ Saved New Package ID ============");
                            System.out.println(pKey);
                            System.out.println("============ Saved New Package ID ============");
                            packageID = pKey;

                            // Add package items to the package after the package id created successfully
                            int noItemInPack = 0;
                            noItemInPack = pg.getPackage_list().get(i).getPackage_item_list().size();

                            for (int j = 0; j < noItemInPack; j++) {
                                pst = db.get().prepareStatement(
                                        "INSERT INTO package_item (product_item_id, item_name, package_grp_id, package_id, status, popularity, likes, package_item_image)"
                                                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                                pst.setInt(1,  pg.getPackage_list().get(i).getPackage_item_list().get(j).getProduct_item_id());
                                pst.setString(2, pg.getPackage_list().get(i).getPackage_item_list().get(j).getItem_name());
//                                pst.setInt(1, 99);
//                                pst.setString(2, "p[i][j].getItem_name()");
                                pst.setInt(3, packageGroupID);
                                pst.setInt(4, packageID);
                                pst.setString(5, pg.getPackage_list().get(i).getPackage_item_list().get(j).getStatus());
                                pst.setInt(6, pg.getPackage_list().get(i).getPackage_item_list().get(j).getPopularity());
                                pst.setInt(7, pg.getPackage_list().get(i).getPackage_item_list().get(j).getLikes());
                                pst.setString(8, pg.getPackage_list().get(i).getPackage_item_list().get(j).getPackage_item_image());

                                int z = pst.executeUpdate();

                                if (z != -1) {
                                    int piKey = -1;
                                    piKey = 0;

                                    ResultSet piRs = pst.getGeneratedKeys();
                                    if (piRs.next()) {
                                        piKey = piRs.getInt(1);
                                        System.out.println("============ Saved New PackageItem ID ============");
                                        System.out.println(piKey);
                                        System.out.println("============ Saved New PackageItem ID ============");
                                        packageItemID = piKey;
                                    }
                                }

                            }


                        }

                    }



                }
            }

            return pg;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<PackageGroup> getPackageGroupList(int pid, int uid) {

        List<PackageGroup> pkgGrplist = new ArrayList<>();

        try {
            pst = db.get().prepareStatement(
                    "SELECT g.package_grp_id, g.package_grp_name, g.creation_date, g.quantity, g.product_id, g.product_title, g.status, g.grpbuy_start, g.grpbuy_end, g.grpbuy_duration, " +
                            "g.grpbuy_duration_type, g.package_grp_image, g.min_threshold, count(p.package_id) as package_count " +
                            "FROM package_group g LEFT JOIN package p ON g.package_grp_id = p.package_grp_id " +
                            "WHERE g.product_id = ? GROUP BY g.package_grp_id ORDER BY g.package_grp_id DESC ");


            pst.setInt(1, pid);
            ResultSet rs = pst.executeQuery();

            PackageGroup pg;

            while (rs.next()) {
                pg = new PackageGroup();

                pg.setPackage_grp_id(rs.getInt(1));
                pg.setPackage_grp_name(rs.getString(2));
                pg.setCreation_date(rs.getTimestamp(3));
                pg.setQuantity(rs.getInt(4));
                pg.setProduct_id(rs.getInt(5));
                pg.setProduct_title(rs.getString(6));
                pg.setStatus(rs.getString(7));
                pg.setGrpbuy_start(rs.getTimestamp(8));
                pg.setGrpbuy_end(rs.getTimestamp(9));
                pg.setGrpbuy_duration(rs.getInt(10));
                pg.setGrpbuy_duration_type(rs.getString(11));
                pg.setPackage_grp_image(rs.getString(12));
                pg.setMin_threshold(rs.getInt(13));
                pg.setPackage_count(rs.getInt(14));
                pkgGrplist.add(pg);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return pkgGrplist;
    }


    public List<Product> getProductList(int uid) {

        List<Product> list = new ArrayList<>();

        try {
            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                           "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                           "p.cost, p.category_id, p.seller_id, p.seller_username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image," +
                           "count(g.package_grp_id) as package_grp_count " +
                           "FROM product p JOIN user u ON p.seller_id = u.user_id LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "WHERE p.seller_id = ? GROUP BY p.product_id ORDER BY p.product_id DESC ");
//                           "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE'");

            pst.setInt(1, uid);
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


    public List<Product> getSearchProductList(String str, int uid) {

        List<Product> list = new ArrayList<>();

        try {
            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, p.seller_username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image," +
                            "count(g.package_grp_id) as package_grp_count " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "WHERE p.title LIKE ? AND p.seller_id = ? GROUP BY p.product_id ORDER BY p.product_id DESC ");
//                           "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE'");

            pst.setString(1, "%" + str + "%");
            pst.setInt(2, uid);
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


    public boolean deleteProduct(int pid) {

        boolean success = false;

        try {
            pst = db.get().prepareStatement("DELETE FROM product WHERE product_id = ?");
            pst.setInt(1, pid);
            int r = pst.executeUpdate();

            if (r != -1) {
                success = true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return success;
    }


    public List<ProductPackage> getGroupBuyingList(int uid) {

        List<ProductPackage> pglist = new ArrayList<>();

        try {

            pst = db.get().prepareStatement(
                         "SELECT p.product_id as product_id, p.title as product_title, p.sell_style as sell_style, p.main_image as main_image, " +
                                    "p.grpbuy_start as grpbuy_start, p.grpbuy_end as grpbuy_end, p.grpbuy_status as grpbuy_status, p.grpbuy_quantity as grpbuy_quantity, " +
                                    "p.min_threshold as min_threshold, p.grpbuy_regular_price as grpbuy_regular_price, p.grpbuy_sale_price as grpbuy_sale_price, 'G' as sell_type, " +
                                    "count(g.package_grp_id) as package_count, null as package_grp_id, null as package_grp_name " +
                            "FROM product p LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "WHERE NOT isnull(p.grpbuy_status) AND p.seller_id = ? GROUP BY p.product_id " +
                            "UNION " +
                            "(SELECT g.product_id as product_id, g.product_title as product_title, p.sell_style as sell_style, g.package_grp_image as main_image, " +
                                    "g.grpbuy_start as grpbuy_start, g.grpbuy_end as grpbuy_end, g.status as grpbuy_status, g.quantity as grpbuy_quantity, " +
                                    "g.min_threshold as min_threshold, null as grpbuy_regular_price, null as grpbuy_sale_price, 'P' as sell_type, " +
                                    "count(k.package_id) as package_count, g.package_grp_id as package_grp_id, g.package_grp_name " +
                            "FROM package_group g JOIN product p ON g.product_id = p.product_id LEFT JOIN package k ON g.package_grp_id = k.package_grp_id " +
                            "WHERE p.seller_id = ? GROUP BY g.package_grp_id) " +
                            "ORDER BY product_id DESC, sell_type"
            );

            pst.setInt(1, uid);
            pst.setInt(2, uid);
            ResultSet rs = pst.executeQuery();

            ProductPackage pdt;

            while (rs.next()) {
                pdt = new ProductPackage();
                pdt.setProduct_id(rs.getInt(1));
                pdt.setTitle(rs.getString(2));
                pdt.setSell_style(rs.getString(3));
                pdt.setMain_image(rs.getString(4));
                pdt.setGrpbuy_start(rs.getTimestamp(5));
                pdt.setGrpbuy_end(rs.getTimestamp(6));

/*                if (isNull(rs.getTimestamp(5))) {
                    pdt.setGrpbuy_start(null);
                } else {
                    pdt.setGrpbuy_start((new java.sql.Timestamp(rs.getTimestamp(5).getTime())));
                }
                if (isNull(rs.getTimestamp(6))) {
                    pdt.setGrpbuy_end(null);
                } else {
                    pdt.setGrpbuy_end((new java.sql.Timestamp(rs.getTimestamp(6).getTime())));
                }*/

                pdt.setGrpbuy_status(rs.getString(7));
                pdt.setGrpbuy_quantity(rs.getInt(8));
                pdt.setMin_threshold(rs.getInt(9));
                pdt.setGrpbuy_regular_price(rs.getDouble(10));
                pdt.setGrpbuy_sale_price(rs.getDouble(11));
                pdt.setSell_type(rs.getString(12));
                pdt.setPackage_count(rs.getInt(13));
                pdt.setPkg_grp_id(rs.getInt(14));
                pdt.setPkg_grp_name(rs.getString(15));
                pglist.add(pdt);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return pglist;
    }

    public List<ProductPackage> getSearchGroupBuyingList(String str, int uid) {

        List<ProductPackage> pglist = new ArrayList<>();

        try {

            pst = db.get().prepareStatement(
                    "SELECT p.product_id as product_id, p.title as product_title, p.sell_style as sell_style, p.main_image as main_image, " +
                            "p.grpbuy_start as grpbuy_start, p.grpbuy_end as grpbuy_end, p.grpbuy_status as grpbuy_status, p.grpbuy_quantity as grpbuy_quantity, " +
                            "p.min_threshold as min_threshold, p.grpbuy_regular_price as grpbuy_regular_price, p.grpbuy_sale_price as grpbuy_sale_price, 'G' as sell_type, " +
                            "count(g.package_grp_id) as package_count, null as package_grp_id, null as package_grp_name " +
                            "FROM product p LEFT JOIN package_group g ON p.product_id = g.product_id " +
                            "WHERE NOT isnull(p.grpbuy_status) AND p.seller_id = ? AND p.title LIKE ? GROUP BY p.product_id " +
                            "UNION " +
                            "(SELECT g.product_id as product_id, g.product_title as product_title, p.sell_style as sell_style, g.package_grp_image as main_image, " +
                            "g.grpbuy_start as grpbuy_start, g.grpbuy_end as grpbuy_end, g.status as grpbuy_status, g.quantity as grpbuy_quantity, " +
                            "g.min_threshold as min_threshold, null as grpbuy_regular_price, null as grpbuy_sale_price, 'P' as sell_type, " +
                            "count(k.package_id) as package_count, g.package_grp_id as package_grp_id, g.package_grp_name " +
                            "FROM package_group g JOIN product p ON g.product_id = p.product_id LEFT JOIN package k ON g.package_grp_id = k.package_grp_id " +
                            "WHERE p.seller_id = ? AND (g.product_title LIKE ? OR g.package_grp_name LIKE ?) GROUP BY g.package_grp_id) " +
                            "ORDER BY product_id DESC, sell_type"
            );

            pst.setInt(1, uid);
            pst.setString(2, "%" +str + "%");
            pst.setInt(3, uid);
            pst.setString(4, "%" +str + "%");
            pst.setString(5, "%" +str + "%");
            ResultSet rs = pst.executeQuery();

            ProductPackage pdt;

            while (rs.next()) {
                pdt = new ProductPackage();
                pdt.setProduct_id(rs.getInt(1));
                pdt.setTitle(rs.getString(2));
                pdt.setSell_style(rs.getString(3));
                pdt.setMain_image(rs.getString(4));
                pdt.setGrpbuy_start(rs.getTimestamp(5));
                pdt.setGrpbuy_end(rs.getTimestamp(6));
                pdt.setGrpbuy_status(rs.getString(7));
                pdt.setGrpbuy_quantity(rs.getInt(8));
                pdt.setMin_threshold(rs.getInt(9));
                pdt.setGrpbuy_regular_price(rs.getDouble(10));
                pdt.setGrpbuy_sale_price(rs.getDouble(11));
                pdt.setSell_type(rs.getString(12));
                pdt.setPackage_count(rs.getInt(13));
                pdt.setPkg_grp_id(rs.getInt(14));
                pdt.setPkg_grp_name(rs.getString(15));
                pglist.add(pdt);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return pglist;
    }


    public List<ProductPackage> getProductPackageList(int uid) {

        List<ProductPackage> pglist = new ArrayList<>();

        try {

            // Extract the records offer the selling of single product
/*            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, u.username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image, 'S' as sell_type, " +
                            "p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id " +
                            "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('S', 'SG', 'SP', 'SGP')");*/

            pst = db.get().prepareStatement(
                        "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                                "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                                "p.cost, p.category_id, p.seller_id, u.username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image, 'S' as sell_type, " +
                                "p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price, p.grpbuy_status, " +
                                "c.category_name, b.brand_name, " +
                                "w.user_id as wished " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id JOIN category c on p.category_id = c.category_id JOIN brand b on p.brand_id = b.brand_id " +
                            "LEFT JOIN wishlist w ON p.product_id = w.product_id AND w.user_id = ? " +
                            "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('S', 'SG', 'SP', 'SGP')") ;

            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();

            ProductPackage pdt;

            while (rs.next()) {
                pdt = new ProductPackage();
                pdt.setProduct_id(rs.getInt(1));
                pdt.setTitle(rs.getString(2));
                pdt.setCreation_date(rs.getTimestamp(3));
                pdt.setSell_style(rs.getString(4));
                pdt.setDescription(rs.getString(5));
                pdt.setImage_urls(rs.getString(6));
                pdt.setBrand_id(rs.getInt(7));
                pdt.setMaterial(rs.getString(8));
                pdt.setDelivery_date(rs.getTimestamp(9));
                pdt.setDelivery_method(rs.getString(10));
                pdt.setDelivery_region(rs.getString(11));
                pdt.setMin_threshold(rs.getInt(12));
                pdt.setStock_quantity(rs.getInt(13));
                pdt.setStock_status(rs.getString(14));
                pdt.setStatus(rs.getString(15));
                pdt.setCost(rs.getDouble(16));
                pdt.setCategory_id(rs.getInt(17));
                pdt.setSeller_id(rs.getInt(18));
                pdt.setSeller_username(rs.getString(19));
                pdt.setLikes(rs.getInt(20));
                pdt.setRegular_price(rs.getDouble(21));
                pdt.setSale_price(rs.getDouble(22));
                pdt.setDisplay_position(rs.getInt(23));
                pdt.setMain_image(rs.getString(24));
                pdt.setSell_type(rs.getString(25));
                pdt.setGrpbuy_start(rs.getTimestamp(26));
                pdt.setGrpbuy_end(rs.getTimestamp(27));
                pdt.setGrpbuy_quantity(rs.getInt(28));
                pdt.setGrpbuy_regular_price(rs.getDouble(29));
                pdt.setGrpbuy_sale_price(rs.getDouble(30));
                pdt.setGrpbuy_status(rs.getString(31));
                pdt.setCategory_name(rs.getString(32));
                pdt.setBrand_name(rs.getString(33));
                pdt.setWished(rs.getString(34));
                pdt.setReview_overall_score(this.getReviewOverallSorce(rs.getInt(1)));
                pglist.add(pdt);
            }

            // Extract the records for offering group buying of single product
/*            PreparedStatement pst3 = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, u.username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image, 'G' as sell_type, " +
                            "p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price " +
                            "FROM product p JOIN user u ON p.seller_id = u.user_id " +
                            "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('G', 'SG', 'GP', 'SGP')");*/

            PreparedStatement pst3 = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                            "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, " +
                            "p.cost, p.category_id, p.seller_id, u.username, p.likes, p.regular_price, p.sale_price, p.display_position, p.main_image, 'G' as sell_type, " +
                            "p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price, p.grpbuy_status, " +
                            "c.category_name, b.brand_name, " +
                            "w.user_id as wished " +
                        "FROM product p JOIN user u ON p.seller_id = u.user_id JOIN category c on p.category_id = c.category_id JOIN brand b on p.brand_id = b.brand_id " +
                        "LEFT JOIN wishlist w ON p.product_id = w.product_id AND w.user_id = ? " +
                        "WHERE p.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('G', 'SG', 'GP', 'SGP')");

            pst3.setInt(1, uid);
            ResultSet rs3 = pst3.executeQuery();

            ProductPackage pdt3;

            while (rs3.next()) {
                pdt3 = new ProductPackage();
                pdt3.setProduct_id(rs3.getInt(1));
                pdt3.setTitle(rs3.getString(2));
                pdt3.setCreation_date(rs3.getTimestamp(3));
                pdt3.setSell_style(rs3.getString(4));
                pdt3.setDescription(rs3.getString(5));
                pdt3.setImage_urls(rs3.getString(6));
                pdt3.setBrand_id(rs3.getInt(7));
                pdt3.setMaterial(rs3.getString(8));
                pdt3.setDelivery_date(rs3.getTimestamp(9));
                pdt3.setDelivery_method(rs3.getString(10));
                pdt3.setDelivery_region(rs3.getString(11));
                pdt3.setMin_threshold(rs3.getInt(12));
                pdt3.setStock_quantity(rs3.getInt(13));
                pdt3.setStock_status(rs3.getString(14));
                pdt3.setStatus(rs3.getString(15));
                pdt3.setCost(rs3.getDouble(16));
                pdt3.setCategory_id(rs3.getInt(17));
                pdt3.setSeller_id(rs3.getInt(18));
                pdt3.setSeller_username(rs3.getString(19));
                pdt3.setLikes(rs3.getInt(20));
                pdt3.setRegular_price(rs3.getDouble(21));
                pdt3.setSale_price(rs3.getDouble(22));
                pdt3.setDisplay_position(rs3.getInt(23));
                pdt3.setMain_image(rs3.getString(24));
                pdt3.setSell_type(rs3.getString(25));
                pdt3.setGrpbuy_start(rs3.getTimestamp(26));
                pdt3.setGrpbuy_end(rs3.getTimestamp(27));
                pdt3.setGrpbuy_quantity(rs3.getInt(28));
                pdt3.setGrpbuy_regular_price(rs3.getDouble(29));
                pdt3.setGrpbuy_sale_price(rs3.getDouble(30));
                pdt3.setGrpbuy_status(rs3.getString(31));
                pdt3.setCategory_name(rs3.getString(32));
                pdt3.setBrand_name(rs3.getString(33));
                pdt3.setWished(rs3.getString(34));
                pdt3.setReview_overall_score(this.getReviewOverallSorce(rs3.getInt(1)));
                pglist.add(pdt3);
            }

            // Extract the records for offering Package Group Buying
/*            PreparedStatement pst2 = db.get().prepareStatement(
                "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                        "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, p.cost, p.category_id, p.seller_id, u.username, p.likes, " +
                        "p.regular_price, p.sale_price, p.display_position, p.main_image, 'P' as sell_type, g.package_grp_id, g.package_grp_name, g.creation_date, g.quantity, " +
                        "g.product_id, g.product_title, g.status, g.package_grp_image, g.grpbuy_start, g.grpbuy_end, g.grpbuy_duration, g.grpbuy_duration_type " +
                        "FROM product p JOIN package_group g ON p.product_id = g.product_id JOIN user u on p.seller_id = u.user_id " +
                        "WHERE p.status = 'ACTIVE' and g.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('P', 'SP', 'GP', 'SGP')");*/

            PreparedStatement pst2 = db.get().prepareStatement(
                "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, " +
                        "p.delivery_region, p.min_threshold, p.stock_quantity, p.stock_status, p.status, p.cost, p.category_id, p.seller_id, u.username, p.likes, " +
                        "p.regular_price, p.sale_price, p.display_position, p.main_image, 'P' as sell_type, g.package_grp_id, g.package_grp_name, g.creation_date, g.quantity, " +
                        "g.product_id, g.product_title, g.status, g.package_grp_image, g.grpbuy_start, g.grpbuy_end, g.grpbuy_duration, g.grpbuy_duration_type, g.status, g.min_threshold, " +
                        "c.category_name, b.brand_name, " +
                        "w.user_id as wished " +
                    "FROM product p JOIN package_group g ON p.product_id = g.product_id JOIN user u on p.seller_id = u.user_id " +
                    "JOIN category c on p.category_id = c.category_id JOIN brand b on p.brand_id = b.brand_id " +
                    "LEFT JOIN wishlist w ON g.package_grp_id = w.package_grp_id AND w.user_id = ? " +
                    "WHERE p.status = 'ACTIVE' and g.status = 'ACTIVE' and u.status = 'ACTIVE' and p.sell_style IN ('P', 'SP', 'GP', 'SGP')");

            pst2.setInt(1, uid);
            ResultSet rs2 = pst2.executeQuery();

            ProductPackage pkg;

            while (rs2.next()) {
                pkg = new ProductPackage();
                pkg.setProduct_id(rs2.getInt(1));
                pkg.setTitle(rs2.getString(2));
                pkg.setCreation_date(rs2.getTimestamp(3));
                pkg.setSell_style(rs2.getString(4));
                pkg.setDescription(rs2.getString(5));
                pkg.setImage_urls(rs2.getString(6));
                pkg.setBrand_id(rs2.getInt(7));
                pkg.setMaterial(rs2.getString(8));
                pkg.setDelivery_date(rs2.getTimestamp(9));
                pkg.setDelivery_method(rs2.getString(10));
                pkg.setDelivery_region(rs2.getString(11));
                pkg.setMin_threshold(rs2.getInt(12));
                pkg.setStock_quantity(rs2.getInt(13));
                pkg.setStock_status(rs2.getString(14));
                pkg.setStatus(rs2.getString(15));
                pkg.setCost(rs2.getDouble(16));
                pkg.setCategory_id(rs2.getInt(17));
                pkg.setSeller_id(rs2.getInt(18));
                pkg.setSeller_username(rs2.getString(19));
                pkg.setLikes(rs2.getInt(20));
                pkg.setRegular_price(rs2.getDouble(21));
                pkg.setSale_price(rs2.getDouble(22));
                pkg.setDisplay_position(rs2.getInt(23));
                pkg.setMain_image(rs2.getString(24));
                pkg.setSell_type(rs2.getString(25));
                pkg.setPkg_grp_id(rs2.getInt(26));
                pkg.setPkg_grp_name(rs2.getString(27));
                pkg.setPkg_creation_date(rs2.getDate(28));
                pkg.setPkg_quantity((rs2.getInt(29)));
                pkg.setPkg_product_id(rs2.getInt(30));
                pkg.setPkg_product_title(rs2.getString(31));
                pkg.setPkg_status(rs2.getString(32));
                pkg.setPkg_grp_image(rs2.getString(33));

                System.out.println("============ getProductPackageList setPkg_grpbuy_start ============" + rs2.getTimestamp(34));
                System.out.println("============ getProductPackageList setPkg_grpbuy_start ============" + rs2.getTimestamp(34).getTime());
//                System.out.println("============ getProductPackageList setPkg_grpbuy_start ============" + rs2.getTimestamp(35).getTime());
                System.out.println("============ getProductPackageList setPkg_grpbuy_start ============" + (new java.sql.Timestamp(rs2.getTimestamp(34).getTime())));


                pkg.setPkg_grpbuy_start(new java.sql.Timestamp(rs2.getTimestamp(34).getTime()));
                pkg.setPkg_grpbuy_end(new java.sql.Timestamp(rs2.getTimestamp(35).getTime()));

//                pkg.setPkg_grpbuy_end(rs2.getDate(36));
                pkg.setPkg_grpbuy_duration(rs2.getInt(36));
                pkg.setPkg_grpbuy_duration_type(rs2.getString(37));
                pkg.setPkg_status(rs2.getString(38));
                pkg.setPkg_min_threshold(rs2.getInt(39));
                pkg.setCategory_name(rs2.getString(40));
                pkg.setBrand_name(rs2.getString(41));
                pkg.setWished(rs2.getString(42));
                pkg.setReview_overall_score(this.getReviewOverallSorce(rs2.getInt(1)));
                pglist.add(pkg);
            }


        } catch (Exception e) {
            System.out.println(e);
        }
        return pglist;
    }


    public CartItem addItemToCart(CartItem ci) {

        try {

            pst = db.get().prepareStatement(
                    "INSERT INTO cart (buyer_id, product_id, product_title, package_id, package_name, seller_id, seller_username, quantity, unit_price, " +
                            "sub_Total, sell_type, item_image_url, package_grp_id, package_grp_name, grpbuy_end) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            pst.setInt(1, ci.getBuyer_id());
            pst.setInt(2, ci.getProduct_id());
            pst.setString(3, ci.getProduct_title());
            pst.setInt(4, ci.getPackage_id());
            pst.setString(5, ci.getPackage_name());
            pst.setInt(6, ci.getSeller_id());
            pst.setString(7, ci.getSeller_username());
            pst.setInt(8, ci.getQuantity());
            pst.setDouble(9, ci.getUnit_price());
            pst.setDouble(10, ci.getSub_Total());
            pst.setString(11, ci.getSell_type());
            pst.setString(12, ci.getItem_image_url());
            pst.setInt(13, ci.getPackage_grp_id());
            pst.setString(14, ci.getPackage_grp_name());
            pst.setTimestamp(15, ci.getGrpbuy_end());

            int x = pst.executeUpdate();

            if (x == 1) {
                System.out.println("============ Added item to Cart ============");
                return ci;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<CartItem> getItemsInCart(int userId) {

        List<CartItem> list = new ArrayList<>();

        try {

            pst = db.get().prepareStatement(
                    "SELECT cart_id, buyer_id, product_id, product_title, package_id, package_name, seller_id, seller_username, quantity, unit_price, sub_Total, " +
                            "sell_type, item_image_url, package_grp_id, package_grp_name, grpbuy_end FROM cart WHERE buyer_id = ?");

            pst.setInt(1, userId);
            ResultSet rs = pst.executeQuery();

            CartItem ci;
            while (rs.next()) {
                ci = new CartItem();
                ci.setCart_id(rs.getInt(1));
                ci.setBuyer_id(rs.getInt(2));
                ci.setProduct_id(rs.getInt(3));
                ci.setProduct_title(rs.getString(4));
                ci.setPackage_id(rs.getInt(5));
                ci.setPackage_name(rs.getString(6));
                ci.setSeller_id(rs.getInt(7));
                ci.setSeller_username(rs.getString(8));
                ci.setQuantity(rs.getInt(9));
                ci.setUnit_price(rs.getDouble(10));
                ci.setSub_Total(rs.getDouble(11));
                ci.setSell_type(rs.getString(12));
                ci.setItem_image_url(rs.getString(13));
                ci.setPackage_grp_id(rs.getInt(14));
                ci.setPackage_grp_name(rs.getString(15));
                ci.setGrpbuy_end(rs.getTimestamp(16));
                list.add(ci);
            }

            for(int i = 0; i < list.size(); i++) {
                if(list.get(i).getSell_type().equals("P")) {
                    PreparedStatement pst2 = db.get().prepareStatement(
                         "SELECT p.package_item_id, p.product_item_id, p.item_name, p.package_grp_id, p.package_id, p.status, p.popularity, p.likes, i.item_image " +
                            "FROM package_item p join product_item i on p.product_item_id = i.product_item_id WHERE p.package_id = ? ORDER BY p.product_item_id");

                    pst2.setInt(1, list.get(i).getPackage_id());
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

                    list.get(i).setPackage_item_list(packageItemList);


                }
            }


        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }


    public boolean updateCartItem(CartItem ci) {

        try {

            pst = db.get().prepareStatement("UPDATE cart SET quantity = ?, sub_total = ? WHERE cart_id = ?");
            pst.setInt(1, ci.getQuantity());
            pst.setDouble(2, ci.getSub_Total());
            pst.setInt(3, ci.getCart_id());

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }


    public boolean removeItemFromCart(int cid) {

        try {
            pst = db.get().prepareStatement("DELETE FROM cart WHERE cart_id = ?");

            pst.setInt(1, cid);

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public Order createOrder(Order ord) {
        try {

            java.sql.Timestamp orderDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            pst = db.get().prepareStatement(
                    "INSERT INTO orders (order_date, sub_total, shipping_fee, tax, order_total, shipping_firstname, shipping_lastname, shipping_email, shipping_phone, " +
                            "shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, progress_status, buyer_id, buyer_username, buyer_email, " +
                            "buyer_firstname, buyer_lastname, buyer_phone, buyer_address, buyer_country, buyer_post_code, seller_id, seller_username, product_id, " +
                            "product_title, package_id, package_name, quantity, shipping_method, card_holder_name, card_number, card_expiry_date, card_cvv, gateway_fee) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pst.setTimestamp(1, orderDateTime);
            pst.setDouble(2, ord.getSub_total());
            pst.setDouble(3, ord.getShipping_fee());
            pst.setDouble(4, ord.getTax());
            pst.setDouble(5, ord.getOrder_total());

            pst.setString(6, ord.getShipping_firstname());
            pst.setString(7, ord.getShipping_lastname());
            pst.setString(8, ord.getShipping_email());
            pst.setString(9, ord.getShipping_phone());

            pst.setString(10, ord.getShipping_address());
            pst.setString(11, ord.getShipping_country());
            pst.setString(12, ord.getShipping_post_code());
            pst.setString(13, ord.getPayment_status());
            pst.setString(14, ord.getPayment_method());
            pst.setString(15, ord.getProgress_status());
            pst.setInt(16, ord.getBuyer_id());
            pst.setString(17, ord.getBuyer_username());
            pst.setString(18, ord.getBuyer_email());

            pst.setString(19, ord.getBuyer_firstname());
            pst.setString(20, ord.getBuyer_lastname());
            pst.setString(21, ord.getBuyer_phone());
            pst.setString(22, ord.getBuyer_address());
            pst.setString(23, ord.getBuyer_country());
            pst.setString(24, ord.getBuyer_post_code());

            pst.setInt(25, ord.getSeller_id());
            pst.setString(26, ord.getSeller_username());
            pst.setInt(27, ord.getProduct_id());
            pst.setString(28, ord.getProduct_title());
            pst.setInt(29, ord.getPackage_id());
            pst.setString(30, ord.getPackage_name());
            pst.setInt(31, ord.getQuantity());
            pst.setString(32, ord.getShipping_method());
            pst.setString(33, ord.getCard_holder_name());
            pst.setString(34, ord.getCard_number());
            pst.setString(35, ord.getCard_expiry_date());
            pst.setString(36, ord.getCard_cvv());
            pst.setDouble(37, ord.getGateway_fee());

            int x = pst.executeUpdate();
            if (x != -1) {

                ResultSet genKeys = pst.getGeneratedKeys();
                int orderId = 0;

                if (genKeys.next()) {
                    orderId = genKeys.getInt(1);
                    ord.setOrder_id(orderId);
                }

                List<OrderDetail> orderDetailList = ord.getOrder_detail_list();

                PreparedStatement pst2 = db.get().prepareStatement(
                        "INSERT INTO order_details (order_id, product_id, seller_id, seller_username, product_title, product_unit_price, " +
                                "product_image_url, status, quantity, sub_total, delivery_date, sell_type, package_grp_id, package_grp_name, package_id, package_name, grpbuy_end) " +
                                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


                // To update the quantity for sell_type = 'S'
                boolean isSItem = false;
                PreparedStatement pst4 = db.get().prepareStatement(
                        "UPDATE product SET stock_quantity = stock_quantity - ? " +
                                "WHERE product_id = ?");

                // To update the quantity for sell_type = 'G'
                boolean isGItem = false;
                PreparedStatement pst5 = db.get().prepareStatement(
                        "UPDATE product SET grpbuy_quantity = grpbuy_quantity - ? " +
                                "WHERE product_id = ?");


                // To update the quantity for sell_type = 'P'
                boolean isPItem = false;
                PreparedStatement pst6 = db.get().prepareStatement(
                        "UPDATE package set quantity = quantity - ? " +
                                "WHERE package_id = ?");


                // To update the seller's balance for sell_type = 'S'
                boolean isBalance = false;
                PreparedStatement pst7 = db.get().prepareStatement(
                        "UPDATE user SET balance = IFNULL(balance, 0) + ? " +
                                "WHERE user_id = ?");

                // To update the seller's hold fund for sell_type = 'G' or 'P'
                boolean isHoldFund = false;
                PreparedStatement pst8 = db.get().prepareStatement(
                        "UPDATE user SET hold_fund = IFNULL(hold_fund, 0) + ? " +
                                "WHERE user_id = ?");


                for (OrderDetail od : orderDetailList) {
//                    System.out.println("============ OrderDetail ============" + od);

                    pst2.setInt(1, orderId);
                    pst2.setInt(2, od.getProduct_id());
                    pst2.setInt(3, od.getSeller_id());
                    pst2.setString(4, od.getSeller_username());
                    pst2.setString(5, od.getProduct_title());
                    pst2.setDouble(6, od.getProduct_unit_price());
                    pst2.setString(7, od.getProduct_image_url());
                    pst2.setString(8, od.getStatus());
                    pst2.setInt(9, od.getQuantity());
                    pst2.setDouble(10, od.getSub_total());
                    pst2.setTimestamp(11, od.getDelivery_date());
                    pst2.setString(12, od.getSell_type());
                    pst2.setInt(13, od.getPackage_grp_id());
                    pst2.setString(14, od.getPackage_grp_name());
                    pst2.setInt(15, od.getPackage_id());
                    pst2.setString(16, od.getPackage_name());
                    pst2.setTimestamp(17, od.getGrpbuy_end());
                    pst2.addBatch();

                    if (od.getSell_type().equals("S")) {
                        pst4.setInt(1, od.getQuantity());
                        pst4.setInt(2, od.getProduct_id());
                        pst4.addBatch();
                        isSItem = true;

                        pst7.setDouble(1, od.getSub_total());
                        pst7.setInt(2, od.getSeller_id());
                        pst7.addBatch();
                        isBalance = true;
;                    }

                    if (od.getSell_type().equals("G")) {
                        pst5.setInt(1, od.getQuantity());
                        pst5.setInt(2, od.getProduct_id());
                        pst5.addBatch();
                        isGItem = true;

                        pst8.setDouble(1, od.getSub_total());
                        pst8.setInt(2, od.getSeller_id());
                        pst8.addBatch();
                        isHoldFund = true;

                    }

                    if (od.getSell_type().equals("P")) {
                        pst6.setInt(1, od.getQuantity());
                        pst6.setInt(2, od.getPackage_id());
                        pst6.addBatch();
                        isPItem = true;

                        pst8.setDouble(1, 33);
                        pst8.setInt(2, od.getSeller_id());
                        pst8.addBatch();
                        isHoldFund = true;
                    }

                }
                pst2.executeBatch();

                if (isSItem) {
                    pst4.executeBatch();
                }

                if (isGItem) {
                    pst5.executeBatch();
                }

                if (isPItem) {
                    pst6.executeBatch();
                }

                if (isBalance) {
                    pst7.executeBatch();
                }

                if (isHoldFund) {
                    pst8.executeBatch();
                }

                PreparedStatement pst3 = db.get().prepareStatement("DELETE FROM cart WHERE buyer_id = ?");
                pst3.setInt(1, ord.getBuyer_id());
                pst3.executeUpdate();

                return ord;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public Product getProduct(int pid) {

        Product pdt = null;

        try {


/*
            pst = db.get().prepareStatement(
                    "SELECT product_id, title, creation_date, sell_style, description, image_urls, brand_id, material, delivery_date, delivery_method, delivery_region, " +
                            "min_threshold, stock_quantity, stock_status, status, cost, regular_price, sale_price, category_id, seller_id, seller_username, likes, " +
                            "display_position, main_image, grpbuy_start, grpbuy_end, grpbuy_quantity, grpbuy_regular_price, grpbuy_sale_price FROM product WHERE product_id = ?");
*/

            pst = db.get().prepareStatement(
//                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, p.delivery_region, " +
//                    "p.min_threshold, p.stock_quantity, p.stock_status, p.status, p.cost, p.regular_price, p.sale_price, p.category_id, p.seller_id, p.seller_username, p.likes, " +
//                    "p.display_position, p.main_image, p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price, " +
//                    "c.category_name, b.brand_name " +
//                    "FROM product p LEFT JOIN category c on p.category_id = c.category_id LEFT JOIN brand b on p.brand_id = b.brand_id " +
//                    "WHERE p.product_id = ?");

                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, p.delivery_region, " +
                            "p.min_threshold, p.stock_quantity, p.stock_status, p.status, p.cost, p.regular_price, p.sale_price, p.category_id, p.seller_id, p.seller_username, p.likes, " +
                            "p.display_position, p.main_image, p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price, " +
                            "c.category_name, b.brand_name, SUM(IFNULL(o.quantity,0)) as grpbuy_order_count " +
                    "FROM product p LEFT JOIN category c ON p.category_id = c.category_id LEFT JOIN brand b ON p.brand_id = b.brand_id " +
                                   "LEFT JOIN order_details o ON o.product_id = p.product_id AND o.sell_type = 'G' AND o.grpbuy_end = p.grpbuy_end " +
                    "WHERE p.product_id = ? " +
                    "GROUP BY p.product_id ");

            pst.setInt(1, pid);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                pdt = new Product();
                pdt.setProduct_id(rs.getInt(1));
                pdt.setTitle(rs.getString(2));
                pdt.setCreation_date(rs.getTimestamp(3));
                pdt.setSell_style(rs.getString(4));
                pdt.setDescription(rs.getString(5));
                pdt.setImage_urls(rs.getString(6));
                pdt.setBrand_id(rs.getInt(7));
                pdt.setMaterial(rs.getString(8));
                pdt.setDelivery_date(rs.getDate(9));
                pdt.setDelivery_method(rs.getString(10));
                pdt.setDelivery_region(rs.getString(11));
                pdt.setMin_threshold(rs.getInt(12));
                pdt.setStock_quantity(rs.getInt(13));
                pdt.setStock_status(rs.getString(14));
                pdt.setStatus(rs.getString(15));
                pdt.setCost(rs.getDouble(16));
                pdt.setRegular_price(rs.getDouble(17));
                pdt.setSale_price(rs.getDouble(18));
                pdt.setCategory_id(rs.getInt(19));
                pdt.setSeller_id(rs.getInt(20));
                pdt.setSeller_username(rs.getString(21));
                pdt.setLikes(rs.getInt(22));
                pdt.setDisplay_position(rs.getInt(23));
                pdt.setMain_image(rs.getString(24));
                pdt.setGrpbuy_start(rs.getTimestamp(25));
                pdt.setGrpbuy_end(rs.getTimestamp(26));
                pdt.setGrpbuy_quantity(rs.getInt(27));
                pdt.setGrpbuy_regular_price(rs.getDouble(28));
                pdt.setGrpbuy_sale_price(rs.getDouble(29));
                pdt.setCategory_name(rs.getString(30));
                pdt.setBrand_name(rs.getString(31));
                pdt.setGrpbuy_order_count(rs.getInt(32));
            }

            if (pdt != null) {
                pdt.setReview_overall_score(this.getReviewOverallSorce(pid));
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return pdt;
    }

    public List<ProductItem> getProductItem(int pid) {

        List<ProductItem> productItemList = new ArrayList<>();

        try {
            pst = db.get().prepareStatement(
                    "SELECT product_item_id, item_name, creation_date, regular_price, sale_price, quantity, description, popularity, status, product_id, product_title, item_image, item_seq " +
                            "FROM product_item WHERE product_id = ? and status = 'Active' ORDER BY product_item_id, item_seq");

            pst.setInt(1, pid);
            ResultSet rs = pst.executeQuery();

            ProductItem pdtItem = null;

            while (rs.next()) {
                pdtItem = new ProductItem();
                pdtItem.setProduct_item_id(rs.getInt(1));
                pdtItem.setItem_name(rs.getString(2));
                pdtItem.setCreation_date(rs.getTimestamp(3));
                pdtItem.setRegular_price(rs.getDouble(4));
                pdtItem.setSale_price(rs.getDouble(5));
                pdtItem.setQuantity(rs.getInt(6));
                pdtItem.setDescription(rs.getString(7));
                pdtItem.setPopularity(rs.getInt(8));
                pdtItem.setStatus(rs.getString(9));
                pdtItem.setProduct_id(rs.getInt(10));
                pdtItem.setProduct_title(rs.getString(11));
                pdtItem.setItem_image(rs.getString(12));
                pdtItem.setItem_seq(rs.getInt(13));

                productItemList.add(pdtItem);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return productItemList;
    }

    public Product getProductEditMain(int pid, int uid) {

        Product pdt = null;

        try {

            pst = db.get().prepareStatement(
                    "SELECT p.product_id, p.title, p.creation_date, p.sell_style, p.description, p.image_urls, p.brand_id, p.material, p.delivery_date, p.delivery_method, p.delivery_region, " +
                            "p.min_threshold, p.stock_quantity, p.stock_status, p.status, p.cost, p.regular_price, p.sale_price, p.category_id, p.seller_id, p.seller_username, p.likes, " +
                            "p.display_position, p.main_image, p.grpbuy_start, p.grpbuy_end, p.grpbuy_quantity, p.grpbuy_regular_price, p.grpbuy_sale_price, p.grpbuy_status, " +
                            "c.category_name, b.brand_name " +
                            "FROM product p LEFT JOIN category c on p.category_id = c.category_id LEFT JOIN brand b on p.brand_id = b.brand_id " +
                            "WHERE p.product_id = ? and p.seller_id = ?");

            pst.setInt(1, pid);
            pst.setInt(2, uid);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                pdt = new Product();
                pdt.setProduct_id(rs.getInt(1));
                pdt.setTitle(rs.getString(2));
                pdt.setCreation_date(rs.getTimestamp(3));
                pdt.setSell_style(rs.getString(4));
                pdt.setDescription(rs.getString(5));
                pdt.setImage_urls(rs.getString(6));
                pdt.setBrand_id(rs.getInt(7));
                pdt.setMaterial(rs.getString(8));
                pdt.setDelivery_date(rs.getDate(9));
                pdt.setDelivery_method(rs.getString(10));
                pdt.setDelivery_region(rs.getString(11));
                pdt.setMin_threshold(rs.getInt(12));
                pdt.setStock_quantity(rs.getInt(13));
                pdt.setStock_status(rs.getString(14));
                pdt.setStatus(rs.getString(15));
                pdt.setCost(rs.getDouble(16));
                pdt.setRegular_price(rs.getDouble(17));
                pdt.setSale_price(rs.getDouble(18));
                pdt.setCategory_id(rs.getInt(19));
                pdt.setSeller_id(rs.getInt(20));
                pdt.setSeller_username(rs.getString(21));
                pdt.setLikes(rs.getInt(22));
                pdt.setDisplay_position(rs.getInt(23));
                pdt.setMain_image(rs.getString(24));
                pdt.setGrpbuy_start(rs.getTimestamp(25));
                pdt.setGrpbuy_end(rs.getTimestamp(26));
                pdt.setGrpbuy_quantity(rs.getInt(27));
                pdt.setGrpbuy_regular_price(rs.getDouble(28));
                pdt.setGrpbuy_sale_price(rs.getDouble(29));
                pdt.setGrpbuy_status(rs.getString(30));
                pdt.setCategory_name(rs.getString(31));
                pdt.setBrand_name(rs.getString(32));
            }

            List<ProductItem> ProductItem = this.getProductItem(pid);

            if (pdt != null) {
                pdt.setProduct_item_list(ProductItem);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return pdt;
    }


    public PackageGroup getPackageGroup(int gid, int uid) {

        PackageGroup pkgGrp = null;
        Product product = null;
        int pid = 0;

        try {


            System.out.println("============ UserDA getPackageGroup ============ gid : " + gid);

/*            pst = db.get().prepareStatement(
                    "SELECT package_grp_id, package_grp_name, creation_date, quantity, product_id, product_title, status, " +
                            "package_grp_image, grpbuy_start, grpbuy_end, grpbuy_duration, grpbuy_duration_type " +
                            "FROM package_group WHERE package_grp_id = ?");*/

            pst = db.get().prepareStatement(
                    "SELECT p.package_grp_id, p.package_grp_name, p.creation_date, p.quantity, p.product_id, p.product_title, p.status, " +
                        "p.package_grp_image, p.grpbuy_start, p.grpbuy_end, p.grpbuy_duration, p.grpbuy_duration_type, p.min_threshold, " +
                        "w.user_id as wished " +
                    "FROM package_group p LEFT JOIN wishlist w ON p.package_grp_id = w.package_grp_id AND w.user_id = ? " +
                    "WHERE p.package_grp_id = ?");

            pst.setInt(1, uid);
            pst.setInt(2, gid);
            ResultSet rs = pst.executeQuery();
            System.out.println("11111111111111111111111111111111111111111111111");
            while (rs.next()) {
                pkgGrp = new PackageGroup();
                pkgGrp.setPackage_grp_id(rs.getInt(1));
                pkgGrp.setPackage_grp_name(rs.getString(2));
                pkgGrp.setCreation_date(rs.getTimestamp(3));
                pkgGrp.setQuantity(rs.getInt(4));
                pkgGrp.setProduct_id(rs.getInt(5));
                pkgGrp.setProduct_title(rs.getString(6));
                pkgGrp.setStatus((rs.getString(7)));
                pkgGrp.setPackage_grp_image(rs.getString(8));

                if (isNull(rs.getTimestamp(9))) {
                    pkgGrp.setGrpbuy_start(null);
                } else {
                    pkgGrp.setGrpbuy_start(new java.sql.Timestamp(rs.getTimestamp(9).getTime()));
                }
                if (isNull(rs.getTimestamp(10))) {
                    pkgGrp.setGrpbuy_end(null);
                } else {
                    pkgGrp.setGrpbuy_end(new java.sql.Timestamp(rs.getTimestamp(10).getTime()));
                }

//                pkgGrp.setGrpbuy_start(new java.sql.Timestamp(rs.getTimestamp(9).getTime()));
//                pkgGrp.setGrpbuy_end(new java.sql.Timestamp(rs.getTimestamp(10).getTime()));

                pkgGrp.setGrpbuy_duration(rs.getInt(11));
                pkgGrp.setGrpbuy_duration_type(rs.getString(12));
                pkgGrp.setMin_threshold(rs.getInt(13));
                pkgGrp.setWished(rs.getString(14));
                pid = pkgGrp.getProduct_id();
            }

            product = this.getProduct(pid);
            pkgGrp.setProduct(product);

            List<Package> packageList = new ArrayList<>();
            System.out.println("2222222222222222222222222222222222222222");
/*
            PreparedStatement pst2 = db.get().prepareStatement(
                    "SELECT package_id, package_name, creation_date, description, quantity, regular_price, sale_price, product_id, product_title, product_item_id, item_name, " +
                            "package_grp_id, status, popularity, likes FROM package WHERE package_grp_id = ?");
*/

            PreparedStatement pst2 = db.get().prepareStatement(
                    "SELECT p.package_id, p.package_name, p.creation_date, p.description, p.quantity, p.regular_price, p.sale_price, p.product_id, p.product_title, p.product_item_id, p.item_name, " +
                                "p.package_grp_id, p.status, p.popularity, p.likes, w.user_id as wished, SUM(IFNULL(d.quantity,0)) as grpbuy_order_count " +
                        "FROM package p LEFT JOIN wishlist w ON p.package_id = w.package_id AND w.user_id = ? " +
                                       "LEFT JOIN order_details d ON d.package_id = p.package_id and d.sell_type = 'P' and d.grpbuy_end = ? " +
                        "WHERE p.package_grp_id = ? " +
                        "GROUP BY p.package_id");

/*                    "SELECT p.package_id, p.package_name, p.creation_date, p.description, p.quantity, p.regular_price, p.sale_price, p.product_id, p.product_title, p.product_item_id, p.item_name, " +
                        "p.package_grp_id, p.status, p.popularity, p.likes, " +
                        "w.user_id as wished " +
                    "FROM package p LEFT JOIN wishlist w ON p.package_id = w.package_id AND w.user_id = ? " +
                    "WHERE p.package_grp_id = ?");*/



            pst2.setInt(1, uid);
            pst2.setTimestamp(2, pkgGrp.getGrpbuy_end());
            pst2.setInt(3, gid);

            ResultSet rs2 = pst2.executeQuery();

            Package pkg;

            while (rs2.next()) {
                pkg = new Package();

                pkg.setPackage_id(rs2.getInt(1));
                pkg.setPackage_name(rs2.getString(2));
                pkg.setCreation_date(rs2.getDate(3));
                pkg.setDescription(rs2.getString(4));
                pkg.setQuantity(rs2.getInt(5));;
                pkg.setRegular_price(rs2.getDouble(6));
                pkg.setSale_price((rs2.getDouble(7)));
                pkg.setProduct_id(rs2.getInt(8));
                pkg.setProduct_title((rs2.getString(9)));
                pkg.setProduct_item_id(rs2.getInt(10));
                pkg.setItem_name(rs2.getString(11));
                pkg.setPackage_grp_id(rs2.getInt(12));
                pkg.setStatus(rs2.getString(13));
                pkg.setPopularity(rs2.getInt(14));
                pkg.setLikes(rs2.getInt(15));
                pkg.setWished(rs2.getString(16));
                pkg.setGrpbuy_order_count(rs2.getInt(17));

                packageList.add(pkg);
            }

//            pkgGrp.setPackageList(packageList);
            System.out.println("33333333333333333333333333333333333333333333");
            List<PackageItem> packageItemList = new ArrayList<>();

/*
            PreparedStatement pst3 = db.get().prepareStatement(
                    "SELECT package_item_id, product_item_id, item_name, package_grp_id, package_id, status, popularity, likes FROM package_item WHERE package_grp_id = ? ORDER BY package_id, package_item_id");
*/

            PreparedStatement pst3 = db.get().prepareStatement(
                 "SELECT p.package_item_id, p.product_item_id, p.item_name, p.package_grp_id, p.package_id, p.status, p.popularity, p.likes, p.package_item_image, " +
                    "i.product_item_id, i.item_name, i.creation_date, i.regular_price, i.sale_price, i.quantity, i.description, i.popularity, i.status, i.product_id, i.product_title, i.item_image, i.item_seq " +
                    "FROM package_item p join product_item i on p.product_item_id = i.product_item_id " +
                    "WHERE p.package_grp_id = ? ORDER BY p.package_id, p.package_item_id");

            pst3.setInt(1, gid);
            ResultSet rs3 = pst3.executeQuery();

            PackageItem pkgItem;
            ProductItem prdItem;
            System.out.println("444444444444444444444444444444444444444444444");

            while (rs3.next()) {
                pkgItem = new PackageItem();
                prdItem = new ProductItem();

                pkgItem.setPackage_item_id(rs3.getInt(1));
                pkgItem.setProduct_item_id(rs3.getInt(2));
                pkgItem.setItem_name(rs3.getString(3));
                pkgItem.setPackage_grp_id((rs3.getInt(4)));
                pkgItem.setPackage_id(rs3.getInt(5));
                pkgItem.setStatus(rs3.getString(6));
                pkgItem.setPopularity(rs3.getInt(7));
                pkgItem.setLikes(rs3.getInt(8));
                pkgItem.setPackage_item_image(rs3.getString(9));

                prdItem.setProduct_item_id(rs3.getInt(10));
                prdItem.setItem_name(rs3.getString(11));
                prdItem.setCreation_date(rs3.getTimestamp(12));
                prdItem.setRegular_price(rs3.getDouble(13));
                prdItem.setSale_price(rs3.getDouble(14));
                prdItem.setQuantity(rs3.getInt(15));
                prdItem.setDescription(rs3.getString(16));
                prdItem.setPopularity(rs3.getInt(17));
                prdItem.setStatus(rs3.getString(18));
                prdItem.setProduct_id(rs3.getInt(19));
                prdItem.setProduct_title(rs3.getString(20));
                prdItem.setItem_image(rs3.getString(21));
                prdItem.setItem_seq(rs3.getInt(22));

                pkgItem.setProductItem(prdItem);

                packageItemList.add(pkgItem);
            }
            System.out.println("5555555555555555555555555555555555");

/*            int tmpPkgID = 0;
            int prePkgID = 0;
            int i = 0;*/

/*            for (int i = 0; i < packageItemList.size(); i++) {
                tmpPkgID = packageItemList.get(i).getPackage_id();
                PackageItem tPkgItem;

                for (int j = 0; j < packageList.size(); j++) {

                }

            }*/


            for (int i = 0; i < packageList.size(); i++) {

                int pkgID = packageList.get(i).getPackage_id();
                List<PackageItem> tmpPackItemList = packageItemList.stream().filter(p -> (p.getPackage_id()==pkgID)).toList();
//                System.out.println("============ UserDA getPackageGroup ============ pkgID : " + pkgID);
//                System.out.println("============ UserDA getPackageGroup ============ tmpPackItemList : " + tmpPackItemList);

                packageList.get(i).setPackage_item_list(tmpPackItemList);
//                System.out.println("============ UserDA getPackageGroup ============ packageList.get(i).getPackageItemList() : " + packageList.get(i).getPackageItemList());
            }
            System.out.println("66666666666666666666666666");
            pkgGrp.setPackage_list(packageList);

        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println("77777777777777777777777777");
        return pkgGrp;
    }

    public Order getInvoiceOrder(int oid) {
        try {
            pst = db.get().prepareStatement(
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, " +
                            "progress_status, buyer_id, buyer_username, seller_id, seller_username, product_id, product_title, package_id, package_name, quantity, shipping_method, " +
                            "card_holder_name, card_number, card_expiry_date, card_cvv FROM orders WHERE order_id = ?");

            pst.setInt(1, oid);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                Order ord = new Order();
                ord.setOrder_id(rs.getInt(1));
                ord.setOrder_date(rs.getTimestamp(2));
                ord.setSub_total(rs.getDouble(3));
                ord.setShipping_fee(rs.getDouble(4));
                ord.setTax(rs.getDouble(5));
                ord.setOrder_total(rs.getDouble(6));
                ord.setShipping_address(rs.getString(7));
                ord.setShipping_country(rs.getString(8));
                ord.setShipping_post_code(rs.getString(9));
                ord.setPayment_status(rs.getString(10));
                ord.setPayment_method(rs.getString(11));
                ord.setProgress_status(rs.getString(12));
                ord.setBuyer_id(rs.getInt(13));
                ord.setBuyer_username(rs.getString(14));
                ord.setSeller_id(rs.getInt(15));
                ord.setSeller_username(rs.getString(16));
                ord.setProduct_id(rs.getInt(17));
                ord.setProduct_title(rs.getString(18));
                ord.setPackage_id(rs.getInt(19));
                ord.setPackage_name(rs.getString(20));
                ord.setQuantity(rs.getInt(21));
                ord.setShipping_method(rs.getString(22));
                ord.setCard_holder_name(rs.getString(23));
                ord.setCard_number(rs.getString(24));
                ord.setCard_expiry_date(rs.getString(25));
                ord.setCard_cvv(rs.getString(26));

                PreparedStatement pst2 = db.get().prepareStatement(
                        "SELECT order_details_id, order_id, product_id, seller_id, seller_username, product_title, product_unit_price, product_image_url, status, quantity, sub_total, " +
                                "delivery_date, package_grp_id, package_grp_name, package_id, package_name, sell_type FROM order_details WHERE order_id = ?");

                pst2.setInt(1, oid);
                ResultSet rs2 = pst2.executeQuery();
                List<OrderDetail> orderDetails = new ArrayList<>();
                OrderDetail od;
                while (rs2.next()) {
                    od = new OrderDetail();

                    od.setOrder_details_id(rs2.getInt(1));
                    od.setOrder_id(rs2.getInt(2));
                    od.setProduct_id(rs2.getInt(3));
                    od.setSeller_id(rs2.getInt(4));
                    od.setSeller_username(rs2.getString(5));
                    od.setProduct_title(rs2.getString(6));
                    od.setProduct_unit_price(rs2.getDouble(7));
                    od.setProduct_image_url(rs2.getString(8));
                    od.setStatus(rs2.getString(9));
                    od.setQuantity(rs2.getInt(10));
                    od.setSub_total(rs2.getDouble(11));
                    od.setDelivery_date(rs2.getTimestamp(12));
                    od.setPackage_grp_id(rs2.getInt(13));
                    od.setPackage_grp_name(rs2.getString(14));
                    od.setPackage_id(rs2.getInt(15));
                    od.setPackage_name((rs2.getString(16)));
                    od.setSell_type(rs2.getString(17));

                    orderDetails.add(od);
                }
//                ord.setOrder_detail_list(orderDetail);

                for(int i = 0; i < orderDetails.size(); i++) {

                    if(orderDetails.get(i).getSell_type().equals("P")) {
                        PreparedStatement pst3 = db.get().prepareStatement(
                                "SELECT p.package_item_id, p.product_item_id, p.item_name, p.package_grp_id, p.package_id, p.status, p.popularity, p.likes, d.item_image " +
                                        "FROM package_item p join product_item d on p.product_item_id = d.product_item_id WHERE p.package_id = ?");

                        pst3.setInt(1, orderDetails.get(i).getPackage_id());
                        ResultSet rs3 = pst3.executeQuery();

                        List<PackageItem> packageItemList = new ArrayList<>();
                        PackageItem pi;
                        while (rs3.next()) {
                            pi = new PackageItem();

                            pi.setPackage_item_id(rs3.getInt(1));
                            pi.setPackage_item_id(rs3.getInt(2));
                            pi.setItem_name(rs3.getString(3));
                            pi.setPackage_grp_id(rs3.getInt(4));
                            pi.setPackage_id(rs3.getInt(5));
                            pi.setStatus(rs3.getString(6));
                            pi.setPopularity(rs3.getInt(7));
                            pi.setLikes(rs3.getInt(8));
                            pi.setPackage_item_image(rs3.getString(9));

                            packageItemList.add(pi);
                        }

                        orderDetails.get(i).setPackage_item_list(packageItemList);
                    }


                }

                ord.setOrder_detail_list(orderDetails);

                return ord;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<Order> getBuyOrderList(int uid) {
        try {

            pst = db.get().prepareStatement(
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, " +
                            "progress_status, buyer_id, gateway_fee " +
                            "FROM orders where buyer_id = ? ORDER BY order_id DESC");

            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();
            List<Order> orderList = new ArrayList<>();
            Order ord;

            while (rs.next()) {
                ord = new Order();
                ord.setOrder_id(rs.getInt(1));
                ord.setOrder_date(rs.getTimestamp(2));
                ord.setSub_total(rs.getDouble(3));
                ord.setShipping_fee(rs.getDouble(4));
                ord.setTax(rs.getDouble(5));
                ord.setOrder_total(rs.getDouble(6));
                ord.setShipping_address(rs.getString(7));
                ord.setShipping_country(rs.getString(8));
                ord.setShipping_post_code(rs.getString(9));
                ord.setPayment_status(rs.getString(10));
                ord.setPayment_method(rs.getString(11));
                ord.setProgress_status(rs.getString(12));
                ord.setBuyer_id(rs.getInt(13));
                ord.setGateway_fee(rs.getDouble(14));
                orderList.add(ord);
            }

            return orderList;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public List<Order> getSellOrderList(int uid) {
        try {

            pst = db.get().prepareStatement(
                    "SELECT DISTINCT o.order_id, o.order_date, o.sub_total, o.shipping_fee, o.tax, SUM(d.sub_total), o.shipping_address, o.shipping_country, o.shipping_post_code, o.payment_status, o.payment_method, " +
                            "o.progress_status, d.seller_id, o.gateway_fee " +
                            "FROM orders o JOIN order_details d ON o.order_id = d.order_id WHERE d.seller_id = ? GROUP BY o.order_id ORDER BY o.order_id DESC");

            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();
            List<Order> orderList = new ArrayList<>();
            Order ord;

            while (rs.next()) {
                ord = new Order();
                ord.setOrder_id(rs.getInt(1));
                ord.setOrder_date(rs.getTimestamp(2));
                ord.setSub_total(rs.getDouble(3));
                ord.setShipping_fee(rs.getDouble(4));
                ord.setTax(rs.getDouble(5));
                ord.setOrder_total(rs.getDouble(6));
                ord.setShipping_address(rs.getString(7));
                ord.setShipping_country(rs.getString(8));
                ord.setShipping_post_code(rs.getString(9));
                ord.setPayment_status(rs.getString(10));
                ord.setPayment_method(rs.getString(11));
                ord.setProgress_status(rs.getString(12));
                ord.setSeller_id(rs.getInt(13));
                ord.setGateway_fee(rs.getDouble(14));
                orderList.add(ord);
            }

            return orderList;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


    public Order getBuyOrderDetail(int oid) {
        try {

            pst = db.get().prepareStatement(
                    //"SELECT order_id, order_date, order_total, customer_id, discount, shipping_charge, tax, shipping_street, shipping_city, shipping_post_code, shipping_state, shipping_country, status, sub_total, payment_status, payment_method, card_number, card_cvv, card_holder_name, card_expiry_date, gateway_fee FROM order WHERE order_id = ?");
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, " +
                            "progress_status, buyer_id, gateway_fee FROM orders WHERE order_id = ?");

            pst.setInt(1, oid);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                Order o = new Order();
                o.setOrder_id(rs.getInt(1));
                o.setOrder_date(rs.getTimestamp(2));
                o.setSub_total(rs.getDouble(3));
                o.setShipping_fee(rs.getDouble(4));
                o.setTax(rs.getDouble(5));
                o.setOrder_total(rs.getDouble(6));
                o.setShipping_address(rs.getString(7));
                o.setShipping_country(rs.getString(8));
                o.setShipping_post_code(rs.getString(9));
                o.setPayment_status(rs.getString(10));
                o.setPayment_method(rs.getString(11));
                o.setProgress_status(rs.getString(12));
                o.setBuyer_id(rs.getInt(13));
                o.setGateway_fee(rs.getDouble(14));


                PreparedStatement pst2 = db.get().prepareStatement(
                        "SELECT order_details_id, order_id, product_id, seller_id, seller_username, product_title, product_unit_price, product_image_url, package_id, package_name, status, quantity, " +
                                "sub_total, delivery_date, sell_type, grpbuy_end, grpbuy_allocate_qty, grpbuy_result FROM order_details WHERE order_id = ?");
                pst2.setInt(1, oid);

                ResultSet rs2 = pst2.executeQuery();
                List<OrderDetail> orderDetails = new ArrayList<>();
                OrderDetail d;

                while (rs2.next()) {
                    d = new OrderDetail();
                    d.setOrder_details_id(rs2.getInt(1));
                    d.setOrder_id(rs2.getInt(2));
                    d.setProduct_id(rs2.getInt(3));
                    d.setSeller_id(rs2.getInt(4));
                    d.setSeller_username(rs2.getString(5));
                    d.setProduct_title(rs2.getString(6));
                    d.setProduct_unit_price(rs2.getDouble(7));
                    d.setProduct_image_url(rs2.getString(8));
                    d.setPackage_id(rs2.getInt(9));
                    d.setPackage_name(rs2.getString(10));
                    d.setStatus(rs2.getString(11));
                    d.setQuantity(rs2.getInt(12));
                    d.setSub_total(rs2.getDouble(13));
                    d.setDelivery_date(rs2.getTimestamp(14));
                    d.setSell_type(rs2.getString(15));
                    d.setGrpbuy_end(rs2.getTimestamp(16));
                    d.setGrpbuy_allocate_qty(rs2.getInt(17));
                    d.setGrpbuy_result(rs2.getString(18));
                    orderDetails.add(d);
                }
                o.setOrder_detail_list(orderDetails);
                return o;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


    public Order getSellOrderDetail(int oid, int sid) {
        try {

            pst = db.get().prepareStatement(
                    //"SELECT order_id, order_date, order_total, customer_id, discount, shipping_charge, tax, shipping_street, shipping_city, shipping_post_code, shipping_state, shipping_country, status, sub_total, payment_status, payment_method, card_number, card_cvv, card_holder_name, card_expiry_date, gateway_fee FROM order WHERE order_id = ?");
                    "SELECT order_id, order_date, sub_total, shipping_fee, tax, order_total, shipping_address, shipping_country, shipping_post_code, payment_status, payment_method, progress_status, buyer_id, gateway_fee FROM orders WHERE order_id = ?");

            pst.setInt(1, oid);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                Order o = new Order();
                o.setOrder_id(rs.getInt(1));
                o.setOrder_date(rs.getTimestamp(2));
                o.setSub_total(rs.getDouble(3));
                o.setShipping_fee(rs.getDouble(4));
                o.setTax(rs.getDouble(5));
                o.setOrder_total(rs.getDouble(6));
                o.setShipping_address(rs.getString(7));
                o.setShipping_country(rs.getString(8));
                o.setShipping_post_code(rs.getString(9));
                o.setPayment_status(rs.getString(10));
                o.setPayment_method(rs.getString(11));
                o.setProgress_status(rs.getString(12));
                o.setBuyer_id(rs.getInt(13));
                o.setGateway_fee(rs.getDouble(14));


                PreparedStatement pst2 = db.get().prepareStatement(
                        "SELECT order_details_id, order_id, product_id, seller_id, seller_username, product_title, product_unit_price, product_image_url, package_id, package_name, status, quantity, sub_total, " +
                                "delivery_date, sell_type, grpbuy_end, grpbuy_allocate_qty, grpbuy_result FROM order_details WHERE order_id = ? and seller_id = ?");
                pst2.setInt(1, oid);
                pst2.setInt(2, sid);

                ResultSet rs2 = pst2.executeQuery();
                List<OrderDetail> orderDetails = new ArrayList<>();
                OrderDetail d;

                while (rs2.next()) {
                    d = new OrderDetail();
                    d.setOrder_details_id(rs2.getInt(1));
                    d.setOrder_id(rs2.getInt(2));
                    d.setProduct_id(rs2.getInt(3));
                    d.setSeller_id(rs2.getInt(4));
                    d.setSeller_username(rs2.getString(5));
                    d.setProduct_title(rs2.getString(6));
                    d.setProduct_unit_price(rs2.getDouble(7));
                    d.setProduct_image_url(rs2.getString(8));
                    d.setPackage_id(rs2.getInt(9));
                    d.setPackage_name(rs2.getString(10));
                    d.setStatus(rs2.getString(11));
                    d.setQuantity(rs2.getInt(12));
                    d.setSub_total(rs2.getDouble(13));
                    d.setDelivery_date(rs2.getTimestamp(14));
                    d.setSell_type(rs2.getString(15));
                    d.setGrpbuy_end(rs2.getTimestamp(16));
                    d.setGrpbuy_allocate_qty(rs2.getInt(17));
                    d.setGrpbuy_result(rs2.getString(18));
                    orderDetails.add(d);
                }
                o.setOrder_detail_list(orderDetails);
                return o;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public OrderDetail getOrderTracking(int oid) {
        try {
            pst = db.get().prepareStatement(
                    "SELECT order_details_id, order_id, product_id, seller_id, seller_username, product_title, product_unit_price, product_image_url, status, quantity, " +
                            "sub_total, delivery_date, package_grp_id, package_grp_name, package_id, package_name, sell_type " +
                            "FROM order_details WHERE order_details_id = ?");
            pst.setInt(1, oid);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                OrderDetail ord = new OrderDetail();
                ord.setOrder_details_id(rs.getInt(1));
                ord.setOrder_id(rs.getInt(2));
                ord.setProduct_id(rs.getInt(3));
                ord.setSeller_id(rs.getInt(4));
                ord.setSeller_username(rs.getString(5));
                ord.setProduct_title(rs.getString(6));
                ord.setProduct_unit_price(rs.getDouble(7));
                ord.setProduct_image_url(rs.getString(8));
                ord.setStatus(rs.getString(9));
                ord.setQuantity(rs.getInt(10));
                ord.setSub_total(rs.getDouble(11));
                ord.setDelivery_date(rs.getTimestamp(12));
                ord.setPackage_grp_id(rs.getInt(13));
                ord.setPackage_grp_name(rs.getString(14));
                ord.setPackage_id(rs.getInt(15));
                ord.setPackage_name(rs.getString(16));
                ord.setSell_type(rs.getString(17));
                return ord;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public boolean updateOrderStatus(OrderDetail od) {

        boolean result = false;

        try {
            pst = db.get().prepareStatement(
                    "UPDATE order_details SET status = ? WHERE order_details_id = ?");

            pst.setString(1, od.getStatus());
            pst.setInt(2, od.getOrder_details_id());
            int r = pst.executeUpdate();

            if (r == 1) {
                result = true;
            }

            pst = db.get().prepareStatement(
                    "SELECT status FROM order_details WHERE order_id = ?");

            pst.setInt(1, od.getOrder_id());
            ResultSet rs = pst.executeQuery();

            String overallStatus = "Completed";


            while (rs.next()) {
                String odStatus = rs.getString(1);
                System.out.println(odStatus);
                if (odStatus.equals("Pending") || odStatus.equals("Processing") || odStatus.equals("Shipped")) {
                    overallStatus = "Processing";
                }
            }

            pst = db.get().prepareStatement(
                    "UPDATE orders SET progress_status = ? WHERE order_id = ?");

            pst.setString(1, overallStatus);
            pst.setInt(2, od.getOrder_id());
            pst.executeUpdate();

            // if the orderDetails is delivered then update revenueProfit
/*            if (o.getStatus().equals("Delivered")) {
                RevenueProfit rp = new RevenueProfit();
                rp.setSellerId(o.getSellerId());
                rp.setOrderId(o.getOrderId());
                rp.setDeliveryDate(o.getDeliveryDate());
                rp.setOrderDetailsId(o.getId());
                rp.setRevenue(o.getSubTotal());
                rp.setCosts(0);
                rp.setPlatformProfit(rp.getRevenue() * .02); // 2% platform commission
                rp.setSellerProfit(rp.getRevenue() - (rp.getCosts() + rp.getPlatformProfit()));

                pst = db.get().prepareStatement(
                        "INSERT INTO revenue_profit (seller_id, order_id, order_date, order_details_id, revenue, costs, platform_profit, seller_profit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                pst.setInt(1, rp.getSellerId());
                pst.setInt(2, rp.getOrderId());
                pst.setDate(3, rp.getDeliveryDate());
                pst.setInt(4, rp.getOrderDetailsId());
                pst.setDouble(5, rp.getRevenue());
                pst.setDouble(6, rp.getCosts());
                pst.setDouble(7, rp.getPlatformProfit());
                pst.setDouble(8, rp.getSellerProfit());
                pst.executeUpdate();

                // then update seller account balance
                pst = db.get().prepareStatement("UPDATE sellers SET balance = balance + ? WHERE seller_id = ?");
                pst.setDouble(1, rp.getSellerProfit());
                pst.setInt(2, rp.getSellerId());
                pst.executeUpdate();
            }*/

/*            mailer.sendContentEmail("humahfuj@gmail.com", "Order Status Changed",
                    "<h1>Update of your order status</h1>"
                            + "<h2>Your order #" + o.getOrderId() + " is now " + o.getStatus() + "</h2>");*/

        } catch (Exception e) {
            System.out.println(e);
        }

        return result;
    }


    public User getUserProfile(int uid) {
        User u = null;
        try {
            pst = db.get().prepareStatement(
                    "SELECT user_id, first_name, last_name, username, password, email, icon, status, address, city, country, post_code, phone, role, creation_date, " +
                            "balance, holder_name, account_number, bank_name, branch_name, hold_fund " +
                            " FROM user WHERE user_id = ?");

            pst.setInt(1, uid);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                u = new User();
                u.setUser_id(rs.getInt(1));
                u.setFirst_name(rs.getString(2));
                u.setLast_name(rs.getString(3));
                u.setUsername(rs.getString(4));
                u.setPassword(null);
                u.setEmail(rs.getString(6));
                u.setIcon(rs.getString(7));
                u.setStatus(rs.getString(8));
                u.setAddress(rs.getString(9));
                u.setCity(rs.getString(10));
                u.setCountry(rs.getString(11));
                u.setPost_code(rs.getString(12));
                u.setPhone(rs.getString(13));
                u.setRole(Role.valueOf(rs.getString(14)));
                u.setCreation_date(rs.getTimestamp(15));
                u.setBalance(rs.getDouble(16));
                u.setHolder_name(rs.getString(17));
                u.setAccount_number(rs.getString(18));
                u.setBank_name(rs.getString(19));
                u.setBranch_name(rs.getString(20));
                u.setHold_fund(rs.getDouble(21));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return u;
    }

    public boolean updateUserProfile(User user) {

        try {

//            System.out.println("==========> updateUserProfile : " +  user.getUser_alias() + " " + user );

            pst = db.get().prepareStatement("UPDATE user SET first_name = ?, last_name = ?, username = ?, phone = ?, email = ?, address = ?, " +
                    "city = ?, country = ?, post_code = ?, icon = ?, role = ?, holder_name = ?, bank_name = ?, branch_name = ?, account_number = ? WHERE user_id = ?");

            pst.setString(1, user.getFirst_name());
            pst.setString(2, user.getLast_name());
            pst.setString(3, user.getUser_alias());
            pst.setString(4, user.getPhone());
            pst.setString(5, user.getEmail());
            pst.setString(6, user.getAddress());
            pst.setString(7, user.getCity());
            pst.setString(8, user.getCountry());
            pst.setString(9, user.getPost_code());
            pst.setString(10, user.getIcon());
            pst.setString(11, user.getRole().toString());
            pst.setString(12, user.getHolder_name());
            pst.setString(13, user.getBank_name());
            pst.setString(14, user.getBranch_name());;
            pst.setString(15, user.getAccount_number());
            pst.setInt(16, user.getUser_id());

            int x = pst.executeUpdate();

//            System.out.println("==========> updateUserProfile update result : " + x );
//            if (x != -1) {
            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean updateUserProfileWithPwd(User user) {

        try {

            pst = db.get().prepareStatement("UPDATE user SET first_name = ?, last_name = ?, username = ?, phone = ?, email = ?, address = ?, " +
                    "city = ?, country = ?, post_code = ?, icon = ?, role = ?, password = ?, holder_name = ?, bank_name = ?, branch_name = ?, account_number = ? WHERE user_id = ?");

            pst.setString(1, user.getFirst_name());
            pst.setString(2, user.getLast_name());
            pst.setString(3, user.getUser_alias());
            pst.setString(4, user.getPhone());
            pst.setString(5, user.getEmail());
            pst.setString(6, user.getAddress());
            pst.setString(7, user.getCity());
            pst.setString(8, user.getCountry());
            pst.setString(9, user.getPost_code());
            pst.setString(10, user.getIcon());
            pst.setString(11, user.getRole().toString());
            pst.setString( 12, user.getPassword());
            pst.setString(13, user.getHolder_name());
            pst.setString(14, user.getBank_name());
            pst.setString(15, user.getBranch_name());;
            pst.setString(16, user.getAccount_number());
            pst.setInt(17, user.getUser_id());

            int x = pst.executeUpdate();

            if (x == 1) {
                return true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public Boolean addUserReview(Review rw) {

        try {

            KeyHolder keyHolder = new GeneratedKeyHolder();

            java.sql.Timestamp createDateTime = new java.sql.Timestamp(new java.util.Date().getTime());

            pst = db.get().prepareStatement(
                    "INSERT INTO review (review_subject, review_content, score, poster_id, poster_username, product_id, product_title, package_id, package_name, seller_id, seller_username, post_date, status) \n" +
                            "values (?, ?, ?, ?, ?, ?, ?, null, null, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);

            pst.setString(1, rw.getReview_subject());
            pst.setString(2, rw.getReview_content());
            pst.setInt(3, rw.getScore());
            pst.setInt(4, rw.getPoster_id());
            pst.setString(5, rw.getPoster_username());
            pst.setInt(6, rw.getProduct_id());
            pst.setString(7, rw.getProduct_title());
            pst.setInt(8, rw.getSeller_id());
            pst.setString(9, rw.getSeller_username());
            pst.setTimestamp(10, rw.getPost_date());
            pst.setString(11, rw.getStatus());

            int x = pst.executeUpdate();
            if (x == 1) {
                int key = -1;
                key = 0;

                ResultSet rs = pst.getGeneratedKeys();
                if (rs.next()) {
                    key = rs.getInt(1);
//                    System.out.println(key);
                }
                rw.setReview_id(key);
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public boolean isPurchasedProduct(int pid, int uid) {
        try {
            pst = db.get().prepareStatement(
						"SELECT COUNT(*) " +
                                "FROM order_details d " +
                                "JOIN orders o ON d.order_id = o.order_id " +
                                "WHERE d.product_id = ? AND o.buyer_id = ? ");

            pst.setInt(1, pid);
            pst.setInt(2, uid);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                if (rs.getInt(1) > 0) {
                    return true;
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }


    public List<Review> getBuyerReviews(int pid) {
        try {

            pst = db.get().prepareStatement(
                    "SELECT r.review_id, r.review_subject, r.review_content, r.score, r.poster_id, r.poster_username, r.product_id, r.product_title, r.post_date, r.status, u.icon " +
                            "FROM review r JOIN user u ON r.poster_id = u.user_id " +
                            "WHERE r.product_id = ? AND r.status = 'ACTIVE' " +
                            "ORDER BY post_date DESC");

            pst.setInt(1, pid);
            ResultSet rs = pst.executeQuery();
            List<Review> reviewList = new ArrayList<>();
            Review rw;

            while (rs.next()) {
                rw = new Review();
                rw.setReview_id(rs.getInt(1));
                rw.setReview_subject(rs.getString(2));
                rw.setReview_content(rs.getString(3));
                rw.setScore(rs.getInt(4));
                rw.setPoster_id(rs.getInt(5));
                rw.setPoster_username(rs.getString(6));
                rw.setProduct_id(rs.getInt(7));
                rw.setProduct_title(rs.getString(8));
                rw.setPost_date(rs.getTimestamp(9));
                rw.setStatus(rs.getString(10));
                rw.setPoster_icon(rs.getString(11));
                reviewList.add(rw);
            }


            return reviewList;

        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public ReviewOverallScore getReviewOverallSorce(int pid) {
        ReviewOverallScore ros = null;

        try {

            pst = db.get().prepareStatement(
                    "SELECT COUNT(review_id) as total_review, SUM(IFNULL(score,0)) as total_score, " +
                            "SUM(IF(score=5, 1, 0)) as score5_count, " +
                            "SUM(IF(score=4, 1, 0)) as score4_count, " +
                            "SUM(IF(score=3, 1, 0)) as score3_count, " +
                            "SUM(IF(score=2, 1, 0)) as score2_count, " +
                            "SUM(IF(score=1, 1, 0)) as score1_count " +
                            "FROM review " +
                            "WHERE product_id = ? " +
                            "GROUP BY product_id");

            pst.setInt(1, pid);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                ros = new ReviewOverallScore();
                ros.setTotal_review_count(rs.getInt(1));
                ros.setTotal_review_score(rs.getInt(2));
                ros.setTotal_score5_count(rs.getInt(3));
                ros.setTotal_score4_count(rs.getInt(4));
                ros.setTotal_score3_count(rs.getInt(5));
                ros.setTotal_score2_count(rs.getInt(6));
                ros.setTotal_score1_count(rs.getInt(7));

            }

            return ros;

        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

}
