import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  DaffCart,
  DaffCartShippingInformationServiceInterface,
  DaffCartShippingRate
} from '@daffodil/cart';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryCartShippingInformationService implements DaffCartShippingInformationServiceInterface<DaffCartShippingRate, DaffCart> {
  url = '/api/cart';

  constructor(private http: HttpClient) {}

  get(cartId: DaffCart['id']): Observable<DaffCartShippingRate> {
    return this.http.get<DaffCartShippingRate>(`${this.url}/${cartId}/shippingInfo`);
  }

  update(cartId: DaffCart['id'], info: Partial<DaffCartShippingRate>): Observable<DaffCart> {
    return this.http.put<DaffCart>(`${this.url}/${cartId}/shippingInfo`, info);
  }

  delete(cartId: DaffCart['id']): Observable<Partial<DaffCart>> {
    return this.http.delete<Partial<DaffCart>>(`${this.url}/${cartId}/shippingInfo`);
  }
}
