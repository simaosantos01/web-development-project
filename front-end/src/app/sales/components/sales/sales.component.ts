import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SalesService} from "../../services/sales.service";
import {SalesByStateDataSource} from "./sources/sales-by-state.source";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {

  //ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['metric', 'value'];

  public account: string;
  public readerCardNo: number;

  isLinear = false;
  firstFormGroup: FormGroup;

  dataSource: SalesByStateDataSource;

  constructor(private _formBuilder: FormBuilder, private salesService: SalesService, private authService: AuthService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.account = this.authService.getProfile().email!;
    this.readerCardNo = this.authService.getProfile().reader_card_num!;
    this.refresh()
  }

  salesForm = new FormGroup({
    isbn: new FormControl(''),
    condition: new FormControl(''),
  });

  refresh() {
    this.dataSource = new SalesByStateDataSource(this.salesService)
    this.dataSource.loadSalesStates(this.readerCardNo)
  }

  getTypeAccount(): string {
    return this.authService.getProfile().role!
  }

  onSubmitButtonForm(): void {
    const message = document.getElementById('formMessage')!

    let form = this.salesForm.getRawValue();
    form['reader_card_num'] = this.readerCardNo;

    this.salesService.createSale(form).subscribe({
      next(sale) {
        message.innerText = sale.message
      }, error(e) {
        message.innerText = e.error.error
      }
    })
  }

}
