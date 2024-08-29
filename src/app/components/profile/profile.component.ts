import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  PDisDisabled:boolean=true;
  CDisDisabled:boolean=false;
  customerAddress:string="Plot no.13, Bhallar township, nagpur";
  customerCity:string="Nagpur";
  customerState:string="Maharashtra";
  customerAddType:any="Office";
  customerDetails:any;

  customerAddreessList:any[]=[];

  editCard:boolean=false;
  displaySpan:boolean=false;


  constructor(private userService:UserService,private dataService:DataService) { 
    
  }

  ngOnInit(): void { 
    this.dataService.currentCartList.subscribe({
      next:(res:any)=>{
        this.customerDetails=res[0].user_id.address;
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

  // editAddCard(action:any){
  //   if(action=="Office") this.editCard=true;
  // }

  // buttonClick(){
  //   this.displaySpan=true;
    
  // }
  showFirstDiv: boolean = true;

  toggleDivs() {
    this.showFirstDiv = !this.showFirstDiv;
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
