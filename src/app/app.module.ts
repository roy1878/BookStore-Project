import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

import {MatExpansionModule} from '@angular/material/expansion';

import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
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
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatCardModule,
   
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
