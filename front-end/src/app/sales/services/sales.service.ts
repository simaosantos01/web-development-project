import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SalesMetrics} from "../components/sales/interfaces/sales-metrics.interface";

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {
  }

  createSale(sale: any): Observable<any> {
    sale.condition = 'Used'
    return this.http.post<any>(endpoint + 'sales', sale)
  }

  getSales(reader_card_num: number): Observable<any> {
    return this.http.get<any>(endpoint + 'sales/' + reader_card_num, {
      headers: httpOptions.headers,
    });
  }

  getSalesMetrics(readerCardNum: number): Observable<SalesMetrics[]> {
    return this.http.get<SalesMetrics[]>(endpoint + 'salesMetrics/' + readerCardNum, {
      headers: httpOptions.headers,
    });
  }

  getStatus(readerCardNum: number): Observable<SalesMetrics[]> {
    return this.http.get<SalesMetrics[]>(endpoint + 'purchases/status/' + readerCardNum, {
      headers: httpOptions.headers,
    });
  }

  getCustomer(readerCardNum: number): Observable<any> {
    return this.http.get<any>(endpoint + 'customer/' + readerCardNum, {
      headers: httpOptions.headers,
    });
  }

  changeCustomer(readerCardNum: number, customer: any): Observable<any> {
    return this.http.patch<any>(endpoint + 'customer/' + readerCardNum, customer);
  }
}
