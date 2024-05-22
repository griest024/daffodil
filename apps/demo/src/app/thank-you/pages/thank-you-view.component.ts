import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DaffCheckoutOrderContainer } from '@daffodil/checkout/pwa';
import { DaffAccordionModule } from '@daffodil/design/accordion';
import { DaffContainerModule } from '@daffodil/design/container';
import { DaffLoadingIconModule } from '@daffodil/design/loading-icon';

import { CartSummaryWrapperModule } from '../../cart/components/cart-summary-wrapper/cart-summary-wrapper.module';
import { ThankYouComponentModule } from '../components/thank-you/thank-you.module';

@Component({
  templateUrl: './thank-you-view.component.html',
  styleUrls: ['./thank-you-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ThankYouComponentModule,
    DaffContainerModule,
    CartSummaryWrapperModule,
    DaffAccordionModule,
    DaffLoadingIconModule,
    DaffCheckoutOrderContainer,
  ],
})
export class ThankYouViewComponent {}
