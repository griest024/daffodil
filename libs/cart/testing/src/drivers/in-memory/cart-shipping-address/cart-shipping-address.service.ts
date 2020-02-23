import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  DaffCart,
  DaffCartShippingAddressServiceInterface,
  DaffCartAddress
} from '@daffodil/cart';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryCartShippingAddressService implements DaffCartShippingAddressServiceInterface<DaffCartAddress, DaffCart> {
  url = '/api/cart';

  constructor(private http: HttpClient) {}

  get(cartId: DaffCart['id']): Observable<DaffCartAddress> {
    return this.http.get<DaffCartAddress>(`${this.url}/${cartId}/shippingAddress`);
  }

  update(cartId: DaffCart['id'], address: DaffCartAddress): Observable<Partial<DaffCart>> {
    return this.http.put<Partial<DaffCart>>(`${this.url}/${cartId}/shippingAddress`, address);
  }
}
