import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  cartItems: any[] = [];
  constructor(private cartService: CartService,private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentCartList.subscribe({
      next:(res:any)=>{
        this.cartItems=res;
        console.log("cartlist",res);
        console.log(this.cartItems);
  
  
      }
     })
  }

}
