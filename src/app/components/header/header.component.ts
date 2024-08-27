import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  BULLET_ICON,
  CART_ICON,
  FAV_ICON,
  GOLD_STAR_ICON,
  HEART_ICON,
  PROFILE_ICON,
  SEARCH_ICON,
  SHOPPING_BAG_ICON,
  STAR_ICON,
} from 'src/assets/icons/svg-icon';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = true;
  searchQuery: string = '';
  @Output() toggleDrawer = new EventEmitter();

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dataService: DataService,
    private router:Router
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
  }

  ngOnInit(): void {}

  handleHeaderMenuClick(action: string) {
    if(action === 'profile'){
      this.router.navigate(['profile'])
    }
  }
  handleSearch() {
    this.dataService.updateData(this.searchQuery);
  }
}
