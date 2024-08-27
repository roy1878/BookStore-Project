import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { SearchPipe } from './pipes/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    HeaderComponent,
    FooterComponent,
    BooksContainerComponent,
    BookCardComponent,
    BookDetailsComponent,
    BookCartComponent,
    OrderListComponent,
    WishListComponent,
    ProfileComponent,
    OrderPlacedComponent,
    ForgotPasswordComponent,
    AdminContainerComponent,
    AddBookComponent,
    SearchPipe,
    DashboardComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
