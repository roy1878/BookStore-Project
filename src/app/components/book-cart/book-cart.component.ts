import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
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
isCardVisible=false;
  quantity: number = 0;
  isBtnVisible = true;
  isBtnVisible2 = true;
  cartItemId: string = 'cartlist._id';
  cartItems: any[] = [];
  currentState !:string;
 
  PDisDisabled: boolean = true;
  CDisDisabled: boolean = false;
  customerAddress: string = "";
  customerCity: string = "";
  customerState: string = "";
  customerAddType: any = "Customer Address";
  customerDetails: any;
  showFirstDiv: boolean = true;
  customerAddreessList: any[] = [];

  editCard: boolean = false;
  displaySpan: boolean = false;
  showShopNowCard: boolean = false;
  firstForm:boolean=false;
  constructor(
    private dataService: DataService,
    private route: Router,
    private userService: UserService,
    private cartService :CartService,
    public dialog: MatDialog,
  ) { }

  hideBtn1() {
    this.isBtnVisible = false;
  }

  hideBtn2() {
    this.isBtnVisible2 = false;
  }

  handleButtonClick() {
    if (this.currentState == 'loggedIn') {
      this.showCart2();
    } else if (this.cartItems.length > 0) {
      this.redirectToLogin();
    } else {
      this.redirectToBooks();
    }
  }
  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      width: '60%',
      height: '500px',
    });
  }
  
  getButtonText(): string {
    if ( this.currentState == 'loggedIn') {
      return 'Place Order';
    } else if (this.cartItems.length > 0 && this.currentState == 'loggedOut') {
      return 'Login to Shop';
    } else {
      return 'Shop Now';
    }
  }
  
  showCart2() {
    this.isCart2Visible = true;
    this.isCard2Visible = false;
    this.hideBtn1();
  }
  

  

  
  redirectToBooks() {
    this.route.navigate(['/dashboard/books']);
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
    this.loadCartItems();
   
    this.dataService.currentLoginState.subscribe({
      next:(res)=>this.currentState = res
    })
    
    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.dataService.currentCartList.subscribe({
      next: (res: any) => {
        this.cartItems = res;
        console.log('cartlist', res);
        this.checkCart();
        console.log(this.cartItems);
      },
    });
    this.dataService.currentCartList.subscribe({
      next: (res: any) => {
        console.log(res.user_id);
        
        this.customerDetails = res[0].user_id.address;

        this.customerDetails = this.customerDetails.map((addressData: any) => ({
          ...addressData,
          showFirstDiv: true
        }));
        console.log("custttt", this.customerDetails);

        console.log("add", res[0].user_id.address);
      }
    })
  }



  
  

  PDenableEditing(): void {
    this.PDisDisabled = false;
  }

  CDenableEditing(): void {
    this.CDisDisabled = false;
  }

  shouldShowFirstDiv(addressData: any): boolean {
    return addressData.showFirstDiv;
  }

  toggleDivs(addressData: any) {
    addressData.showFirstDiv = !addressData.showFirstDiv;
    const action = addressData.addressType;
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
    } else if (action == 'Home') {
      const officeItems = this.customerDetails.find((item: any) => {
        return item.addressType === 'Home';
      });

      console.log(officeItems);

      this.customerAddress = officeItems.fullAddress;
      this.customerCity = officeItems.city;
      this.customerState = officeItems.state;
      this.customerAddType = officeItems.addressType;
      console.log(officeItems.fullAddress);
    } else if (action == 'Other') {
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

  saveAddress() {
    console.log(this.customerCity);
    console.log(this.customerAddType);
    this.customerDetails = {
      "addressType": this.customerAddType,
      "fullAddress": this.customerAddress,
      "city": this.customerCity,
      "state": this.customerState
    }

    this.userService.updateCustomerDetails(this.customerDetails).subscribe({
      next: (res: any) => {
        console.log("Customer address update res ", res);
      }
    })
    this.showFirstDiv = !this.showFirstDiv;
    alert("Address Updated Successfully");
    // window.location.reload();
  }

  add_new_add() {
    // this.showFirstDiv = !this.showFirstDiv;
    this.firstForm=true;
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

  handleUpdateCartBtn(action: string, cartItemId: string) {
    if (this.isLoggedIn) {
      const cartItem = this.cartItems.find((item: any) => item._id === cartItemId);
      console.log(cartItem);

      if (cartItem) {
        if (action === 'increament') {
          cartItem.quantityToBuy += 1;
        } else if (action === 'decreament' && cartItem.quantityToBuy > 0) {
          cartItem.quantityToBuy -= 1;
        }

        console.log('Updated quantity:', cartItem.quantityToBuy);

        this.dataService.updateLocalCartList(cartItemId, cartItem.quantityToBuy);
      } else {
        console.error('Cart item not found');
      }
    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    //this.route.navigate(['/login-signup']);
    this.openDialog();
  }

  redirectToHome() {
    this.route.navigate(['/dashboard/books']);
  }

  removeCartItem(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: (res: any) => {
        console.log('Item removed', res);
 
        this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
        this.dataService.updateCartList(this.cartItems);
      },
      error: (err: any) => {
        console.error('Error removing item', err);
      },
    });
  }
 

  loadCartItems() {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.checkCart(); // Check cart status after loading items
  }

  checkCart() {
    if ( this.cartItems.length === 0 ) {
      this.isCardVisible = true;
      this.hideOtherElements();
    } else {
      this.isCardVisible = false;
      this.showOtherElements();
    }
  }

  hideOtherElements() {
    const cart1 = document.querySelector('.cart1') as HTMLElement;
    const cart2 = document.querySelector('.cart2') as HTMLElement;
    const cart3 = document.querySelector('.cart3') as HTMLElement;

    if (cart1) cart1.style.display = 'none';
    if (cart2) cart2.style.display = 'none';
    if (cart3) cart3.style.display = 'none';
  }

  showOtherElements() {
    const cart1 = document.querySelector('.cart1') as HTMLElement;
    const cart2 = document.querySelector('.cart2') as HTMLElement;
    const cart3 = document.querySelector('.cart3') as HTMLElement;

    if (cart1) cart1.style.display = 'block';
    if (cart2) cart2.style.display = 'block';
    if (cart3) cart3.style.display = 'block';
  }

  // Call this method whenever the cart is updated
  updateCart(newCartItems: any[]) {
    this.cartItems = newCartItems;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.checkCart();
  }

//  removeCartItem(itemId: string) {
//     this.cartService.removeFromCart(itemId).subscribe({
//       next: (res: any) => {
//         console.log('Item removed', res);
       
//         this.cartItems = this.cartItems.filter(item => item._id !== itemId);
//       },
//       error: (err: any) => {
//         console.error('Error removing item', err);
//       }
//     });
//   }


  onCheckout(): void {
    // this.checkoutEvent.emit();
    console.log("start checkout");
    this.dataService.updateOrderList(this.cartItems);
    
  
    
    for(let items of this.cartItems){
      console.log("deleting",items);
      this.cartService.removeFromCart(items._id).subscribe({
        next:(res:any)=>{
          console.log("dlt",res);
          this.dataService.updateCartList([]);

        },
        error: (err: any) => {
          console.error("error deleting", err);
      }
  
      })
      
    }

    this.route.navigate(['/dashboard/order-placed']);
    console.log("end checkout");
   
  }

  saveNewForm(){
    let customerDetail= {
      "addressType": this.customerAddType,
      "fullAddress": this.customerAddress,
      "city": this.customerCity,
      "state": this.customerState,
      "showFirstDiv": true
    }

    // this.userService.updateCustomerDetails(this.customerDetails).subscribe({
    //   next: (res: any) => {
    //     console.log("Customer address update res ", res);
    //   }
    // })
    this.customerDetails=[... this.customerDetails,customerDetail];
    // this.showFirstDiv = !this.showFirstDiv;

    this.firstForm=false;
  }
 
}
