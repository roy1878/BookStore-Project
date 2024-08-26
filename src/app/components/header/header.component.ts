import { Component, OnInit } from '@angular/core';
import { CART_ICON, PROFILE_ICON, SEARCH_ICON } from 'src/assets/icons/svg-icon';
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
     }

  ngOnInit(): void {
    
  }

}
