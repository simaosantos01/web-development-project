import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { AuthService } from 'src/app/auth/auth.service';

export interface DialogData {
  isbn: string;
  title: string;
  image: string;
  publisher: string;
  published_date: string;
  language: string;
  pages: string;
  authors: Array<string>;
  rate: number;
  num_of_reviews: number;
  description: string;
  can_review: boolean;
}

@Component({
  selector: 'app-book-popup',
  templateUrl: './book-popup.component.html',
  styleUrls: ['./book-popup.component.css'],
})
export class BookPopupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private booksService: BooksService,
    public router: Router,
    public config: NgbRatingConfig,
    public dialogRef: MatDialogRef<BookPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public book: DialogData
  ) {
    if (book.can_review == true) {
      config.readonly = false;
    } else {
      config.readonly = true;
    }
    
    config.max = 5;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  handleReview(rate: NgbRating) {
    this.booksService
      .reviewBook(
        this.book.isbn,
        this.auth.getProfile().reader_card_num,
        rate.rate
      )
      .subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
