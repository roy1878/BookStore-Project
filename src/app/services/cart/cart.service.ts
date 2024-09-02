import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
  private cartItems: any[] = [];
  httpService: any;

  header: any = {
    'x-access-token': localStorage.getItem('access_token')
  }
  constructor(private http: HttpClient) { }

 
  addToCart(item: any): void {
    this.cartItems.push(item);
  }

  // removeFromCart(item: any): void {
  //   const index = this.cartItems.indexOf(item);
  //   if (index > -1) {
  //     this.cartItems.splice(index, 1);
  //   }
  // }
  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}remove_cart_item/${itemId}`, {
      headers: this.header
    });
    
  }
  

  getItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
 
 
  getAllCartApiCall() {
    return this.httpService.GetApiCall('bookstore_user/get_cart_items',{headers:this.header});
  }
}
