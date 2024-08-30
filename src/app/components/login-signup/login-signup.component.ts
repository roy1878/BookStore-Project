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
import { DataService } from 'src/app/services/data/data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {

 BackendCartList:any[] = [];
 DataServiceCartList:any[]=[];
  loginForm!:FormGroup;
  registerForm!:FormGroup;
  


  constructor(private formBuilder: FormBuilder,private userService:UserService,
    private bookService :BookService,private router:Router, 
    private httpService:HttpService, public dialog:MatDialog,private dataService:DataService,
    private http:HttpClient
    
    
  ) { }
     
 

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

  this.registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required]
  });
}



  userLogin(){
    if(this.loginForm.invalid)
      return;
    const{email,password}=this.loginForm.value
    console.log(email,password);
   
    this.userService.loginAPICall({"email":email,"password":password}).subscribe({
      next:(res:any)=>{
        console.log("response",res);
        localStorage.setItem("access_token",res.result.accessToken);
        console.log("access_token",res.result.accessToken);
        // this.router.navigate(["./dashboard/books"]);
        // this.dialog.closeAll();
    // *****
          this.dataService.updateLoginState('loggedIn');
          this.dialog.closeAll();

           this.functionUpdateServices();

//  ***

        // window.location.reload();
        
      },
      error:(err)=>{
        console.log("error:",err);
      }
    });
    

  }

functionUpdateServices(){
  // this.httpService.GetApiCall('bookstore_user/get_cart_items').subscribe({
  //   next: (res: any) => {
  //     console.log('BackendCartList: ', res.result);
  //     this.BackendCartList = res.result;
  //   },
  //   error: (err) => console.log(err),
  // });
 let  header: any = {
    'x-access-token': localStorage.getItem(`access_token`) || '',
  };
 this.http.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items',{headers:header}).subscribe({
  next:(res:any)=>{
    // this.BackendCartList = res.result;
    this.BackendCartList.push(res);
    
    console.log("BackendCartListress",this.BackendCartList);

  }
 });
 

  this.dataService.currentCartList.subscribe({
    next: (res) => {
      this.DataServiceCartList.push(res);
      console.log('DataServiceCartList: ', this.DataServiceCartList);
      
    },
  });

  if (this.DataServiceCartList.length == 0) {
    this.dataService.updateCartList(this.BackendCartList);

  } 

  else if (this.BackendCartList.length == 0) {
    for (let dataServiceItem of this.DataServiceCartList) {
      this.bookService
        .postCartItem(dataServiceItem._id, dataServiceItem)
        .subscribe({
          next: (res: any) => {
            console.log('Item posted: ', res);
          },
          error: (err) => console.log(err),
        });
    }
    
  } 
  
  else {
    for (let dataServiceItem of this.DataServiceCartList) {
      let backendItem = this.BackendCartList.find(
        (item: any) => item.product_id._id === dataServiceItem._id
      );

      if (backendItem) {
        this.bookService
        .putAddToCartQuantity(dataServiceItem.product_id._id, {"quantityToBuy": dataServiceItem.quantityToBuy})
        .subscribe({
          next: (res: any) => {
            console.log('Quantity updated: ', res);
          },
          error: (err) => console.log(err),
        });
      
          
      } else {
        this.bookService
          .postCartItem(dataServiceItem.product_id._id, dataServiceItem)
          .subscribe(() => {
            next: (res: any) => {
              console.log("add to backend",res);
            };
          });
      }
    }


    const updateList: any = this.BackendCartList.filter((item: any) => {
      return !this.DataServiceCartList.some(dataItem => dataItem.id === item.product_id.id);
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




  

