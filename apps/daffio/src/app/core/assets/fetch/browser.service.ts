import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  TransferState,
  makeStateKey,
} from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import { DaffioAssetFetchServiceInterface } from './service.interface';

@Injectable({ providedIn: 'root' })
export class DaffioAssetFetchBrowserService implements DaffioAssetFetchServiceInterface {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
  ) {}

  fetch<T = unknown>(path: string): Observable<T> {
    const cache = this.transferState.get<T>(makeStateKey(path), null);
    return cache ? of(cache) : this.http.get<T>(path);
  }
}
