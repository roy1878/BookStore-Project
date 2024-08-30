import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  selectedBook: any = {};
  feedbackList: any = [];
  cartlist: any = [];
  wishlist: any = [];
  rating: number = 0;
  questionId: number = 1;
  starsArray: any = [];
  reviewText: string = '';
  showWishlistBtn: boolean = true;
  isLoggedIn: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  bookAlreadyInCart: boolean = false;
  quantity: number = 0;
  localQuantity = 0;
  isCartlisted: any = {};
  data: any = {};
  access_token = localStorage.getItem('access_token');
  isWishListed: boolean = false;
  name: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private bookService: BookService,
    public dialog: MatDialog,
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.name= localStorage.getItem('name')!;

    this.dataService.currentlocalcartlistData.subscribe({
      next: (res) => {
        console.log('Result:::', res);
      },
    });
    if (this.data) this.isWishListed = true;
    this.activeRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.questionId = params['id'];
      });

    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    }

    this.dataService.currentCartList.subscribe({
      next: (res: any[]) => {
        console.log('CartList::::::', res);
        this.cartlist = res;
        this.isCartlisted = res.find((e: any) => {
          return e.product_id._id === this.questionId;
        });
        if (this.isCartlisted) this.quantity = this.isCartlisted.quantityToBuy;
      },
      error: (err) => console.log(err),
    });

    this.dataService.currentWishList.subscribe((res: any[]) => {
      // console.log('WishList:::::', res);
      console.log(this.questionId);

      this.wishlist = res.filter((ele: any) => ele.product_id != null);
      this.data = this.wishlist.find(
        (e: any) => e.product_id._id === this.questionId
      );
      console.log('Wishlist: ', this.wishlist);

      console.log('DAta:::', this.data);

      if (this.data) {
        this.isWishListed = true;
      } else this.isWishListed = false;
    });

    console.log('isWishlisted', this.isWishListed);

    this.bookService.getAllBooksApiCall().subscribe({
      next: (res: any) => {
        this.selectedBook = res.result.find(
          (e: any) => e._id === this.questionId
        );
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.bookService.getBookReviews(this.questionId).subscribe({
      next: (res: any) => {
        this.feedbackList = res.result.reverse();
        // console.log(this.feedbackList);
        this.feedbackList.rating = Array(5).fill(0);
      },
      error: (err) => console.log(err),
    });
  }

  getGoldStar(rating: number) {
    return Array(rating).fill(0);
  }

  getGreyStar(rating: number) {
    return Array(5 - rating).fill(0);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  }

  getAvgRating() {
    let count = this.feedbackList.reduce(
      (acc: number, e: any) => acc + e.rating,
      0
    );
    let average = count / this.feedbackList.length;
    let roundedAverage = Math.round(average * 2) / 2;
    return roundedAverage;
  }

  setRating(star: number) {
    this.rating = star;
    console.log(this.rating);
  }

  getStars() {
    return Array(5).fill(0);
  }

  getIndex(index: number) {
    this.rating = index;
    console.log(this.rating);
  }

  submitFeedback() {
    if (!this.isLoggedIn) {
      this.openDialog();
    }
    console.log('Rating:', this.rating);
    console.log('Review:', this.reviewText);
    let reviewObj = {
      comment: this.reviewText,
      rating: this.rating,
      // fullName: localStorage.getItem('name'),
      user_id: { fullName: this.name },
    };

    this.feedbackList = [reviewObj, ...this.feedbackList];
    if (this.reviewText && this.rating)
      this.bookService
        .postReviews(this.questionId, {
          comment: this.reviewText,
          rating: this.rating.toString(),
        })
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => console.log(err),
        });
  }
  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      width: '50%',
      height: '550px',
    });
  }

  handleWishlistBtn() {
    if (!this.isLoggedIn) {
      this.openDialog();
    }
    this.bookService.postWishlistBook(this.questionId).subscribe({
      next: (res) => {
        console.log('res', res);
        this.isWishListed = !this.isWishListed;
      },
      error: (err) => console.log('err: ', err),
    });
  }

  handleAddToCartBtn(action: string) {
    if (this.isLoggedIn) {
      if (this.localQuantity > 0) this.quantity += this.localQuantity;
      if (action === 'increament') {
        this.quantity = this.quantity + 1;
      } else if (action === 'decreament' && this.quantity > 0) {
        this.quantity = this.quantity - 1;
      }
      console.log('quantity::::', this.quantity);

      console.log(this.isCartlisted);

      if (!this.isCartlisted) {
        this.bookService
          .postCartItem(this.questionId, this.isCartlisted)
          .subscribe({ next: (res: any) => console.log(res) });
      }
      this.bookService
        .putAddToCartQuantity(this.isCartlisted._id, {
          quantityToBuy: this.quantity,
        })
        .subscribe({
          next: (res) => {
            console.log('Put result:', res);

            const updatedData = this.cartlist.map((book: any) =>
              book.product_id._id === this.questionId
                ? { ...book, quantityToBuy: this.quantity }
                : book
            );

            this.dataService.updateCartList(updatedData);
          },
          error: (err) => {
            console.error('Error updating cart:', err);
          },
        });
    } else {
      if (action == 'decreament') {
        this.localQuantity--;
      } else {
        this.localQuantity++;
      }

      localStorage.setItem('localQuantity', this.localQuantity.toString());

      this.dataService.updateLocalCartList(this.questionId, {
        quantity: this.localQuantity,
      });
      console.log(this.localQuantity);
      this.quantity = this.localQuantity;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
