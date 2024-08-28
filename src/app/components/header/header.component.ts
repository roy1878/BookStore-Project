import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  BULLET_ICON,
  CART_ICON,
  FAV_ICON,
  GOLD_STAR_ICON,
  HEART_ICON,
  PROFILE_ICON,
  SEARCH_ICON,
  SHOPPING_BAG_ICON,
  STAR_FILL,
  STAR_ICON,
} from 'src/assets/icons/svg-icon';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = false;
  searchQuery: string = '';
  @Output() toggleDrawer = new EventEmitter();
  access_token = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(SEARCH_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'profile',
      sanitizer.bypassSecurityTrustHtml(PROFILE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'cart',
      sanitizer.bypassSecurityTrustHtml(CART_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'fav',
      sanitizer.bypassSecurityTrustHtml(FAV_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'star',
      sanitizer.bypassSecurityTrustHtml(STAR_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'bullet',
      sanitizer.bypassSecurityTrustHtml(BULLET_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'gold-star',
      sanitizer.bypassSecurityTrustHtml(GOLD_STAR_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'heart',
      sanitizer.bypassSecurityTrustHtml(HEART_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'shopping-bag',
      sanitizer.bypassSecurityTrustHtml(SHOPPING_BAG_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'star-fill',
      sanitizer.bypassSecurityTrustHtml(STAR_FILL)
    );
  }

  ngOnInit(): void {
    this.access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdhMDkzY2VhZTVjNDAwMGVkMGVkMDIiLCJpYXQiOjE3MjQ3NjI1OTAsImV4cCI6MTcyNDg0ODk5MH0.2aDnHhNdkpkt5woXZLYR5Pd_9yx4WRdOIb_M7x4vs0M`;

    if (this.access_token) this.isLoggedin = !this.isLoggedin;

    if (localStorage.getItem('access_token')) {
      this.isLoggedin = !this.isLoggedin;
    }
  }

  handleHeaderMenuClick(action: string) {
    if (action === 'profile') {
      this.router.navigate(['dashboard/profile']);
    }
    if (action == 'myWishList') {
      this.router.navigate(['dashboard/wishlist']);
    }
    if (action == 'myOrders') {
      this.router.navigate(['dashboard/orderlist']);
    }
    if (action == 'logout') {
      localStorage.clear();
    }
    if (action == 'login') {
      this.openDialog();
    }
  }

  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      width: '50%', height : '550px'
    });

  }
  handleSearch() {
    this.dataService.updateData(this.searchQuery);
  }
}
