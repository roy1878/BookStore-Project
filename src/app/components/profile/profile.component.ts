import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  customerAddress:string="";
  customerCity:string="";
  customerState:string="";
  customerAddType:any="Customer Address";
  customerDetails:any;
  showFirstDiv: boolean = true;
  customerAddreessList:any[]=[];

  editCard:boolean=false;
  displaySpan:boolean=false;
  showDiv:boolean=false;


  constructor(private userService:UserService,private dataService:DataService,private route:Router) { 
    
  }

  ngOnInit(): void { 
    this.dataService.currentCartList.subscribe({
      next:(res:any)=>{
        console.log(res);
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
        // this.showFirstDiv = !this.showFirstDiv;
        // addressData.showFirstDiv = !addressData.showFirstDiv;
        this.showDiv=true;
       

  }

  saveNewAddress(){
    let customerDetail={
      "addressType": this.customerAddType,
      "fullAddress": this.customerAddress,
      "city": this.customerCity,
      "state": this.customerState,
      "showFirstDiv": true
    }

    // this.customerAddreessList.push(customerDetail);
    this.customerDetails=[... this.customerDetails,customerDetail];
    console.log("cdd", this.customerDetails);
    this.showDiv=false;
            


  }

  navigateHome(){
    this.route.navigate(['/dashboard/books']);
    
  }



}
