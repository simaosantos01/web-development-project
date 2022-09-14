import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient) {}

  checkout(
    stripeToken: any,
    books: any,
    total: number,
    subtotal: number,
    shipping: number,
    shippingMethod: string,
    readerCardNum?: number
  ): Observable<any> {
    return this.http.post<any>(
      endpoint + 'purchases',
      {
        books: books,
        token: stripeToken,
        total: total,
        subtotal: subtotal,
        shipping: shipping,
        shipping_method: shippingMethod,
        reader_card_num: readerCardNum
      },
      { headers: httpOptions.headers }
    );
  }
}
