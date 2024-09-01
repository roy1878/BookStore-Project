import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  wishCardLists: any[] = [];
  AddressList: any[] = [];
  showDiv: boolean = false;

  constructor(
    private dataService: DataService,
    private bookService: BookService,
    private route: Router
  ) {}

  ngOnInit(): void {
    console.log('on ng onit of wishlist');
    this.dataService.currentWishList.subscribe((res) => {
      this.wishCardLists = res;
      console.log('wishlist', res);
      this.wishCardLists = this.wishCardLists.filter(
        (ele) => ele._id != null || ele.product_id._id != null
      );
      setTimeout(() => {
        if (this.wishCardLists.length == 0) this.showDiv = true;
        else console.log('Filterwishlist', this.wishCardLists);
      }, 600);
    });
  }

  handleDeleteIcon(id: any) {
    this.wishCardLists = this.wishCardLists.filter(
      (ele) => ele.product_id._id != id
    );
    if (this.wishCardLists.length == 0) {
      this.showDiv = true;
      console.log('no wish card', this.wishCardLists);
    }
    this.bookService.deleteWishListItem(id).subscribe({
      next: (res: any) => {
        console.log('Dlt res', res);

        console.log('id deleted is : ', id);
        this.wishCardLists =  this.wishCardLists.filter((e:any)=>e.product_id._id !== id)
        this.dataService.updateWishList(this.wishCardLists);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  navigateHome() {
    this.route.navigate(['/dashboard/books']);
  }
}
