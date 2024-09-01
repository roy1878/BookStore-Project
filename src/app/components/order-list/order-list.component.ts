import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  cartItems: any[] = [];
  showCartList: boolean = false;
  isLoggedIn: boolean = false; // Replace with actual login check

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.currentCartList.subscribe({
      next: (res: any) => {
        this.cartItems = res;
        console.log("cartlist", res);
        console.log(this.cartItems);
      }
    });

    // Check if user is logged in
    this.isLoggedIn = this.checkLoginStatus();
  }

  checkout(): void {
    this.showCartList = true;
  }

  redirectToBooks(): void {
    this.router.navigate(['/books']);
  }

  checkLoginStatus(): boolean {
    // Implement your login check logic here
    // For example, check if a token exists in local storage
    return !!localStorage.getItem('userToken');
  }
}
