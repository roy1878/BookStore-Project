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

  getBookByIdApiCall(id:any){
    return this.httpService.GetApiCall(`bookstore_user/get/book/${id}`)
  }
  
  getBookReviews(id: any) {
    // console.log('yaha aa rha');
    
    return this.httpService.GetApiCall(`bookstore_user/get/feedback/${id}`);
  }
  postReviews(id: any, data: any) {
    return this.httpService.PostAPICall(
      `bookstore_user/add/feedback/${id}`,
      data
    );
  }

  postWishlistBook(id: any) {
    return this.httpService.PostAPICall(
      `bookstore_user/add_wish_list/${id}`,
      id
    );
  }


  deleteWishListItem(id:any){
    return this.httpService.deleteAPICall(`bookstore_user/remove_wishlist_item/${id}`,id);
  }

  postCartItem(id:any){
    return this.httpService.PostAPICall(
      `bookstore_user/add_cart_item/${id}`, id
    );
  }

  putAddToCartQuantity(id: any, data: any) {
    
    return this.httpService.PutAPICall(
      `bookstore_user/cart_item_quantity/${id}`,
      data
    );
  }

}
