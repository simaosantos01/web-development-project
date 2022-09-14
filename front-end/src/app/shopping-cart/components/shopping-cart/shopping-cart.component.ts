import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { PurchasesService } from 'src/app/shared/services/purchases.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StockPopupComponent } from '../stock-popup/stock-popup.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  books: Array<any> = [];
  cart: Array<any> = [];
  shipping: number = 2;
  shippingMethod: string = 'Default';
  paymentHandler: any = null;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private booksService: BooksService,
    private purchasesService: PurchasesService
  ) {}

  ngOnInit(): void {
    this.getCart();

    this.cart.forEach((book: any) => {
      this.booksService.getBook(book.book).subscribe((result: any) => {
        result.book.quantity = book.qnt;
        result.book.type = book.type;
        this.books.push(result.book);
      });
    });

    this.invokeStripe();
  }

  getCart() {
    var cart = localStorage.getItem('cart');
    if (cart != null) {
      this.cart = <any[]>JSON.parse(cart);
    }
  }

  setShipping(type: string) {
    if (type == 'Express') {
      this.shipping = 5;
    } else {
      this.shipping = 2;
    }
    this.shippingMethod = type;
    console.log(this.shippingMethod);
  }

  injectShipping() {
    return this.shipping;
  }

  injectBooks() {
    return this.books.filter((book) => {
      for (let i = 0; i < this.cart.length; i++) {
        if (book.isbn == this.cart[i].book) return book;
      }
    });
  }

  injectBookPrice(isbn: string) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn == isbn && this.books[i].type == 'New') {
        return this.books[i].price_new;
      } else if (this.books[i].isbn == isbn) {
        return this.books[i].price_used;
      }
    }
  }

  injectSubTotal() {
    var total: number = 0;
    this.books.forEach((book) => {
      if (book.type == 'New') {
        total += book.price_new * book.quantity;
      } else {
        total += book.price_used * book.quantity;
      }
    });
    return total;
  }

  injectTotal() {
    const subtotal = this.injectSubTotal();
    return Math.round((subtotal * 0.23 + subtotal + this.shipping) * 100) / 100;
  }

  updateCart() {
    localStorage.setItem(
      'cart',
      JSON.stringify(
        this.books.map((book) => {
          return {
            book: book.isbn,
            type: book.type,
            qnt: book.quantity,
          };
        })
      )
    );
  }

  removeFromCart(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const id = 'shopp-cart-remove-item-';

    for (var i = 0; i < this.books.length; i++) {
      if (id + this.books[i].isbn == button.id) {
        this.books.splice(i, 1);
      }
    }
    this.updateCart();
  }

  addQuantity(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const id = 'shopp-cart-add-quant-';

    for (var i = 0; i < this.books.length; i++) {
      if (id + this.books[i].isbn == button.id) {
        this.books[i].quantity += 1;
      }
    }
    this.updateCart();
  }

  removeQuantity(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const id = 'shopp-cart-remove-quant-';

    for (var i = 0; i < this.books.length; i++) {
      if (id + this.books[i].isbn == button.id && this.books[i].quantity != 1) {
        this.books[i].quantity -= 1;
      }
    }
    this.updateCart();
  }

  changeType(isbn: string) {
    const id = 'shopp-cart-change-type-';

    for (var i = 0; i < this.books.length; i++) {
      if (id + this.books[i].isbn == isbn && this.books[i].type == 'New') {
        this.books[i].type = 'Used';
      } else if (id + this.books[i].isbn == isbn) {
        this.books[i].type = 'New';
      }
    }
    this.updateCart();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L5RSpLqXAx2j2CJ5SqJKMbt82BmwoyuCVqAjNey7i7xaXAzOvqHXKwB3bn49nbZwvxoEDTZlMzC2q9bwPIJqaaR00qNG4eFfR',
          locale: 'auto',
        });
      };

      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: number, books: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L5RSpLqXAx2j2CJ5SqJKMbt82BmwoyuCVqAjNey7i7xaXAzOvqHXKwB3bn49nbZwvxoEDTZlMzC2q9bwPIJqaaR00qNG4eFfR',
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentStripe(stripeToken, books);
      },
    });

    const paymentStripe = (stripeToken: any, books: any) => {
      this.purchasesService
        .checkout(
          stripeToken,
          books,
          this.injectTotal(),
          this.injectSubTotal(),
          this.shipping,
          this.shippingMethod,
          this.auth.getProfile().reader_card_num
        )
        .subscribe((data: any) => {
          console.log(data);
        });
    };

    paymentHandler.open({
      name: 'Payment',
      description: '',
      amount: amount * 100,
    });
  }

  areStocksValid(): string {
    var result: string = 'The stock for the book ';

    for (let i = 0; i < this.books.length; i++) {
      if (
        (this.books[i].type == 'New' &&
          this.books[i].quantity > this.books[i].stock_new) ||
        (this.books[i].type == 'Used' &&
          this.books[i].quantity > this.books[i].stock_used)
      ) {
        result += this.books[i].title + ', ';
      }
    }

    if(result == 'The stock for the book ') {
      result = 'true';
    } else {
      result += ' is invalid.'
    }
    
    return result;
  }

  private openStockPopup(message:string) {
    this.matDialog.open(StockPopupComponent, {
      width: '600px',
      maxHeight: '500px',
      data: {
        message: message
      }
    })
  }

  checkout() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth']);
      return;
    }
    
    var areStocksValid = this.areStocksValid()
    console.log(areStocksValid)

    if (areStocksValid != 'true') {
      this.openStockPopup(areStocksValid)
      return;
    }
    this.makePayment(this.injectTotal(), localStorage.getItem('cart'));
  }
}
