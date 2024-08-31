import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  AdminForm!: FormGroup<any>;
 
  
  constructor(private dialog: MatDialog, private router: Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    //  if(this.AdminForm.invalid) return;

     const{bookName, author, description, quantity, price, discountPrice}=this.AdminForm.value
 
     let addBook ={
      "bookName": bookName,
  "author": author,
  "description": description,
  "quantity": quantity,
  "price": price,
  "discountPrice": discountPrice
    }

    console.log(addBook);

    this.userService.addBookAPICall(addBook).subscribe({
      next:(res:any)=>{
        console.log("response",res);

        localStorage.setItem("admin_token",res.result.accessToken);
        
          this.router.navigate(['./dashboard/book'])
          // window.location.reload();
          // this.dialog.closeAll();
       },
       error:(err:any)=>{
         console.log("response",err);
       }
    });

  }

}
