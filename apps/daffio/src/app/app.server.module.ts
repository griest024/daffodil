import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { DaffioAppComponent } from './app.component';
import { AppModule } from './app.module';
import { DaffioAssetFetchServerService } from './core/assets/fetch/server.service';
import { DaffioAssetFetchService } from './core/assets/fetch/service.interface';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [DaffioAppComponent],
  providers: [
    {
      provide: DaffioAssetFetchService,
      useExisting: DaffioAssetFetchServerService,
    },
  ],
})
export class AppServerModule {}
