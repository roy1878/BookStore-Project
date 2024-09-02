import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss']
})
export class BookCartComponent implements OnInit {
  @Output() checkoutEvent = new EventEmitter<void>();
  
  isCart2Visible = false;
  isCard2Visible=true;
  isCart3Visible=false;
  isCard3Visible=true;

  isBtnVisible=true;
  isBtnVisible2=true
 
  cartItems: any[] = [];

  constructor(private cartService: CartService,private dataService: DataService,private route:Router) { }
 
  hideBtn1(){
    this.isBtnVisible=false;
  }

  hideBtn2(){
    this.isBtnVisible2=false;
  }



  showCart2() {
    this.isCart2Visible = true;
    this.isCard2Visible=false;
    this.hideBtn1();
  }

  showCart3(){
    this.isCart3Visible = true;
    this.isCard3Visible=false;
    this.hideBtn2();
    
  }
 

  ngOnInit(): void {
   this.dataService.currentCartList.subscribe({
    next:(res:any)=>{
      this.cartItems=res;
      console.log("cartlist",res);
      console.log(this.cartItems);


    }
   })
  }

  count:number=1;

  onIncrement(){
    this.count++;
  }


  onDecrement(){
    if(this.count>0){
      this.count--;
    }
  }


  // removeCartItem(itemId: string) {
  //   this.cartService.removeFromCart(itemId).subscribe({
  //     next: (res: any) => {
  //       console.log('Item removed', res);
       
  //       this.cartItems = this.cartItems.filter(item => item._id !== itemId);
  //     },
  //     error: (err: any) => {
  //       console.error('Error removing item', err);
  //     }
  //   });
  // }


  // onCheckout(): void {
  //   // this.checkoutEvent.emit();
  //   console.log("start checkout");
  //   this.dataService.updateOrderList(this.cartItems);
    
  
    
  //   for(let items of this.cartItems){
  //     console.log("deleting",items);
  //     this.cartService.removeFromCart(items._id).subscribe({
  //       next:(res:any)=>{
  //         console.log("dlt",res);
  //         this.dataService.updateCartList([]);

  //       },
  //       error: (err: any) => {
  //         console.error("error deleting", err);
  //     }
  
  //     })
      
  //   }

  //   this.route.navigate(['/dashboard/orderlist']);
  //   console.log("end checkout");
   
  // }

}
