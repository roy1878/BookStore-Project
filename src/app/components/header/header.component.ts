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
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { AddBookComponent } from '../add-book/add-book.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = false;
  searchQuery: string = '';
  @Output() toggleDrawer = new EventEmitter();
  access_token: any = localStorage.getItem('access_token');
  currentRoute!: string;
  name: string = '';
  currentState: string = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
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
    this.dataService.currentLoginState.subscribe({
      next: (res) => {
        this.currentState = res;
        if(!res){
          this.currentState = 'loggedOut';
        }
        console.log("current state: ",this.currentState);
        
      },
    });
    this.name = localStorage.getItem('name') || 'XYZ';
    this.activatedRoute.url.subscribe((urlSegment) => {
      this.currentRoute = urlSegment.join('/');
    });

    console.log('access_token: ', this.access_token);

    if (this.access_token) {
      this.isLoggedin = true;
    }

    this.httpService.GetApiCall('bookstore_user/get_wishlist_items').subscribe({
      next: (res: any) => {
        // console.log('WishListBooks: ', res.result);
        this.dataService.updateWishList(res.result);
      },
      error: (err) => console.log(err),
    });

    this.httpService.GetApiCall('bookstore_user/get_cart_items').subscribe({
      next: (res: any) => {
        // console.log('CartListBooks: ', res);
        this.dataService.updateCartList(res.result);
      },
      error: (err) => console.log(err),
    });
  }

  handleHeaderMenuClick(action: string) {
    if (action == 'logo') {
      this.router.navigate(['dashboard/books']);
    }
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
      if (!localStorage.getItem('access_token'))
        this.dataService.updateLoginState('loggedOut');
      this.isLoggedin = false;
    }
    if (action == 'login') {
      this.openDialog();
    }
    if (action == 'cartlist') {
      this.router.navigate(['dashboard/cart']);
    }
    if (action == 'admin-login') {
      this.router.navigate(['admin'])
    }
    if (action == 'add-book') this.openDialog();
  }

  openDialog(): void {
    if (this.currentRoute != 'admin') {
      this.dialog.open(LoginSignupComponent, {
        width: '60%',
        height: '500px',
      });
    } else {
      this.dialog.open(AddBookComponent, {
        width: '60%',
        height: '500px',
      });
    }
  }
  handleSearch() {
    this.dataService.updateData(this.searchQuery);
  }
}
