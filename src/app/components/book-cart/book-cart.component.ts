import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss'],
})
export class BookCartComponent implements OnInit {
  isCart2Visible = false;
  isCard2Visible = true;
  isCart3Visible = false;
  isCard3Visible = true;
  isLoggedIn: boolean = false;
  localQuantity = 0;
  isCartlisted: any = {};

  quantity: number = 0;
  isBtnVisible = true;
  isBtnVisible2 = true;
  cartItemId: string = 'cartlist._id';
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private route: Router
  ) {}
  hideBtn1() {
    this.isBtnVisible = false;
  }

  hideBtn2() {
    this.isBtnVisible2 = false;
  }

  showCart2() {
    this.isCart2Visible = true;
    this.isCard2Visible = false;
    this.hideBtn1();
  }

  showCart3() {
    this.isCart3Visible = true;
    this.isCard3Visible = false;
    this.hideBtn2();
  }
  orderPlaced() {
    this.route.navigate(['/dashboard/order-placed']);
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;

    this.dataService.currentCartList.subscribe({
      next: (res: any) => {
        this.cartItems = res;
        console.log('cartlist', res);
        console.log(this.cartItems);
      },
    });
    
  }

  count: number = 1;

  onIncrement() {
    this.count++;
  }

  onDecrement() {
    if (this.count > 0) {
      this.count--;
    }
  }
  // handleUpdateCartBtn(action: string, cartItemId: string) {

  //   // let bookData = this.cartItems.filter((e:any)=>e.product_id._id === )
  //   if (this.isLoggedIn) {
  //     if (this.localQuantity > 0) this.quantity += this.localQuantity;
  //     if (action === 'increament') {
  //       this.quantity = this.quantity + 1;
  //     } else if (action === 'decreament' && this.quantity > 0) {
  //       this.quantity = this.quantity - 1;
  //     }
  //     console.log('quantity::::', this.quantity);
  //     console.log(this.isCartlisted);

  //     // Call the service to update the quantity
  //     this.cartService
  //       .updateCartItemQuantity(cartItemId, this.quantity)
  //       .subscribe(
  //         (response) => {
  //           console.log('Cart item quantity updated successfully', response);
  //         },
  //         (error) => {
  //           console.error('Error updating cart item quantity', error);
  //         }
  //       );
  //   }
  // }

  handleUpdateCartBtn(action: string, cartItemId: string) {
    if (this.isLoggedIn) {
      // Find the cart item by its ID
      const cartItem = this.cartItems.find((item: any) => item._id === cartItemId);
      console.log(cartItem);
      
      
      if (cartItem) {
        // Update the local quantity based on the action
        if (action === 'increament') {
          cartItem.quantityToBuy += 1;
        } else if (action === 'decreament' && cartItem.quantityToBuy > 0) {
          cartItem.quantityToBuy -= 1;
        }
  
        console.log('Updated quantity:', cartItem.quantityToBuy);
  
        // Call the service to update the quantity
        this.cartService.updateCartItemQuantity(cartItemId, cartItem.quantityToBuy).subscribe (
          (response) => {
            console.log('Cart item quantity updated successfully', response);
          },
          (error) => {
            console.error('Error updating cart item quantity', error);
          }
        );
      } else {
        console.error('Cart item not found');
      }
    } else {
      console.error('User is not logged in');
    }
  }
  

  removeCartItem(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: (res: any) => {
        console.log('Item removed', res);

        this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
      },
      error: (err: any) => {
        console.error('Error removing item', err);
      },
    });
  }
}
