import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSource = new BehaviorSubject<string>('');
  currentData = this.dataSource.asObservable();

  updateData(data: any) {
    this.dataSource.next(data);
  }

  private loginState = new BehaviorSubject<string>('');
  currentLoginState = this.loginState.asObservable();

  updateLoginState() {
    if (localStorage.getItem('access_token')) {
      this.loginState.next('loggedIn');
      console.log('loggedIn');
      
    } else {
      this.loginState.next('loggedOut');
      console.log('loggedOut');
      
    }
  }

  // private localcartlist = new BehaviorSubject<any>([]);
  // currentlocalcartlistData = this.localcartlist.asObservable();

  // updateLocalCartList(bookid:any,data: any) {
  //   this.localcartlist.next({'bid':bookid, 'quantity':data});
  // }

  private orderList = new BehaviorSubject<any>([]);
  currentOrderList = this.orderList.asObservable();
  updateOrderList(data: any) {
    this.orderList.next(data);
  }

  private cartList = new BehaviorSubject<any>([]);
  currentCartList = this.cartList.asObservable();
  updateCartList(data: any) {
    // console.log('sm', data);
    this.cartList.next(data);
  }
  addToCartList(newItems: any[]) {
    const currentList = this.cartList.getValue();
    const updatedList = currentList.concat(newItems);
    this.cartList.next(updatedList);
  }

  private wishList = new BehaviorSubject<any>([]);
  currentWishList = this.wishList.asObservable();
  updateWishList(data: any) {
    this.wishList.next(data);
  }

  private customerAddressList = new BehaviorSubject<any>([]);
  currentCustomerAddressList = this.orderList.asObservable();
  updateCustomerAddressList(data: any) {
    this.customerAddressList.next(data);
  }
}
