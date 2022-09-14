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
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(endpoint + 'books', {
      headers: httpOptions.headers,
    });
  }

  getBook(isbn: string): Observable<any> {
    return this.http.get<any>(endpoint + 'book/' + isbn, {
      headers: httpOptions.headers,
    });
  }

  reviewBook(isbn:string, reader_card_num?:number, rate?:number): Observable<any> {
    return this.http.post<any>(
      endpoint + 'book/review',
      {
        isbn: isbn,
        reader_card_num: reader_card_num,
        rate: rate,
      },
      { headers: httpOptions.headers }
    );
  }
}

