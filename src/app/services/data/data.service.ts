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

  private localcartlist = new BehaviorSubject<any>([]);
  currentlocalcartlistData = this.localcartlist.asObservable();

  updateLocalCartList(bookid:any,data: any) {
    this.localcartlist.next({'bid':bookid, 'quantity':data});
  }

  private orderList = new BehaviorSubject<any>([]);
  currentOrderList = this.orderList.asObservable();
  updateOrderList(data: any) {
    this.orderList.next(data);
  }

  private cartList = new BehaviorSubject<any>([]);
  currentCartList = this.cartList.asObservable();
  updateCartList(data: any) {
    console.log("sm",data);
    this.cartList.next(data);
  }

  private wishList = new BehaviorSubject<any>([]);
  currentWishList = this.wishList.asObservable();
  updateWishList(data: any) {
    this.wishList.next(data);
  }
}
