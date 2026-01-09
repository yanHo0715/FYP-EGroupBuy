import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {Category} from '../../../interfaces/category';
import {CategoryService} from '../../../services/category.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from "@angular/router";
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selected: Category = {
    category_id: 0,
    category_name: '',
    description: '',
    icon: '',
    parent_id: 0
  }
  mode = '';
  queryMode: string = '';

  constructor(
    private categoryService: CategoryService,
    private util: UtilityService
  ) { }

  ngOnInit(): void {
     this.getAllCategory();
  }

  getAllCategory() {
    this.queryMode = 'indeterminate';
    this.categoryService.getAllCategories().subscribe((c) => {
      this.categories = c;
      this.queryMode = '';
      console.log(this.categories);
    });
  }

  onSelect(a: any, mode: any) {
    if (a == null) {
      this.selected = {
        category_id: 0,
        category_name: '',
        description: '',
        icon: '',
        parent_id: 0
      }
    } else {
      this.selected = a;
    }
    this.mode = mode;

    console.log(mode);
    console.log(this.selected);


  }

  saveOrUpdate() {
    if (this.mode == 'create') {
      this.categoryService.createCategory(this.selected).subscribe((c) => {
        if (c != null) {
          this.util.toastify(true, "Category created");
          this.getAllCategory();
        } else {
          this.util.toastify(false);
        }
      });

    } else {
      this.categoryService.updateCategory(this.selected).subscribe((success) => {
        this.util.toastify(success, "Category updated");
        this.getAllCategory();
      });
    }
  }

  onDelete() {

    this.categoryService.deleteCategory(this.selected.category_id).subscribe((success) => {
      if (success){
        this.util.toastify(success, "Category deleted");
        this.getAllCategory();
      }
      else {
        this.util.toastify(false, "", "Deleting category is not support for now");
      }

    });

    // this.util.toastify(false, "", "Deleteing category is not support for now");
  }
}

