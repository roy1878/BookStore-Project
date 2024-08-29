import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService :HttpService) { }

  loginAPICall(data:any){
    return this.httpService.PostAPICall('bookstore_user/login',data);
 }

 registerApiCall(data:any){
   return this.httpService.PostAPICall('bookstore_user/registration',data);
 }

 updateCustomerDetails(data:any){
  return this.httpService.updateAPICall('bookstore_user/edit_user',data);
 }
}
