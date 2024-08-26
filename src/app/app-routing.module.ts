import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';

const routes: Routes = [
  {
    path:'login-signup',
    component:LoginSignupComponent
  },
  {
    path:'bookcard',
    component:BookCardComponent
  },
  {
    path:'bookDetails',
    component:BookDetailsComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'cart',
    component:BookCartComponent
  },
  {
    path:'admin',
    component:AdminContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
