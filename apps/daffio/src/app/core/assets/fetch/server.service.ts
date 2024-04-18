import {
  Inject,
  Injectable,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { readFile } from 'node:fs/promises';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Observable,
  from,
  map,
} from 'rxjs';

import { DaffioAssetFetchServiceInterface } from './service.interface';

const daffioDocsPath = import.meta.url.includes('vite-root')
  ? join(dirname(fileURLToPath(import.meta.url)), '../../../dist/docs/')
  : join(dirname(fileURLToPath(import.meta.url)), '../browser/assets/daffio/docs/');


@Injectable({ providedIn: 'root' })
export class DaffioAssetFetchServerService implements DaffioAssetFetchServiceInterface {
  constructor(
    private transferState: TransferState,
  ) {}

  fetch<T = unknown>(path: string): Observable<T> {
    return from(readFile(path.replace('/assets/daffio/docs/', daffioDocsPath))).pipe(
      map((buffer) => {
        const ret = JSON.parse(buffer.toString());
        this.transferState.set(makeStateKey(path), ret);
        return ret;
      }),
    );
  }
}
