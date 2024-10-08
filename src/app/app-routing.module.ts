// import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/books',
    pathMatch: 'full',
  },
  {
    path: 'login-signup',
    component: LoginSignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'bookcard',
    component: BookCardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'books',
        component: BooksContainerComponent,
      },
      {
        path: 'bookdetails',
        component: BookDetailsComponent,
      },
      {
        path: 'wishlist',
        component: WishListComponent,
      },
      {
        path: 'orderlist',
        component: OrderListComponent,
      },
      {
        path: 'cart',
        component: BookCartComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'order-placed',
        component: OrderPlacedComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminContainerComponent,
    children: [
      
      {
        path: '',
        component: BooksContainerComponent,
      },
      {
        path: 'add-book',
        component: AddBookComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
