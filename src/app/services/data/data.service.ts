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
    this.cartList.next(data);
  }

<<<<<<< HEAD
  }
=======
  private wishList = new BehaviorSubject<any>([]);
  currentWishList = this.wishList.asObservable();
  updateWishList(data: any) {
    this.wishList.next(data);
  }
}
>>>>>>> 3caf26b20bc4688b72c7cc3a4f63600eb233a4cb
