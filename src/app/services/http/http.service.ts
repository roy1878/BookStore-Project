import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BaseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  header = {
    'x-access-token': localStorage.getItem(`access_token`)!,
  };
  constructor(private http: HttpClient) {}

  GetApiCall(endpoint: string) {
    return this.http.get(this.BaseUrl + endpoint, { headers: this.header });
  }
  postApiCall(data: any, endpoint: string) {
    console.log(data);
    const { comment, rating } = data;
    return this.http.post(
      `${this.BaseUrl}${endpoint}`,
      {
        comment: comment,
        rating: rating,
      },
      {
        headers: this.header,
      }
    );
  }

  PostAPICall(endPoint: string, data: any) {
    return this.http.post(this.BaseUrl + endPoint, data);
  }

  deleteAPICall(endPoint: string){
    return this.http.delete(this.BaseUrl+endPoint,{ headers: this.header });
    
  }
}
