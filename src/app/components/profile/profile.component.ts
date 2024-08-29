import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  PDisDisabled:boolean=true;
  CDisDisabled:boolean=true;
  customerAddress:string="Plot no.13, Bhallar township, nagpur";
  customerCity:string="Nagpur";
  customerState:string="Maharashtra";
  customerAddType:any="Office";
  customerDetails:any;


  constructor(private userService:UserService) { 
    
  }

  ngOnInit(): void { 
  }
  
  PDenableEditing(): void {
    this.PDisDisabled=false;
  }

  CDenableEditing(): void {
    this.CDisDisabled=false;
    
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
    this.CDisDisabled = true;
    this.userService.updateCustomerDetails(this.customerDetails).subscribe({
      next:(res:any)=>{
        console.log("Customer address update res ", res);
      }
    })
  }



}
