import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  userStr = localStorage.getItem('user');
  orders: any = [];

  constructor(public loginService: LoginService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders(JSON.parse(this.userStr!).id);
  }

  getOrders(userId: number) {
    this.orderService.getOrdersByUser(userId).subscribe(
      data => {
        this.orders = data
      }
    );
     
  }

}
