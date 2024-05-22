import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { DaffCartShippingRate } from '@daffodil/cart';

@Component({
  selector: 'demo-shipping-summary',
  templateUrl: './shipping-summary.component.html',
  styleUrls: ['./shipping-summary.component.scss'],
})
export class ShippingSummaryComponent {
  @Input() selectedShippingOption: DaffCartShippingRate;
  @Output() editShippingInfo = new EventEmitter<void>();

  onEdit() {
    this.editShippingInfo.emit();
  }
}
