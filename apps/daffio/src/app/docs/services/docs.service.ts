import {
  Inject,
  Injectable,
} from '@angular/core';
import { Observable } from 'rxjs';

import { crossOsFilename } from '@daffodil/docs-utils';

import { DaffioDocsServiceInterface } from './docs-service.interface';
import {
  DaffioAssetFetchService,
  DaffioAssetFetchServiceInterface,
} from '../../core/assets/fetch/service.interface';
import { DaffioDoc } from '../models/doc';
import { DaffioPackagesList } from '../models/packages-list';

@Injectable({
  providedIn: 'root',
})
export class DaffioDocsService<T extends DaffioDoc = DaffioDoc, V extends DaffioPackagesList = DaffioPackagesList> implements DaffioDocsServiceInterface<T, V> {

  constructor(
    @Inject(DaffioAssetFetchService) private fetchAsset: DaffioAssetFetchServiceInterface,
  ) {}

  get(path: string): Observable<T> {
    return this.fetchAsset.fetch<T>(`/assets/daffio/docs/${crossOsFilename(path)}.json`);
  }

  getGuideList(): Observable<V> {
    return this.fetchAsset.fetch<V>('/assets/daffio/docs/packages/guide-list.json');
  }
}
