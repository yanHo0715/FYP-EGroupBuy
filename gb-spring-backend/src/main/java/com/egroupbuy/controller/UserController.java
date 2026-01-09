package com.egroupbuy.controller;

import com.egroupbuy.dao.UserDA;
import com.egroupbuy.dao.WishlistDA;
import com.egroupbuy.dto.AuthRequest;
import com.egroupbuy.dto.AuthResponse;
import com.egroupbuy.model.*;
import com.egroupbuy.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



//@CrossOrigin(origins = "*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class UserController {

    @Autowired
    UserDA da;

    @Autowired
    AuthService authService;

//    @PostMapping(value = "/customer/login")
//    public AuthResponse login(@RequestBody AuthRequest a) {
//        return authService.customerLogin(a);
//    }

    @PostMapping(value = "/user/usersignup")
    public User userSignup(@RequestBody User u) {
        UserDA d = new UserDA();
        return d.userSignup(u);
    }

    @PostMapping(value = "/user/userlogin")
    public AuthResponse userLogin(@RequestBody AuthRequest a) {
        return authService.userLogin(a);
    }

    @PostMapping(value = "/user/addProductMain")
    public Product addProductMain(@RequestBody Product p) {
        UserDA d = new UserDA();
        return d.addProductMain(p);
    }

    @PostMapping(value = "/user/updateProductMain")
    public boolean updateProductMain(@RequestBody Product p) {
        UserDA d = new UserDA();
        return d.updateProductMain(p);
    }

    @PostMapping(value = "/user/updatePackageGroup")
    public boolean updatePackageGroup(@RequestBody PackageGroup pg) {
        UserDA d = new UserDA();
        return d.updatePackageGroup(pg);
    }

    @PostMapping(value = "/user/productItemsManip")
    public List<ProductItem> productItemsManip(@RequestBody ProductItem[] pi) {
        UserDA d = new UserDA();
        return d.productItemsManip(pi);
    }

    @GetMapping(value = "/user/getProductItem/{pid}")
    public List<ProductItem> getProductItem(@PathVariable("pid") int pid) {
        UserDA d = new UserDA();
        return d.getProductItem(pid);
    }


/*    @PostMapping(value = "/user/addPackageList")
    public ProductItem[][] addPackageGroup(@RequestBody ProductItem[][] pi) {
        UserDA d = new UserDA();
        return d.addPackageList(pi);
    }*/

    @PostMapping(value = "/user/addPackageList")
    public PackageGroup addPackageList(@RequestBody PackageGroup pg) {
        UserDA d = new UserDA();
        return d.addPackageList(pg);
    }

/*    @GetMapping(value = "/user/productList")
    public List<Product> getProductList() {
        UserDA d = new UserDA();
        return d.getProductList();
    }*/

    @GetMapping(value = "/user/getProductList/{uid}")
    public List<Product> getProductList(@PathVariable("uid") int uid) {
        UserDA d = new UserDA();
        return d.getProductList(uid);
    }

    @GetMapping(value = "/user/getSearchProductList")
    public List<Product> getSearchProductList(@RequestParam String str, @RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getSearchProductList(str, uid);
    }

    @DeleteMapping(value = "/user/deleteProduct/{pid}")
    public boolean deleteProduct(@PathVariable("pid") int pid) {
        UserDA d = new UserDA();
        return d.deleteProduct(pid);
    }

    @GetMapping(value = "/user/getPackageGroupList")
    public List<PackageGroup> getPackageGroupList(@RequestParam int pid, @RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getPackageGroupList(pid, uid);
    }

    @GetMapping(value = "/user/getGroupBuyingList")
    public List<ProductPackage> getGroupBuyingList(@RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getGroupBuyingList(uid);
    }

    @GetMapping(value = "/user/getSearchGroupBuyingList")
    public List<ProductPackage> getSearchGroupBuyingList(@RequestParam String str, @RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getSearchGroupBuyingList(str, uid);
    }

    @GetMapping(value = "/user/productPackageList/{uid}")
    public List<ProductPackage> getProductPackageList(@PathVariable("uid") int uid) {
        UserDA d = new UserDA();
        return d.getProductPackageList(uid);
    }

    @PostMapping(value = "/user/addItemToCart")
    public CartItem addItemToCart(@RequestBody CartItem ci) {
        UserDA d = new UserDA();
        return d.addItemToCart(ci);
    }

    @GetMapping(value = "/user/getItemsInCart")
    public List<CartItem> getItemsInCart(@RequestParam int uid) {
        return da.getItemsInCart(uid);
    }

    @DeleteMapping(value = "/user/removeCartItem")
    public boolean removeCartItem(@RequestParam int cid) {
        return da.removeItemFromCart(cid);
    }

    @PutMapping(value = "/user/updateCartItem")
    public boolean updateCart(@RequestBody CartItem ci) {
        UserDA d = new UserDA();
        return d.updateCartItem(ci);
    }

    @PostMapping(value = "/user/createOrder")
    public Order createOrder(@RequestBody Order ord) {
        return da.createOrder(ord);
    }


    @PutMapping(value = "/user/updateOrderStatus")
    public boolean updateOrderStatus(@RequestBody OrderDetail od) {
        return da.updateOrderStatus(od);
    }

    @GetMapping(value = "/getProduct/{pid}")
    public Product getProduct(@PathVariable("pid") int pid) {
        UserDA d = new UserDA();
        return d.getProduct(pid);
    }

    @GetMapping(value = "/user/getProductEditMain")
    public Product getProductEditMain(@RequestParam int pid, @RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getProductEditMain(pid, uid);
    }

