import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  wishlist: any[] = [];
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
  booklist = [];
  wishlistObj: any = {};
  currentState: string = '';
  selectedIndex:number=0;

  constructor(
    private activeRoute: ActivatedRoute,
    private bookService: BookService,
    public dialog: MatDialog,
    private dataService: DataService,
    private http: HttpClient,
    private router:Router
  ) {}

  ngOnInit(): void {
    

    this.dataService.currentLoginState.subscribe({
      next: (res) => (this.currentState = res),
    });
    this.name = localStorage.getItem('name') || 'Alexa Martin';

    this.bookService.getAllBooksApiCall().subscribe({
      next: (res: any) => {
        this.booklist = res.result;
        console.log('booklist', this.booklist);
        this.selectedIndex = this.booklist.findIndex( (e: any) => e._id === this.questionId)
        this.selectedBook = this.booklist.find(
          (e: any) => e._id === this.questionId
        );
      },
    });

    this.activeRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.questionId = params['id'];
      });

      this.dataService.currentWishList.subscribe({
        next: (res: any) => {
          console.log('WishList:::::', res);
          this.wishlist = res;
          let data = res.find((e: any) => {
            return e.product_id._id === this.questionId;
          });
          console.log('wishlist ka data', data);
  
          if (data) this.isWishListed = true;
          else this.isWishListed = false;
        },
      });

    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    }

    this.dataService.currentCartList.subscribe({
      next: (res: any[]) => {
        console.log('CartList::::::', res);
        this.cartlist = res;
        console.log('resss', res);

        this.isCartlisted = res.find((e: any) => {
          return e.product_id._id === this.questionId;
        });

        if (this.isCartlisted) this.quantity = this.isCartlisted.quantityToBuy;
      },
      error: (err) => console.log(err),
    });

    if (localStorage.getItem('access_token')) {
      this.bookService.getBookReviews(this.questionId).subscribe({
        next: (res: any) => {
          this.feedbackList = res.result.reverse();
          console.log('feedbackkk: ', this.feedbackList);
          this.feedbackList.rating = Array(5).fill(0);
        },
        error: (err) => console.log(err),
      });
    }
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
    if (this.currentState == 'loggedOut') {
      this.feedbackList = [1, 2, 3, 4, 5, 6];
      return 4.5;
    }
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
      return
    }

    this.wishlistObj = {
      product_id: {
        _id: this.selectedBook._id,
        description: this.selectedBook.description,
        author: this.selectedBook.author,
        bookName: this.selectedBook.bookName,
        price: this.selectedBook.price,
        discountPrice: this.selectedBook.discountPrice,
        quantity: this.selectedBook.quantity,
        admin_user_id: this.selectedBook.admin_user_id,
      },
      quantityToBuy: this.localQuantity,
      user_id: {}, 
    };
    this.bookService.postWishlistBook(this.questionId).subscribe({
      next: (res: any) => {
        console.log("dataaa:",res);
        this.dataService.updateWishList([...this.wishlist, this.wishlistObj]);
        this.isWishListed = true;
      },
      error: (err) => console.log('err: ', err),
    });
  }

  handleAddToCartBtn(action: string) {
    if (this.isLoggedIn) {
      
      if (action === 'increament') {
        this.quantity = this.quantity + 1;
        console.log(this.quantity);
        
      } else if (action === 'decreament' && this.quantity > 0) {
        this.quantity = this.quantity - 1;
      }
      let bookdata: any = this.booklist.find(
        (e: any) => e._id == this.questionId
      );
      console.log(bookdata);
      let obj: any = {};

      obj = {
        product_id: {
          _id: bookdata._id,
          description: bookdata.description,
          author: bookdata.author,
          bookName: bookdata.bookName,
          price: bookdata.price,
          discountPrice: bookdata.discountPrice,
          quantity: bookdata.quantity,
          admin_user_id: bookdata.admin_user_id,
        },
        quantityToBuy: this.quantity,
        user_id: {},
      };

      if (!this.isCartlisted) {
        console.log('yaha aya');

        this.bookService.postCartItem(obj.product_id._id).subscribe({
          next: (res: any) => {
            console.log('result before:', res);
            obj._id = res.result._id;
            this.dataService.updateCartList([...this.cartlist, obj]);
            console.log('result:', this.cartlist);
          },
        });
      } else {
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
      }
    } else {
      if (action == 'decreament') {
        this.localQuantity--;
      } else {
        this.localQuantity++;
      }

      let bookdata: any = this.booklist.find(
        (e: any) => e._id === this.questionId
      );

      console.log('cartlissssttt:', this.cartlist);

      let isCartlisted = this.cartlist.find(
        (e: any) => e.product_id._id === this.questionId
      );

      let obj = {
        product_id: {
          _id: bookdata._id,
          description: bookdata.description,
          author: bookdata.author,
          bookName: bookdata.bookName,
          price: bookdata.price,
          discountPrice: bookdata.discountPrice,
          quantity: this.quantity,
          admin_user_id: bookdata.admin_user_id,
        },
        quantityToBuy: this.localQuantity,
        user_id: {
          address: [],
          fullName: localStorage.getItem('name') || 'Alexa Martin',
          phone: localStorage.getItem('phone') || '+919110096046',
        },
      };

      if (bookdata && !isCartlisted) {
        this.dataService.updateCartList([...this.cartlist, obj]);
      } else {
        isCartlisted.quantityToBuy = this.localQuantity;
        let index = this.cartlist.findIndex(
          (e: any) => e.product_id._id === isCartlisted.product_id._id
        );
        if (index !== -1) {
          console.log('aaaaa');

          this.cartlist = [
            ...this.cartlist.slice(0, index),
            isCartlisted,
            ...this.cartlist.slice(index + 1),
          ];
        }
      }

      console.log(this.localQuantity);
      this.quantity = this.localQuantity;
    }
  }

  handleHomeBtn() {
    this.router.navigate(['/'])
    }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}