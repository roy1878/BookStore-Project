import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  showLogin:boolean=false;
  cartItems: any[] = [];
  showCartList: boolean = false;
  isLoggedIn: boolean = false; // Replace with actual login check

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.currentOrderList.subscribe({
      next: (res: any) => {
        this.cartItems = res;
        console.log("cartlist in orderlist", res);
        console.log(this.cartItems);
        if(!localStorage.getItem("access_token")) this.showLogin=true;
      }
    });

    // Check if user is logged in
    this.isLoggedIn = this.checkLoginStatus();
  }
  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      width: '60%',
      height: '500px',
    });
  }
 
  login(){
    this.openDialog();
 
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
