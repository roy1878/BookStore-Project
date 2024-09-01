import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/user/user.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private httpService: HttpService,
    public dialog: MatDialog,
    private dataService: DataService,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.dataService.currentLoginState.subscribe({
      next: (res) => {
        if (localStorage.getItem('access_token')) {
          this.currentState = res;
          this.functionUpdateServices();
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
          this.cartService.getCartItems().subscribe({
            next:(res)=>{
              this.BackendCartList = res.result;
              console.log("BackendList:" ,res.result);
              
            }
          })

          // window.location.reload();
        },
        error: (err) => {
          console.log('error:', err);
        },
      });
  }
  functionUpdateServices() {
    if (!this.DataServiceCartList || this.DataServiceCartList.length === 0) {
      this.dataService.addToCartList(this.BackendCartList);

    } else if (this.BackendCartList.length === 0) {
      for (let dataServiceItem of this.DataServiceCartList) {
        this.bookService
          .postCartItem(dataServiceItem.product_id._id)
          .subscribe({
            next: (res: any) => {
              console.log('Item posted: ', res);
            },
            error: (err) => console.log(err),
          });
      }
    } else {
      for (let dataServiceItem of this.DataServiceCartList) {
        let backendItem = this.BackendCartList.find(
          (item: any) => item.product_id._id === dataServiceItem.product_id._id
        );

        if (backendItem) {
          let mergeQuantity =
            dataServiceItem.quantityToBuy + backendItem.quantityToBuy;

          if (this.currentState == 'loggedIn') {
            console.log('ayyaaaa: ');

            dataServiceItem = this.BackendCartList.find((e: any) => {
              return e.product_id._id === dataServiceItem.product_id._id;
            });

            this.bookService
              .putAddToCartQuantity(dataServiceItem._id, {
                quantityToBuy: mergeQuantity,
              })
              .subscribe({
                next: (res: any) => {
                  console.log('Quantity updated: ', res);
                },
                error: (err) => console.log(err),
              });

            this.dataService.updateQuantityToCartList(
              mergeQuantity,
              dataServiceItem
            );

            this.BackendCartList = this.BackendCartList.map((item: any) => {
              const matchingItem = this.DataServiceCartList.find(
                (dataItem) => dataItem.product_id._id === item.product_id._id
              );
              if (matchingItem) {
                item.quantityToBuy = mergeQuantity;
              }
              return item;
            });
          }
        } else {
          this.bookService
            .postCartItem(dataServiceItem.product_id._id)
            .subscribe({
              next: (res) => console.log('added to backend', res),
            });
        }
      }

      const updateList: any = this.BackendCartList.filter((item: any) => {
        return !this.DataServiceCartList.some(
          (dataItem) => dataItem.product_id._id === item.product_id._id
        );
      });

      this.dataService.addToCartList(updateList);
    }
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

    // console.log(register);

    this.userService.registerApiCall(register).subscribe({
      next: (res: any) => {
        console.log('response', res);
      },
      error: (err: any) => {
        console.log('response', err);
      },
    });
  }
}
