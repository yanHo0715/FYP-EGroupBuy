package com.egroupbuy.controller;

import com.egroupbuy.dao.BrandDA;
import com.egroupbuy.model.Brand;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class BrandController {

    BrandDA da = new BrandDA();

/*    @GetMapping(value = "/customer/brand/all")
    public List<Brand> getBrands() {
        System.out.println("==========> BrandController.getBrands()" );
        return da.getBrands();
    }*/


    @GetMapping(value = "/admin/brand/getAllBrands")
    public List<Brand> getAllBrands() {
        System.out.println("==========> BrandController.getAllBrands()" );
        return da.getAllBrands();
    }

    @PostMapping(value = "/admin/brand/createBrand")
    public Brand createBrand(@RequestBody Brand b) {
        return da.createBrand(b);
    }

    @PutMapping(value = "/admin/brand/updateBrand")
    public boolean updateBrand(@RequestBody Brand b) {
        return da.updateBrand(b);
    }

    @DeleteMapping(value = "/admin/brand/deleteBrand")
    public boolean deleteBrand(@RequestParam int id) {
        return da.deleteBrand(id);
    }

}
