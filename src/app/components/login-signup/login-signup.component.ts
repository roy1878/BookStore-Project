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
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
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
          // window.location.reload();
          this.dataService.updateLoginState('loggedIn');
          this.dialog.closeAll();
        },
        error: (err) => {
          console.log('error:', err);
        },
      });
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

  functionComparision() {}
}
