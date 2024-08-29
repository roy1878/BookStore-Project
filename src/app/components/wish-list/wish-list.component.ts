import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  wishCardLists:any[]=[];

  constructor(private dataService:DataService, private bookService:BookService) { }

  ngOnInit(): void {
    this.dataService.currentWishList.subscribe((res)=>{
      this.wishCardLists=res;
      console.log("wishlist",res);
      this.wishCardLists=this.wishCardLists.filter((ele)=>ele.product_id!=null);
      console.log("Filterwishlist",this.wishCardLists);
    })
  }

  handleDeleteIcon(id:any){
    this.bookService.deleteWishListItem(id).subscribe({
      next:(res:any)=>{
        console.log("Dlt res", res);
        console.log("id deleted is : ",id);
        this.wishCardLists=this.wishCardLists.filter((ele)=>ele._id!=id);
      },
      error:(err:any)=>{

      }
    });
    
    

  }

}
