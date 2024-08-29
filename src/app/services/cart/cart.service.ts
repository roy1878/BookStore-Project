import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
  private cartItems: any[] = [];

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}get_cart_items`, {
      headers: {
        'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMTk3M2I3OGRmYTAwMGU4NTc1NWUiLCJpYXQiOjE3MjQ5MDg2MjMsImV4cCI6MTcyNDk5NTAyM30.BPdgrKvK7ki5kZ0fycgIJtgr99ydsqBfDbSpWhBoMRE`
      }
    });
  }
  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}remove_cart_item/${itemId}`, {
      headers: {
        'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMTk3M2I3OGRmYTAwMGU4NTc1NWUiLCJpYXQiOjE3MjQ5MDg2MjMsImV4cCI6MTcyNDk5NTAyM30.BPdgrKvK7ki5kZ0fycgIJtgr99ydsqBfDbSpWhBoMRE`
      }
    });
  }
  addToCart(item: any): void {
    this.cartItems.push(item);
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
