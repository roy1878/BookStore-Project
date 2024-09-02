import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})

export class UserService {



  constructor(private httpService :HttpService) { }

  header: any = {
    'x-access-token': localStorage.getItem(`admin_token`) || '',
  };

  loginAPICall(data:any){
    return this.httpService.PostAPICall('bookstore_user/login',data);
 }

 registerApiCall(data:any){
   return this.httpService.PostAPICall('bookstore_user/registration',data);
 }

 updateCustomerDetails(data:any){
  return this.httpService.updateAPICall('bookstore_user/edit_user',data);
 }

 


 // for admin
 addBookAPICall(data:any){
  console.log("admin",data);
  return this.httpService.PostAdminAPICall('bookstore_user/admin/add/book', data);
 }
 

 adminAPICall(data:any){
  console.log("admin");
  return this.httpService.PostAPICall('bookstore_user/admin/login',data);
 }

}
