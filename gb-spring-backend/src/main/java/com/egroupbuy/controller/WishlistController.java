package com.egroupbuy.controller;

import com.egroupbuy.dao.UserDA;
import com.egroupbuy.dao.WishlistDA;
//import org.springframework.beans.factory.annotation.Autowired;
import com.egroupbuy.model.Wishlist;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class WishlistController {
    /*@Autowired
    WishlistService ws;*/
    WishlistDA da = new WishlistDA();

    @GetMapping(value = "/user/getWishlist")
    public List<Wishlist> getWishlist(@RequestParam int uid) {
        return da.getWishlist(uid);
    }


    @PostMapping("/user/addWishlistItem")
    public boolean addWishlistItem(@RequestBody Wishlist w) {
        WishlistDA d = new WishlistDA();
        return d.addWishlistItem(w);
//        return da.addWishlistItem(w);
    }

    @DeleteMapping("/user/removeWishlistItem")
    public boolean removeWishlistItem(@RequestParam int wid) {
        return da.removeWishlistItem(wid);
    }


    /*@PostMapping("/user/isWishlisted")
    public boolean isWishlisted(@RequestBody Wishlist w) {
        return da.isWishlisted(w);
    }*/
}
