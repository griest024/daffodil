import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCheck,
  faSpinner,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

import { DaffCartItem } from '@daffodil/cart';
import {
  DaffOperationEntity,
  DaffState,
} from '@daffodil/core/state';
import { DaffButtonSetModule } from '@daffodil/design';
import { DaffButtonModule } from '@daffodil/design/button';
import { DaffLoadingIconModule } from '@daffodil/design/loading-icon';
import { DaffNotificationModule } from '@daffodil/design/notification';
import { DaffProduct } from '@daffodil/product';

import { ProceedToCheckoutModule } from '../proceed-to-checkout/proceed-to-checkout.module';
import { ProductAddedComponent } from '../product-added/product-added.component';
import { ViewCartModule } from '../view-cart/view-cart.module';

@Component({
  selector: 'demo-add-to-cart-notification',
  templateUrl: './add-to-cart-notification.component.html',
  styleUrls: ['./add-to-cart-notification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ViewCartModule,
    ProceedToCheckoutModule,
    ProductAddedComponent,
    DaffLoadingIconModule,
    DaffButtonSetModule,
    DaffButtonModule,
    FontAwesomeModule,
    DaffNotificationModule,
  ],
})
export class DemoAddToCartNotificationComponent {
  @Input() count: number;
  @Input() product: DaffProduct;
  @Input() qty: DaffOperationEntity<DaffCartItem>['qty'];
  @Input() state: DaffOperationEntity<DaffCartItem>['daffState'];

  @Output() hide = new EventEmitter<void>();

  get icon(): IconDefinition {
    switch (this.state) {
      case DaffState.Added:
      case DaffState.Mutated:
        return faCheck;

      case DaffState.Error:
        return faWarning;

      case DaffState.Adding:
      case DaffState.Mutating:
      default:
        return faSpinner;
    }
  }

  get text(): string {
    switch (this.state) {
      case DaffState.Added:
        return 'Added to Cart';

      case DaffState.Mutated:
        return 'Updated Item Quantity';

      case DaffState.Error:
        return 'Failed to Add';

      case DaffState.Adding:
      case DaffState.Mutating:
      default:
        return 'Adding to Cart...';
    }
  }
}
