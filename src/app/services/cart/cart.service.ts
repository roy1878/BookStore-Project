import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
  private cartItems: any[] = [];
  headers: any = {
    'x-access-token': localStorage.getItem('access_token')
  }
  constructor(private http: HttpClient) { }

  getCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}get_cart_items`, {
      headers: this.headers
    });
  }
  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}remove_cart_item/${itemId}`, {
      headers: this.headers
    });
  }
  addToCart(item: any): void {
    this.cartItems.push(item);
  }

  updateCartItemQuantity(cartItemId: string, quantity: number) {
    console.log(cartItemId, quantity );
    
    return this.http.put(`${this.baseUrl}cart_item_quantity/${cartItemId}`, {quantityToBuy: quantity }, {
      headers: this.headers}
    );
  }
  

  // removeFromCart(item: any): void {
  //   const index = this.cartItems.indexOf(item);
  //   if (index > -1) {
  //     this.cartItems.splice(index, 1);
  //   }
  // }

  getItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
