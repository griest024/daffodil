import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DaffCart, DaffCartServiceInterface } from '@daffodil/cart';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryCartService implements DaffCartServiceInterface<DaffCart> {
  url = '/api/cart';

  constructor(private http: HttpClient) {}

  get(cartId: string): Observable<DaffCart> {
    return this.http.get<DaffCart>(`${this.url}/${cartId}`);
  }

  addToCart(productId: string, qty: number): Observable<DaffCart> {
    return this.http.post<DaffCart>(this.url + '/addToCart', { productId, qty });
  }

  clear(cartId: string): Observable<void> {
    return this.http.post<void>(this.url + '/clear', {cartId});
  }

  create(): Observable<Partial<DaffCart>> {
    return this.http.post<Partial<DaffCart>>(this.url + '/create', {});
  }
}
