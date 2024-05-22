import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaffSidebarModule } from '@daffodil/design/sidebar';

import { TemplateComponent } from './template.component';
import { DemoAddToCartNotificationContainer } from '../../../cart/containers/add-to-cart-notification/add-to-cart-notification.component';
import { NewsletterModule } from '../../../newsletter/newsletter.module';
import { FooterModule } from '../../footer/footer.module';
import { HeaderModule } from '../../header/header.module';
import { SidebarModule } from '../../sidebar/sidebar.module';

@NgModule({
  imports: [
    RouterModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    DaffSidebarModule,
    NewsletterModule,
    DemoAddToCartNotificationContainer,
  ],
  declarations: [
    TemplateComponent,
  ],
  exports: [
    TemplateComponent,
  ],
})
export class TemplateModule { }
