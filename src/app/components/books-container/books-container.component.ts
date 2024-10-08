import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
})
export class BooksContainerComponent implements OnInit {
  searchQuery: string = '';
  BooksList: any[] = [];
  paginatedCards: any[] = [];
  pageSize = 8;
  pageIndex = 0;
  length = 0;
  pageNumbers: number[] = [];
  currentRoute!: string;
  currentState!: string;
  constructor(
    private bookService: BookService,
    private dataservice: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.url.subscribe((urlSegment) => {
      this.currentRoute = urlSegment.join('/');
      console.log(this.currentRoute);
      
    });

    this.bookService.getAllBooksApiCall().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.BooksList = res.result;
        this.length = this.BooksList.length;
        this.updatePaginatedCards();
        this.updatePageNumbers();
        // console.log(this.BooksList);
      },
    });
    this.dataservice.currentData.subscribe((query) => {
      this.searchQuery = query;
      console.log('SearchQuery: ' + this.searchQuery);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCards();
    this.updatePageNumbers();
  }

  updatePaginatedCards() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCards = this.BooksList.slice(startIndex, endIndex);
  }

  updatePageNumbers() {
    const totalPages = Math.ceil(this.length / this.pageSize);
    this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.pageIndex = page - 1;
    this.updatePaginatedCards();
  }

  handleBookcardClick(id: any) {
    this.router.navigate(['dashboard/bookdetails'], {
      queryParams: { id: id },
    });
    console.log(id);
  }

  sortItems(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;

    if (sortBy === 'price-low-high') {
      this.BooksList.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortBy === 'price-high-low') {
      this.BooksList.sort((a, b) => b.discountPrice - a.discountPrice);
    }
    // else if (sortBy === 'rating') {
    //   this.BooksList.sort((a, b) => b.rating - a.rating);
    // }

    this.updatePaginatedCards();
  }
}
