import { Component, OnInit } from '@angular/core';
import { BULLET_ICON, CART_ICON, FAV_ICON, GOLD_STAR_ICON, PROFILE_ICON, SEARCH_ICON, STAR_ICON } from 'src/assets/icons/svg-icon';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,) {
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
     }

  ngOnInit(): void {
    
  }

}
