import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '@daffodil/cart';

@Component({
  selector: 'demo-minicart-item',
  host: {'class': 'minicart-item'},
  templateUrl: './minicart-item.component.html',
  styleUrls: ['./minicart-item.component.scss'],
})
export class MiniCartItemComponent {

  @Input() item: CartItem;

  constructor(
    private router: Router
  ) { }

  redirectToProduct() {
    this.router.navigateByUrl('/product/' + this.item.product_id);
  }
}
