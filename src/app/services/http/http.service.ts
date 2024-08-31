import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BaseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  // header: any = {
  //   'x-access-token': localStorage.getItem(`access_token`) || '',
  // };
  headers = new HttpHeaders({
    'x-access-token': localStorage.getItem(`access_token`) || '',
  });
  constructor(private http: HttpClient) {}

  GetApiCall(endpoint: string) {
    return this.http.get(this.BaseUrl + endpoint, {headers:this.headers});
  }

  PostAPICall(endPoint: string, data: any) {
    return this.http.post(this.BaseUrl + endPoint, data, {
      headers: this.headers,
    });
  }

  PutAPICall(endpoint: string, data: any) {
    return this.http.put(this.BaseUrl + endpoint, data, {
      headers: this.headers,
    });
  }

  deleteAPICall(endPoint: string, id: any) {
    return this.http.delete(this.BaseUrl + endPoint, { headers: this.headers });
  }

  updateAPICall(endPoint: string, data: any) {
    return this.http.put(this.BaseUrl + endPoint, data, {
      headers: this.headers,
    });
  }
}
