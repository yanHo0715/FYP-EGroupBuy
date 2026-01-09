import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {Brand} from '../../../interfaces/brand';
import {BrandService} from '../../../services/brand.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-brand',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  selected: Brand = {
    brand_id: 0,
    brand_name: '',
    description: '',
    icon: '',
  }
  mode = '';
  queryMode: string = '';

  constructor(
    private brandService: BrandService,
    private util: UtilityService
  ) { }

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand() {
    this.queryMode = 'indeterminate';
    this.brandService.getAllBrands().subscribe((b) => {
      this.brands = b;
      this.queryMode = '';
      console.log(this.brands);
    });
  }

  onSelect(a: any, mode: any) {
    if (a == null) {
      this.selected = {
        brand_id: 0,
        brand_name: '',
        description: '',
        icon: '',
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
      this.brandService.createBrand(this.selected).subscribe((b) => {
        if (b != null) {
          this.util.toastify(true, "Brand created");
          this.getAllBrand();
        } else {
          this.util.toastify(false);
        }
      });

    } else {
      this.brandService.updateBrand(this.selected).subscribe((success) => {
        this.util.toastify(success, "Brand updated");
        this.getAllBrand();
      });
    }
  }

  onDelete() {
    this.brandService.deleteBrand(this.selected.brand_id).subscribe((success) => {
      if (success){
        this.util.toastify(success, "Brand deleted");
        this.getAllBrand();
      }
      else {
        this.util.toastify(false, "", "Deleting brand is not support for now");
      }

    });
    //this.util.toastify(false, "", "Deleting brand is not support for now");
  }
}
