import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!:FormGroup;
  PDisDisabled:boolean=true;
  CDisDisabled:boolean=true;

  constructor(private formBuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      mobileNumber: [{ value: '', disabled: true }]
    });
  }
  
get loginControl(){
  return this.profileForm.controls ;
}
  
  PDenableEditing(): void {
    this.PDisDisabled=false;
    
  }

  CDenableEditing(): void {
    this.CDisDisabled=false;
    
  }

}
