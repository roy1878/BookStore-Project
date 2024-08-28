import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpService: HttpService) {}

  getAllBooksApiCall() {
    return this.httpService.GetApiCall('bookstore_user/get/book');
  }

  getBookReviews(id: any) {
    return this.httpService.GetApiCall(`bookstore_user/get/feedback/${id}`);
  }
  postReviews(id: any, data: any) {
    return this.httpService.postApiCall(
      data,
      `bookstore_user/add/feedback/${id}`
    );
  }

  postWishlistBook(id: any) {
    return this.httpService.PostAPICall(
      
      `bookstore_user/add_wish_list/${id}`,id
    );
  }
}
