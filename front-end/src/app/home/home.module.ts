import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BooksTableComponent } from './components/home/books-table/books-table.component';
import { SliderCarouselComponent } from './components/home/slider-carousel/slider-carousel.component';

//Carousel
import { CarouselModule } from 'ngx-owl-carousel-o';

//Pagination
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

//Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookPopupComponent } from './components/home/book-popup/book-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    HomeComponent,
    BooksTableComponent,
    SliderCarouselComponent,
    BookPopupComponent,
  ],
  imports: [
    ...materialModules,

    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    NgxPaginationModule,
    NgbRatingModule
  ],
  providers: [],
})
export class HomeModule {}
