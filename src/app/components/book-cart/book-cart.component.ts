import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss'],
})
export class BookCartComponent implements OnInit {
  isCart2Visible = false;
  isCard2Visible = true;
  isCart3Visible = false;
  isCard3Visible = true;
  isLoggedIn: boolean = false;
  localQuantity = 0;
  isCartlisted: any = {};
 
  quantity: number = 0;
  isBtnVisible = true;
  isBtnVisible2 = true;
  cartItemId: string = 'cartlist._id';
  cartItems: any[] = [];
 
  PDisDisabled:boolean=true;
  CDisDisabled:boolean=false;
  customerAddress:string="";
  customerCity:string="";
  customerState:string="";
  customerAddType:any="Customer Address";
  customerDetails:any;
  showFirstDiv: boolean = true;
  customerAddreessList:any[]=[];
 
  editCard:boolean=false;
  displaySpan:boolean=false;
 
  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private route: Router,
    private userService:UserService,
    public dialog: MatDialog,
  ) {}
  hideBtn1() {
    this.isBtnVisible = false;
  }
 
  hideBtn2() {
    this.isBtnVisible2 = false;
  }
  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      width: '60%',
      height: '500px',
    });
  }
 
  showCart2() {
    if(!localStorage.getItem("access_token")) this.openDialog();
    this.isCart2Visible = true;
    this.isCard2Visible = false;
    this.hideBtn1();
  }
 
  showCart3() {
    this.isCart3Visible = true;
    this.isCard3Visible = false;
    this.hideBtn2();
  }
  orderPlaced() {
    this.route.navigate(['/dashboard/order-placed']);
  }
 
  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;
 
    this.dataService.currentCartList.subscribe({
      next: (res: any) => {
        if(localStorage.getItem("access_token")){
          this.cartItems = res;
          this.cartItems= this.cartItems.map(product=>product.product_id);
          
          console.log("check in book-cart of the currentcartlist if loggen IN",res,"cartitem", this.cartItems);
        }
        else{
          this.cartItems = res;

        }
        console.log('cartlist', res);
        console.log(this.cartItems);
      },
    });


    this.dataService.currentCartList.subscribe({
      next:(res:any)=>{
        console.log("addd in ds ",res);
        this.customerDetails=res[0].user_id.address;
        this.customerDetails = this.customerDetails.map((addressData: any) => ({
          ...addressData,
          showFirstDiv: true
        }));
        console.log("cust",this.customerDetails);
       
        // this.dataService.updateCustomerAddressList( this.customerDetails);
        console.log("add",res[0].user_id.address);
      }
    })

  }
 
  PDenableEditing(): void {
    this.PDisDisabled=false;
  }
 
  CDenableEditing(): void {
    this.CDisDisabled=false;
   
  }
 
  shouldShowFirstDiv(addressData: any): boolean {
    return addressData.showFirstDiv;
  }
 
 
  toggleDivs(addressData:any) {
    // this.showFirstDiv = !this.showFirstDiv;
    addressData.showFirstDiv = !addressData.showFirstDiv;
    const action=addressData.addressType;
    console.log(action);
 
    if (action == 'Office') {
      const officeItems = this.customerDetails.find((item: any) => {
        return item.addressType === 'Office';
      });
 
      console.log(officeItems);
 
      this.customerAddress = officeItems.fullAddress;
      this.customerCity = officeItems.city;
      this.customerState = officeItems.state;
      this.customerAddType = officeItems.addressType;
      console.log(officeItems.fullAddress);
    }
 
    else if (action == 'Home') {
      const officeItems = this.customerDetails.find((item: any) => {
        return item.addressType === 'Home';
      });
 
      console.log(officeItems);
 
      this.customerAddress = officeItems.fullAddress;
      this.customerCity = officeItems.city;
      this.customerState = officeItems.state;
      this.customerAddType = officeItems.addressType;
      console.log(officeItems.fullAddress);
    }
   else if (action == 'Other') {
      const officeItems = this.customerDetails.find((item: any) => {
        return item.addressType === 'Other';
      });
      this.customerAddress = officeItems.fullAddress;
      this.customerCity = officeItems.city;
      this.customerState = officeItems.state;
      this.customerAddType = officeItems.addressType;
      console.log(officeItems.fullAddress);
    }
   
  }
 
 
 
  saveAddress(){
   
 
    console.log(this.customerCity);
    console.log(this.customerAddType);
    this.customerDetails={
      "addressType": this.customerAddType,
      "fullAddress": this.customerAddress,
      "city": this.customerCity,
      "state": this.customerState
    }
 
    // this.CDisDisabled = true;
    this.userService.updateCustomerDetails(this.customerDetails).subscribe({
      next:(res:any)=>{
        console.log("Customer address update res ", res);
       
      }
    })
    this.showFirstDiv = !this.showFirstDiv;
    alert("Address Updated Successfully");
    window.location.reload();
 
  }
 
  add_new_add(){
        this.showFirstDiv = !this.showFirstDiv;
 
 
  }
 
 
   
 
   
 
 
  count: number = 1;
 
  onIncrement() {
    this.count++;
  }
 
  onDecrement() {
    if (this.count > 0) {
      this.count--;
    }
  }
  // handleUpdateCartBtn(action: string, cartItemId: string) {
 
  //   // let bookData = this.cartItems.filter((e:any)=>e.product_id._id === )
  //   if (this.isLoggedIn) {
  //     if (this.localQuantity > 0) this.quantity += this.localQuantity;
  //     if (action === 'increament') {
  //       this.quantity = this.quantity + 1;
  //     } else if (action === 'decreament' && this.quantity > 0) {
  //       this.quantity = this.quantity - 1;
  //     }
  //     console.log('quantity::::', this.quantity);
  //     console.log(this.isCartlisted);
 
  //     // Call the service to update the quantity
  //     this.cartService
  //       .updateCartItemQuantity(cartItemId, this.quantity)
  //       .subscribe(
  //         (response) => {
  //           console.log('Cart item quantity updated successfully', response);
  //         },
  //         (error) => {
  //           console.error('Error updating cart item quantity', error);
  //         }
  //       );
  //   }
  // }
 
  handleUpdateCartBtn(action: string, cartItemId: string) {
    if (this.isLoggedIn) {
      // Find the cart item by its ID
      const cartItem = this.cartItems.find((item: any) => item._id === cartItemId);
      console.log(cartItem);
     
     
      if (cartItem) {
        // Update the local quantity based on the action
        if (action === 'increament') {
          cartItem.quantityToBuy += 1;
        } else if (action === 'decreament' && cartItem.quantityToBuy > 0) {
          cartItem.quantityToBuy -= 1;
        }
 
        console.log('Updated quantity:', cartItem.quantityToBuy);
 
        // Call the service to update the quantity
        this.cartService.updateCartItemQuantity(cartItemId, cartItem.quantityToBuy).subscribe (
          (response) => {
            console.log('Cart item quantity updated successfully', response);
          },
          (error) => {
            console.error('Error updating cart item quantity', error);
          }
        );
      } else {
        console.error('Cart item not found');
      }
    } else {
      console.error('User is not logged in');
    }
  }
 
 
  removeCartItem(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: (res: any) => {
        console.log('Item removed', res);
 
        this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
      },
      error: (err: any) => {
        console.error('Error removing item', err);
      },
    });
  }
}
 

