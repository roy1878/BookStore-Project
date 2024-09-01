// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { HttpService } from '../http/http.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
//   private cartItems: any[] = [];
//   httpService: any;

//   header = {
//     'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdhMDkzY2VhZTVjNDAwMGVkMGVkMDIiLCJpYXQiOjE3MjQ3NjI1OTAsImV4cCI6MTcyNDg0ODk5MH0.2aDnHhNdkpkt5woXZLYR5Pd_9yx4WRdOIb_M7x4vs0M`,
//   };

//   constructor(private http: HttpClient) { }

//   getCartItems(): Observable<any> {
//     return this.http.get(`${this.baseUrl}get_cart_items`, {
//       headers: {
//         'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMTk3M2I3OGRmYTAwMGU4NTc1NWUiLCJpYXQiOjE3MjQ5MDg2MjMsImV4cCI6MTcyNDk5NTAyM30.BPdgrKvK7ki5kZ0fycgIJtgr99ydsqBfDbSpWhBoMRE`
//       }
//     });
//   }
//   removeFromCart(itemId: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}remove_cart_item/${itemId}`, {
//       headers: {
//         'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMTk3M2I3OGRmYTAwMGU4NTc1NWUiLCJpYXQiOjE3MjQ5MDg2MjMsImV4cCI6MTcyNDk5NTAyM30.BPdgrKvK7ki5kZ0fycgIJtgr99ydsqBfDbSpWhBoMRE`
//       }
//     });
//   }
//   addToCart(item: any): void {
//     this.cartItems.push(item);
//   }

//   // removeFromCart(item: any): void {
//   //   const index = this.cartItems.indexOf(item);
//   //   if (index > -1) {
//   //     this.cartItems.splice(index, 1);
//   //   }
//   // }

//   getItems(): any[] {
//     return this.cartItems;
//   }

//   clearCart(): void {
//     this.cartItems = [];
//   }
 
 
//   getAllCartApiCall() {
//     return this.httpService.GetApiCall('bookstore_user/get_cart_items',{headers:this.header});
//   }
// }

 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
  private cartItems: any[] = [];
  headers: any = {
    'x-access-token': localStorage.getItem('access_token')
  }
  constructor(private http: HttpClient,
  private dataService:DataService

  ) { }
 
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
 
 