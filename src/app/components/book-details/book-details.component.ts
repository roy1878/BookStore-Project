import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  selectedBook: any = {};
  feedbackList: any = {};
  rating: number = 0;
  questionId: number = 1;
  starsArray: any = [];
  reviewText: string = '';
  showWishlistBtn: boolean = true;
  isLoggedIn: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.questionId = params['que'];
      });

    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = !this.isLoggedIn;
    }

    // console.log("id: ",this.questionId);

    this.bookService.getAllBooksApiCall().subscribe({
      next: (res: any) => {
        console.log('result: ', res);
        // console.log(this.questionId);

        this.selectedBook = res.result.find(
          (e: any) => e._id === this.questionId
        );
        console.log('selected book: ', this.selectedBook);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.bookService.getBookReviews(this.questionId).subscribe({
      next: (res: any) => {
        this.feedbackList = res.result.reverse();
        console.log(this.feedbackList);
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
      user_id: { fullName: 'Priya Kumari' },
    };

    if (this.reviewText && this.rating) {
      this.feedbackList = [reviewObj, ...this.feedbackList];

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
      next: (res) => console.log('res', res),
      error: (err) => console.log('err: ', err),
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
