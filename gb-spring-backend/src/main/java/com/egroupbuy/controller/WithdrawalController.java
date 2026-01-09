package com.egroupbuy.controller;

import com.egroupbuy.dao.WithdrawalDA;
import com.egroupbuy.dto.WithdrawalAdmin;
import com.egroupbuy.model.Order;
import com.egroupbuy.model.Wishlist;
import com.egroupbuy.model.Withdrawal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class WithdrawalController {
    WithdrawalDA da = new WithdrawalDA();

    @PostMapping(value = "/user/requestWithdraw")
    public Withdrawal requestWithdraw(@RequestBody Withdrawal w) {
        return da.requestWithdraw(w);
    }

    /*@GetMapping(value = "/user/home/getWithdrawals/{userId}")
    public List<Withdrawal> getWithdrawals(@PathVariable int user_id) {
        return da.getWithdrawals(user_id);
    }*/

    @GetMapping(value = "/user/getWithdrawals")
    public List<Withdrawal> getWithdrawals(@RequestParam int uid) {
        return da.getWithdrawals(uid);
    }

    @PostMapping(value = "/admin/updateWithdraw")
    public boolean updateWithdraw(@RequestBody WithdrawalAdmin w) {
        return da.updateWithdraw(w);
    }

    @GetMapping(value = "/admin/getAllWithdrawals")
    public List<WithdrawalAdmin> getAllWithdrawals() {
        return da.getAllWithdrawals();
    }
}
