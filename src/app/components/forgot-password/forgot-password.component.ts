import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
loginForm!: FormGroup<any>;

  constructor(private router:Router,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  ResetPassword(){
    this.router.navigate(["./dashboard/books"])
  }
  handleCreate(){
    this.openDialog();
  }
  openDialog() {
    this.dialog.open(LoginSignupComponent);
    this.router.navigate(["./dashboard/books"])

  }
}
