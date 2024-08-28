import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(bookList: any[], searchQuery: string): any {
    if (!bookList) return [];
    if (!searchQuery) return bookList;

    searchQuery = searchQuery.toLowerCase();
    console.log('hi');

    return bookList.filter(
      (e) =>
        e.bookName.toLowerCase().includes(searchQuery) ||  e.author.toLowerCase().includes(searchQuery)
    );
  }
}
