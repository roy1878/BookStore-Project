import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

  export class DataService {
    private dataSource = new BehaviorSubject<string>("");
    currentData = this.dataSource.asObservable();
  
    updateData(data: any) {
      this.dataSource.next(data);
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