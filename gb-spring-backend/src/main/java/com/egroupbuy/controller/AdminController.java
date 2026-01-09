package com.egroupbuy.controller;


import com.egroupbuy.dao.AdminDA;
import com.egroupbuy.dao.UserDA;
import com.egroupbuy.dto.AuthRequest;
import com.egroupbuy.dto.AuthResponse;
import com.egroupbuy.dto.UserUpdateStatus;
import com.egroupbuy.model.*;
import com.egroupbuy.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class AdminController {

    @Autowired
    AdminDA da;

    @Autowired
    AuthService authService;

    @PostMapping(value = "/admin/login")
    public AuthResponse adminlogin(@RequestBody AuthRequest a) {
        System.out.println("==========> AuthResponse adminlogin " + a.toString());
        return authService.adminLogin(a);
    }

    @GetMapping(value = "/admin/getAllProducts")
    public List<Product> getAllProducts() {
        return da.getAllProducts();
    }

    @GetMapping(value = "/admin/getSearchAllProducts")
    public List<Product> getSearchAllProducts(@RequestParam String str) {
        return da.getSearchAllProducts(str);
    }


    @PutMapping(value = "/admin/updateProduct")
    public Product updateProduct(@RequestBody Product a) {
        return da.updateProduct(a);
    }

    @GetMapping(value = "/admin/getAllCustomers")
    public List<User> getAllCustomers() {
        return da.getAllCustomers();
    }

    @PutMapping(value = "/admin/updateCustomer")
    public UserUpdateStatus updateCustomer(@RequestBody UserUpdateStatus a) {
        return da.updateCustomer(a);
    }

    @GetMapping(value = "/admin/getOrders")
    public List<Order> getOrders() {
        return da.getOrders();
    }

    @GetMapping(value = "/admin/getOrder/{orderid}")
    public Order getOrder(@PathVariable("orderid") int orderid) {
        return da.getOrder(orderid);
    }

    @PutMapping(value = "/admin/updateOrder")
    public boolean updateOrder(@RequestBody OrderDetail p) {
        return da.updateOrder(p);
    }

    @GetMapping(value = "/admin/getShippedOrderDetailList")
    public List<OrderDetail> getShippedOrderDetailList() {
        return da.getShippedOrderDetailList();
    }


    @GetMapping(value = "/admin/getAdminProfile/{aid}")
    public Admin getAdminProfile(@PathVariable int aid) {
        return da.getAdminProfile(aid);
    }

    @PutMapping(value = "/admin/updateAdminProfile")
    public boolean updateUserProfile(@RequestBody Admin adm) {
        AdminDA d = new AdminDA();
        return d.updateAdminProfile(adm);
    }

    @PutMapping(value = "/admin/updateAdminProfileWithPwd")
    public boolean updateUserProfileWithPwd(@RequestBody Admin adm) {
        AdminDA d = new AdminDA();
        return d.updateAdminProfileWithPwd(adm);
    }

//    CategoryDA cda = new CategoryDA();
//
//    @GetMapping(value = "/admin/category/all")
//    public List<Category> getCategories() {
//        System.out.println("==========> CategoryController.getCategories()" );
//        return cda.getCategories();
//    }

}
