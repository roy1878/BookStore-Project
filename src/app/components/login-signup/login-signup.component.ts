import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
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
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

 BackendCartList:any[]=[];
 DataServiceCartList:any[]=[];
  loginForm!:FormGroup;
  registerForm!:FormGroup;
  

  constructor(private formBuilder: FormBuilder,private userService:UserService,
    private bookService :BookService,private router:Router, 
    private httpService:HttpService, public dialog:MatDialog,private dataService:DataService) { }
     
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
    // *****

    this.httpService.GetApiCall('bookstore_user/get_cart_items').subscribe({
      next: (res: any) => {
        console.log('BackendCartList: ', res.result);
        this.BackendCartList = res.result;
      },
      error: (err) => console.log(err),
    });

    this.dataService.currentCartList.subscribe({
      next: (res) => {
        console.log('DataServiceCartList: ', res);
        this.DataServiceCartList = res;
      },
    });

    if (this.DataServiceCartList.length == 0) {
      this.dataService.updateCartList(this.BackendCartList);
    } else if (this.BackendCartList.length == 0) {
      for (let dataServiceItem of this.DataServiceCartList) {
        this.bookService
          .postCartItem(dataServiceItem._id, dataServiceItem)
          .subscribe(() => {
            next: (res: any) => {};
          });
      }
    } else {
      for (let dataServiceItem of this.DataServiceCartList) {
        let backendItem = this.BackendCartList.find(
          (item) => item._id === dataServiceItem._id
        );

        if (backendItem) {
          this.bookService
            .putAddToCartQuantity(dataServiceItem._id, {
              "quantityToBuy": dataServiceItem.quantityToBuy
            })
            .subscribe(() => {
              next: (res: any) => {};
            });
        } else {
          this.bookService
            .postCartItem(dataServiceItem._id, dataServiceItem)
            .subscribe(() => {
              next: (res: any) => {};
            });
        }
      }
    }








//  ***

        // window.location.reload();
        this.dialog.closeAll();
      },
      error:(err)=>{
        console.log("error:",err);
      }
    });
  }








  userRegister(){
    if(this.registerForm.invalid){
      // console.log(this.registerForm.invalid);
      return;
    }
 
    const{fullName,email,password,phone}=this.registerForm.value
 
    let register ={
      "fullName": fullName,
      "email": email,
      "password": password,
      "phone": phone
    }
 
    // console.log(register);
   
    this.userService.registerApiCall(register).subscribe({
      next:(res:any)=>{
        console.log("response",res);
       },
       error:(err:any)=>{
         console.log("response",err);
       }
    });
  }



  


 




    

    


  
  


  

}




