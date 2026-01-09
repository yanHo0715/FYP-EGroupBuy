package com.egroupbuy.controller;

import com.egroupbuy.dao.ReportDA;
import com.egroupbuy.dto.AdminDashboard;
import com.egroupbuy.dto.SalesReport;
import com.egroupbuy.dto.UserDashboard;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class ReportController {
    ReportDA da = new ReportDA();

    @GetMapping(value = "/admin/getAdminDashboard")
    public AdminDashboard getAdminDashboard() {
        return da.getAdminDashboard();
    }


    @GetMapping(value = "/user/getUserDashboard")
    public UserDashboard getUserDashboard(@RequestParam int uid) {
        return da.getUserDashboard(uid);
    }

    /*@GetMapping(value = "/seller/stat")
    public SellerStat getSellerStat(@RequestParam(name = "sellerId") int sellerId) {
        return da.getSellerStat(sellerId);
    }*/

    /*@GetMapping(value = "/seller/report/sales")
    public List<SalesReportDto> getSellerSalesReport(@RequestParam int sellerId, @RequestParam String startDate,
                                                     @RequestParam String endDate) {
        return da.getSellerSalesReport(sellerId, startDate, endDate);
    }*/

    @GetMapping(value = "/admin/getAdminSalesReport")
    public List<SalesReport> getAdminSalesReport(@RequestParam String startDate, @RequestParam String endDate) {
        return da.getAdminSalesReport(startDate, endDate);
    }

    @GetMapping(value = "/user/getUserSalesReport")
    public List<SalesReport> getAdminSalesReport(@RequestParam int uid, @RequestParam String startDate, @RequestParam String endDate) {
        return da.getUserSalesReport(uid, startDate, endDate);
    }

}
