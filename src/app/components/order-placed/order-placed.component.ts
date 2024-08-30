import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  cartItems: any[] = [];
  constructor(private router: Router,private cartService: CartService,private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentCartList.subscribe({
      next:(res:any)=>{
        this.cartItems=res;
        console.log("cartlist",res);
        console.log(this.cartItems);
  
  
      }
     })
  }

continueShopping(){
  this.router.navigate(['dashboard/books']);
}

}
