import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookDetails:any;
  imagesArray:any[]=["../../../assets/books-img/Image 10.png","../../../assets/books-img/Image 11.png",
    "../../../assets/books-img/Image 12.png","../../../assets/books-img/Image 13.png",
    "../../../assets/books-img/Image 14.png","../../../assets/books-img/Image 18.png",
    "../../../assets/books-img/Image 36.png"];

    randomImage!: string;
    feedbackList: any[] = [];
    questionId: number = 1;
    averageRating!: number;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.setRandomImage();

    this.bookService.getBookReviews(this.bookDetails._id).subscribe({
      next: (res: any) => {
        this.feedbackList = res.result;
        console.log(this.feedbackList);
        
      },
      error: (err) => console.log(err),
    });
  
  }
  setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.imagesArray.length);
    this.randomImage = this.imagesArray[randomIndex];
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

}
