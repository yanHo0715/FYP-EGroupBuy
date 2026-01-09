import {Component, OnInit} from '@angular/core';
import {Order} from '../../interfaces/order';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-invoice',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit {

  userFirstName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userAddress: string = '';

  order: Order = {} as Order
  curSymbol: string = '$'

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.userFirstName = this.userService.getUser().first_name;
    this.userLastName = this.userService.getUser().last_name;
    this.userEmail = this.userService.getUser().email;
    this.userAddress = this.userService.getUser().address;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()

    let orderId = this.route.snapshot.params['oid'];
    // orderId = 10;
    this.userService.getInvoiceOrder(orderId).subscribe((response) => {
      console.log(response);
      this.order = response;
    });
  }

}
