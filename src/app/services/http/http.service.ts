import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BaseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  header: any = {
    'x-access-token': localStorage.getItem(`access_token`) || '',
  };
  header1: any = {
    'x-access-token': localStorage.getItem(`admin_token`) || '',
  };
  constructor(private http: HttpClient) {}

  GetApiCall(endpoint: string) {
    return this.http.get(this.BaseUrl + endpoint, { headers: this.header });
  }

  PostAPICall(endPoint: string, data: any) {
    return this.http.post(this.BaseUrl + endPoint, data, {
      headers: this.header,
    });
  }
  PostAdminAPICall(endPoint: string, data: any) {
    return this.http.post(this.BaseUrl + endPoint, data, {
      headers: this.header1,
    });
  }

  PutAPICall(endpoint: string, data: any) {
    return this.http.put(this.BaseUrl + endpoint, data,{headers:this.header});
  }

  deleteAPICall(endPoint: string,id:any){
    return this.http.delete(this.BaseUrl+endPoint,{ headers: this.header });
    
  }

  updateAPICall(endPoint: string, data: any){
    return this.http.put(this.BaseUrl + endPoint, data , { headers: this.header });

  }

  
}
