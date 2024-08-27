import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {
  searchQuery :string = '';
  BooksList:any[]=[];

  constructor(private bookService:BookService, private dataservice:DataService) { }

  ngOnInit(): void {
    this.bookService.getAllBooksApiCall().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.BooksList=res.result;
        console.log(this.BooksList);
        
      }
    })
    this.dataservice.currentData.subscribe((query) => {
      this.searchQuery = query;
      console.log('SearchQuery: ' + this.searchQuery);
    });

  }

 

}
