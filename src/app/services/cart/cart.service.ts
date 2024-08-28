import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpService: any;

  header = {
    'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdhMDkzY2VhZTVjNDAwMGVkMGVkMDIiLCJpYXQiOjE3MjQ3NjI1OTAsImV4cCI6MTcyNDg0ODk5MH0.2aDnHhNdkpkt5woXZLYR5Pd_9yx4WRdOIb_M7x4vs0M`,
  };

  constructor() { }
 
  getAllCartApiCall() {
    return this.httpService.GetApiCall('bookstore_user/get_cart_items',{headers:this.header});
  }
}
