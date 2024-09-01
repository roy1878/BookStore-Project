import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
loginForm!: FormGroup<any>;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ResetPassword(){
    this.router.navigate(["./dashboard/books"])
  }
  handleCreate(){
    this.router.navigate(["./login-signup"])
  }
}
