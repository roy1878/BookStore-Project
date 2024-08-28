import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

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
}
