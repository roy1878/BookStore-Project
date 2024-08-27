import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {
  BooksList:any[]=[];

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooksApiCall().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.BooksList=res.result;
        console.log(this.BooksList);
        
      }
    })

  }

}
