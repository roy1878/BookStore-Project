import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BaseUrl="https://bookstore.incubation.bridgelabz.com/";

  constructor(private http:HttpClient) { }

  GetApiCall(endpoint:string){
    return this.http.get(this.BaseUrl+endpoint);

  }

  PostAPICall(endPoint:string,data:any,header:any=null){
    return this.http.post(this.BaseUrl+endPoint,data,{headers:header});
  }
}
