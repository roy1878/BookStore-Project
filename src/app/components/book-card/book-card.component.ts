import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() bookDetails: any;
  imagesArray: any[] = [
    '../../../assets/books-img/Image 10.png',
    '../../../assets/books-img/Image 11.png',
    '../../../assets/books-img/Image 12.png',
    '../../../assets/books-img/Image 13.png',
    '../../../assets/books-img/Image 14.png',
    '../../../assets/books-img/Image 18.png',
    '../../../assets/books-img/Image 36.png',
  ];

  randomImage!: string;
  feedbackList: any[] = [];
  questionId: number = 1;
  averageRating!: number;
  currentState!: string;

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router:Router
  ) {}

  ngOnInit(): void {

    

    this.dataService.currentLoginState.subscribe({
      next: (res) => {
        this.currentState = res;
        // console.log("current state in card",this.currentState);
        if(localStorage.getItem('access_token')){
          this.getAvgRating();
        this.fetchBookReviews();}
      },
    });

    this.setRandomImage();
  }

  setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.imagesArray.length);
    this.randomImage = this.imagesArray[randomIndex];
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

  fetchBookReviews(): void {
    this.bookService.getBookReviews(this.bookDetails._id).subscribe({
      next: (res: any) => {
        this.feedbackList = res.result;
      },
      error: (err) => console.log(err),
    });
  }
}