//    @GetMapping(value = "/getPackageGroup/{gid}/{uid}")
//    public PackageGroup getPackageGroup(@PathVariable("gid") int gid, @PathVariable("uid") int uid) {
    @GetMapping(value = "/user/getPackageGroup")
    public PackageGroup getPackageGroup(@RequestParam int gid, @RequestParam int uid) {
        UserDA d = new UserDA();
        return d.getPackageGroup(gid, uid);
    }

    @GetMapping(value = "/user/getInvoiceOrder")
    public Order getInvoiceOrder(@RequestParam int oid) {
        return da.getInvoiceOrder(oid);
    }

    @GetMapping(value = "/user/getBuyOrderList")
    public List<Order> getBuyOrderList(@RequestParam int uid) {
        return da.getBuyOrderList(uid);
    }

    @GetMapping(value = "/user/getSellOrderList")
    public List<Order> getSellOrderList(@RequestParam int uid) {
        return da.getSellOrderList(uid);
    }

    @GetMapping(value = "/user/getBuyOrderDetail")
    public Order getBuyOrderDetail(@RequestParam int oid) {
        return da.getBuyOrderDetail(oid);
    }

    @GetMapping(value = "/user/getSellOrderDetail")
    public Order getSellOrderDetail(@RequestParam("oid") int oid, @RequestParam("sid") int sid) {
        return da.getSellOrderDetail(oid, sid);
    }

    @GetMapping(value = "/user/getOrderTracking")
    public OrderDetail getOrderTracking(@RequestParam int oid) {
        return da.getOrderTracking(oid);
    }

    @GetMapping(value = "/user/getUserProfile/{uid}")
    public User getUserProfile(@PathVariable int uid) {
        return da.getUserProfile(uid);
    }

    @PutMapping(value = "/user/updateUserProfile")
    public boolean updateUserProfile(@RequestBody User user) {
        UserDA d = new UserDA();
        return d.updateUserProfile(user);
    }

    @PutMapping(value = "/user/updateUserProfileWithPwd")
    public boolean updateUserProfileWithPwd(@RequestBody User user) {
        UserDA d = new UserDA();
        return d.updateUserProfileWithPwd(user);
    }

    @PostMapping("/addUserReview")
    public boolean addUserReview(@RequestBody Review rw) {
        UserDA d = new UserDA();
        return d.addUserReview(rw);
    }

    @GetMapping(value = "/user/isPurchasedProduct")
    public boolean isPurchasedProduct(@RequestParam int pid, @RequestParam int uid) {
        return da.isPurchasedProduct(pid, uid);
    }

    @GetMapping(value = "/getBuyerReviews/{pid}")
    public List<Review> getBuyerReviews(@PathVariable int pid) {
        return da.getBuyerReviews(pid);
    }

/*    @PostMapping(value = "/user/addPackages")
    public Package[] addPackages(@RequestBody Package[] p) {
        UserDA d = new UserDA();
        return d.addPackages(p);
    }*/


/*    CategoryDA cda = new CategoryDA();

    @GetMapping(value = "/customer/category/all")
    public List<Category> getCategories() {
        System.out.println("==========> CategoryController.getCategories()" );
        return cda.getCategories();
    }*/

/*
    @PostMapping(value = "/customer/userlogin")
    public User userLogin(@RequestBody User a) {
        UserDA d = new UserDA();
        return d.userLogin(a);
    }
*/

}
