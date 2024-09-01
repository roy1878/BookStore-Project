import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  AdminForm!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.AdminForm = this.formBuilder.group({
      bookName: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discountPrice: ['', [Validators.required]]
    });
  }

  get addBookControl() {
    return this.AdminForm.controls;
  }

  onSubmit() {
    if (this.AdminForm.invalid) return;
    const { bookName, author, description, quantity, price, discountPrice } = this.AdminForm.value;
    const addBook = {
      bookName,
      author,
      description,
      quantity,
      price,
      discountPrice
    };
    console.log("Add book is", addBook);
    this.userService.addBookAPICall(addBook).subscribe({
      next: (res: any) => {
        console.log("Response", res);
        localStorage.setItem("admin_token", res.result.accessToken);
      },
      error: (err) => {
        console.log("Error", err);
      }
    });
    this.router.navigate(['/admin']);
  }
}
