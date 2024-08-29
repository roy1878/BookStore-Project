import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss']
})
export class BookCartComponent implements OnInit {
  isCart2Visible = false;
  isCard2Visible=true;
  isCart3Visible=false;
  isCard3Visible=true;

  isBtnVisible=true;
  isBtnVisible2=true
 
  cartItems: any[] = [];

  constructor(private cartService: CartService,private dataService: DataService) { }
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
      console.log(res);


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

}
