import {
  Inject,
  Injectable,
} from '@angular/core';
import { Observable } from 'rxjs';

import { DaffioApiServiceInterface } from './api-service.interface';
import {
  DaffioAssetFetchService,
  DaffioAssetFetchServiceInterface,
} from '../../core/assets/fetch/service.interface';
import { DaffioApiReference } from '../models/api-reference';

@Injectable({ providedIn: 'root' })
export class DaffioApiService implements DaffioApiServiceInterface {

  constructor(
    @Inject(DaffioAssetFetchService) private fetchAsset: DaffioAssetFetchServiceInterface,
  ) {}

  list(): Observable<DaffioApiReference[]> {
    return this.fetchAsset.fetch<DaffioApiReference[]>('/assets/daffio/docs/api/api-list.json');
  }
}
