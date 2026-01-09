package com.egroupbuy.controller;

import com.egroupbuy.dao.CategoryDA;
import com.egroupbuy.model.Category;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class CategoryController {

    CategoryDA da = new CategoryDA();



//    @GetMapping(value = "/admin/getCategories")
    @GetMapping(value = "/getAllCategories")
    public List<Category> getAllCategories() {
        System.out.println("==========> CategoryController.getCategories()" );
        return da.getAllCategories();
    }

    @PostMapping(value = "/admin/createCategory")
    public Category createCategory(@RequestBody Category c) {
        return da.createCategory(c);
    }

    @PutMapping(value = "/admin/updateCategory")
    public boolean updateCategory(@RequestBody Category c) {
        return da.updateCategory(c);
    }

    @DeleteMapping(value = "/admin/deleteCategory")
    public boolean deleteCategory(@RequestParam int id) { return da.deleteCategory(id); }

}
