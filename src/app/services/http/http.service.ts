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
}
