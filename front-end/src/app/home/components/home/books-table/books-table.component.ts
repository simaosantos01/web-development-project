import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { SearchBarService } from 'src/app/shared/components/nav/searchbar.service';
import { MatDialog } from '@angular/material/dialog';
import { BookPopupComponent } from '../book-popup/book-popup.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css'],
})
export class BooksTableComponent implements OnInit {
  books: Array<any> = [];
  p: number = 1;
  searched: string = '';

  constructor(
    private auth: AuthService,
    private searchBarService: SearchBarService,
    private booksService: BooksService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBooksFromDB();

    this.searchBarService.currentMessage.subscribe((searched) => {
      this.searched = searched;
    });
  }

  calculateRate(reviews:Array<any>) {
    var average = 0
    var sum = 0
    
    if(reviews.length == 0) {
      return average
    }

    for(let i = 0; i < reviews.length; i++){
      sum += reviews[i].rate
    }
    return sum/reviews.length
  }

  getBooksFromDB() {
    this.booksService.getBooks().subscribe((result: any) => {
      var books: Array<any> = result.books;
      books.forEach((book) => {
        this.booksService.getBook(book.isbn).subscribe((result: any) => {
          result.book.rate = this.calculateRate(result.book.reviews)
          result.book.num_of_reviews = result.book.reviews.length
          this.books.push(result.book);
        });
      });
    });
  }

  onlySpaces(str: string) {
    return /^\s*$/.test(str);
  }

  injectBooks() {
    if (this.searched && !this.onlySpaces(this.searched)) {
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searched.toLowerCase())
      );
    }
    return this.books;
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    const button = event.target as HTMLButtonElement;
    var cart: any = localStorage.getItem('cart');

    if (cart == null) {
      cart = [];
      cart.push({ book: button.id, type: 'New', qnt: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }

    cart = <string[]>JSON.parse(cart);
    if (!this.isAlreadyAddedToCart(button.id, cart)) {
      cart.push({ book: button.id, type: 'New', qnt: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  isAlreadyAddedToCart(isbn: string, cart: Array<any>) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].book == isbn) {
        return true;
      }
    }
    return false;
  }

  imgIsValid(img: string) {
    return img != '';
  }

  findBook(isbn: string) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn == isbn) return this.books[i];
    }
    return null;
  }

  canReview(isbn:string):boolean {
    var book = this.findBook(isbn)

    for(let i = 0; i < book.reviews.length; i++){
      if(book.reviews[i].reader_card_num == this.auth.getProfile().customer_id) {
        return false
      }
    }
    return true
  }

  openBookPopUp(isbn: any) {
    isbn = isbn.replace('view-book-', '');
    const book = this.findBook(isbn);
    this.matDialog.open(BookPopupComponent, {
      width: '600px',
      maxHeight: '500px',
      data: {
        isbn: book.isbn,
        title: book.title,
        image: book.image,
        publisher: book.publisher,
        published_date: book.published_date,
        language: book.language,
        pages: book.pages,
        authors: book.authors,
        rate: book.rate,
        num_of_reviews: book.num_of_reviews,
        description: book.description,
        can_review: this.canReview(isbn),
      },
    });
  }
}
