import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/user/user.service';

interface CartDetailsResponse {
  result: any; // Replace 'any' with the actual type if known
}

interface BackendCartResponse {
  result: any; // Replace 'any' with the actual type if known
}

interface Product {
  description: string;
  discountPrice: number;
  bookImage: string | null;
  _id: string;
  admin_user_id: string;
  bookName: string;
  author: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartItem {
  product_id: Product;
  quantityToBuy: number;
  _id?: string;
  user_id?: {
    address: Array<{
      addressType: string;
      fullAddress: string;
      city: string;
      state: string;
    }>;
    isVerified: boolean;
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  BackendCartList: any[] = [];
  DataServiceCartList: any[] = [];
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  currentState!: string;
  currentRoute!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private httpService: HttpService,
    public dialog: MatDialog,
    private dataService: DataService,
    private http: HttpClient,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService.currentLoginState.subscribe({
      next: (res) => {
        if (localStorage.getItem('access_token')) {
          this.currentState = res;
          // this.functionUpdateServices();
        }
      },
    });

    this.dataService.currentCartList.subscribe({
      next: (res) => {
        this.DataServiceCartList = res;
        console.log('DataServiceCartList: ', this.DataServiceCartList);
      },
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.activatedRoute.url.subscribe((urlSegment) => {
      this.currentRoute = this.router.url;
    });
  }

  login() {
    if (this.currentRoute.includes('/admin')) {
      this.adminLogin();
    } else {
      this.userLogin();
    }
  }

  userLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    console.log(email, password);

    this.userService
      .loginAPICall({ email: email, password: password })
      .subscribe({
        next: (res: any) => {
          console.log('response', res);
          localStorage.setItem('access_token', res.result.accessToken);
          console.log('access_token', res.result.accessToken);

          // this.router.navigate(["./dashboard/books"]);
          // this.dialog.closeAll();
          // *****
          this.dataService.updateLoginState();

          // this.router
          //   .navigateByUrl('/', { skipLocationChange: true })
          //   .then(() => {
          //     console.log('change route');

          //     this.router.navigate([this.router.url]);
          //   });

          this.dialog.closeAll();

          //  this.functionUpdateServices();

          //  ***
          if (this.currentState == 'loggedOut') {
            this.cartService.getCartItems().subscribe({
              next: (res) => {
                this.BackendCartList = res.result;
                console.log('BackendList:', res.result);
              },
            });
          }

          if (localStorage.getItem('access_token') || res.result.accessToken)
            this.cartFinalization();

          // window.location.reload();
        },
        error: (err) => {
          console.log('error:', err);
        },
      });
  }
  adminLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    console.log(email, password);

    this.userService
      .adminAPICall({ email: email, password: password })
      .subscribe({
        next: (res: any) => {
          console.log('response', res);

          localStorage.setItem('admin_token', res.result.accessToken);
          localStorage.setItem('email', email);
          console.log('admin_token', res.result.accessToken);
          // this.router.navigate(["./dashboard/books"]);
          window.location.reload();
          this.dialog.closeAll();
        },
        error: (err) => {
          console.log('error:', err);
        },
      });
  }

  forgotPassword() {
    this.router.navigate(['dashboard/books']);
  }
  userRegister() {
    if (this.registerForm.invalid) {
      // console.log(this.registerForm.invalid);
      return;
    }

    const { fullName, email, password, phone } = this.registerForm.value;

    let register = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    };

    this.userService.registerApiCall(register).subscribe({
      next: (res: any) => {
        console.log('response', res);
      },
      error: (err: any) => {
        console.log('response', err);
      },
    });
  }

  async cartFinalization() {
    console.log('Finalizing cart...');

    let cartList: any[] = [];

    try {
      this.dataService.currentCartList.subscribe({
        next: (res: any) => {
          console.log(res);
          cartList = res;
        },
      });

      console.log(cartList);

      let token = localStorage.getItem('access_token');
      let headers = new HttpHeaders({
        'x-access-token': token || '',
      });
      const backendCart: BackendCartResponse = await firstValueFrom(
        this.http.get<BackendCartResponse>(
          'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items',
          { headers }
        )
      );
      console.log(backendCart);
      this.BackendCartList = backendCart.result; // data present here

      console.log('backendCartList:: ', this.BackendCartList); // data is here
      console.log('dataServiceCartList:: ', this.DataServiceCartList); // data is here

      console.log(backendCart);
      console.log(cartList);

      let mergedFinalDataForCart = [];

      mergedFinalDataForCart = [...backendCart.result, ...cartList];

      console.log(mergedFinalDataForCart);

      let quantityMap = new Map();

      mergedFinalDataForCart.forEach((item) => {
        let bookName = item.product_id.bookName;
        if (quantityMap.has(bookName)) {
          quantityMap.get(bookName).quantityToBuy += item.quantityToBuy;
        } else {
          quantityMap.set(bookName, { ...item });
        }
      });

      let updatedCart = Array.from(quantityMap.values());

      updatedCart.map((cartItem) => {
        this.cartService
          .updateCartItemQuantity(
            cartItem.product_id._id,
            cartItem.quantityToBuy
          )
          .subscribe({
            next: (res: any) => {
              console.log('res', res);
            },
            error: (err: any) => {
              console.log('err', err);
            },
          });
      });

      let backendArray: any = backendCart.result;
      console.log(updatedCart);

      for (let i = 0; i < updatedCart.length; i++) {
        let item = updatedCart[i];
        let found = false;
        for (let j = 0; j < backendArray.length; j++) {
          if (
            backendArray[j].product_id.bookName === item.product_id.bookName
          ) {
            found = true;
            break;
          }
        }

        console.log(item);

        if (found) {
          console.log('PUT:', item._id, { quantityToBuy: item.quantityToBuy });

          this.http
            .put(
              `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${item._id}`,
              { quantityToBuy: item.quantityToBuy },
              { headers }
            )
            .subscribe({
              next: (res: any) => {
                console.log('PUT Success:', res);
              },
              error: (err: any) => {
                console.error('PUT Error:', err);
              },
            });
        } else {
          console.log('POST:', item.product_id._id, item.product_id._id);
          this.bookService.postCartItem(item.product_id._id).subscribe({
            next: (res:any) => {
              console.log(res);
              this.cartService.updateCartItemQuantity(res.result._id,item.quantityToBuy).subscribe({
                next:(res)=>console.log(res)
                
              })
            },
          });
        }
      }

      this.dataService.updateCartList(updatedCart);
    } catch (error) {
      console.error('Error finalizing cart', error);
    }
  }
}
