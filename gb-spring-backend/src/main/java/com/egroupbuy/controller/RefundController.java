package com.egroupbuy.controller;

import com.egroupbuy.dao.RefundDA;
import com.egroupbuy.model.Refund;
import com.egroupbuy.model.Withdrawal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class RefundController {

    @Autowired
    RefundDA refundDA;

    @PostMapping(value = "/user/createRefund")
    public Refund createRefund(@RequestBody Refund r) {
        return refundDA.createRefund(r);
    }

    @PutMapping(value = "/admin/updateRefund")
    public Refund updateRefund(@RequestBody Refund r) {
        return refundDA.updateRefund(r);
    }

    @GetMapping(value = "/admin/getAllRefund")
    public List<Refund> getAllRefund() {
        return refundDA.getAllRefund();
    }

    @GetMapping(value = "/user/getSellRefundList")
    public List<Refund> getSellRefundList(@RequestParam int sid) {return refundDA.getSellRefundList(sid);
    }

    @GetMapping(value = "/user/getAllRefundRequests")
    public List<Refund> getAllRefundRequests(@RequestParam int uid) {
        return refundDA.getAllRefundRequests(uid);
    }
    /*@GetMapping(value = "/user/getAllBuyerRefunds")
    public List<Refund> getAllBuyerRefunds(@RequestParam int uid) {
        return refundDA.getAllBuyerRefunds(uid);
    }*/
}
