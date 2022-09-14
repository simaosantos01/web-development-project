import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SalesByStateDataSource} from "../sales/components/sales/sources/sales-by-state.source";
import {SalesService} from "../sales/services/sales.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dataSource: SalesByStateDataSource;
  displayedColumns: string[] = ['metric', 'value'];


  public account: string;
  public readerCardNo: number;
  genders: string [] = ['Male', 'Female', 'Non Binary'];

  public customer = undefined

  public name = ' '
  public cell_phone = ' '
  public birth_date: Date
  public nif = ' '
  public country = ' '
  public gender = ' '
  public profession = ' '
  public postal_code: ' '
  public residence_address = ' '
  public billing_address = ' '

  customerForm = new FormGroup({
    name: new FormControl(''),
    cell_phone: new FormControl(''),
    country: new FormControl(''),
    gender: new FormControl(''),
    nif: new FormControl(''),
    profession: new FormControl(''),
    birth_date: new FormControl(''),
    postal_code: new FormControl(''),
    residence_address: new FormControl(''),
    billing_address: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private salesService: SalesService
  ) {
  }

  ngOnInit(): void {
    this.account = this.authService.getProfile().email!;
    this.readerCardNo = this.authService.getProfile().reader_card_num!;

    this.refresh()
  }

  refresh() {
    this.dataSource = new SalesByStateDataSource(this.salesService)
    this.dataSource.loadPurchasesStats(this.readerCardNo)


    this.salesService.getCustomer(this.readerCardNo).subscribe((result: any) => {
      let customer = result.valueOf()

      this.name = customer.customer.name != undefined ? customer.customer.name : ''
      this.cell_phone = customer.customer.cell_phone != undefined ? customer.customer.cell_phone : ''
      this.nif = customer.customer.nif != undefined ? customer.customer.nif : ''
      this.country = customer.customer.country != undefined ? customer.customer.country : ''
      this.gender = customer.customer.gender != undefined ? customer.customer.gender : ''
      this.profession = customer.customer.profession != undefined ? customer.customer.profession : ''
      this.birth_date = customer.customer.birth_date != undefined ? customer.customer.birth_date : ''
      console.log(this.birth_date)
      this.postal_code = customer.customer.postal_code != undefined ? customer.customer.postal_code : ''
      this.billing_address = customer.customer.billing_address != undefined ? customer.customer.billing_address : ''
      this.residence_address = customer.customer.residence_address != undefined ? customer.customer.residence_address : ''
    })

    const message = document.getElementById('formMessage')!
    message.hidden = true
    const cust = document.getElementById('cust')!
    cust.innerText = "Customer Nº" + this.readerCardNo
  }

  getTypeAccount(): string {
    return this.authService.getProfile().role!
  }

  onSubmitButtonForm(): void {
    const message = document.getElementById('formMessage')!
    message.hidden = false
    let oldForm = this.customerForm.getRawValue();
    let newForm = {
      reader_card_num: this.readerCardNo,
      nif: oldForm.nif != "" ? oldForm.nif : oldForm.nif == "" ? undefined : this.nif,
      profession: oldForm.profession != "" ? oldForm.profession : this.profession,
      gender: oldForm.gender != "" ? oldForm.gender : oldForm.gender == "" ? undefined : this.gender,
      name: oldForm.name != "" ? oldForm.name : this.name,
      country: oldForm.country != "" ? oldForm.country : this.country,
      cell_phone: oldForm.cell_phone != "" ? oldForm.cell_phone : oldForm.cell_phone == "" ? undefined : this.cell_phone,
      birth_date: oldForm.birth_date != "" ? oldForm.birth_date : this.birth_date,
      postal_code: oldForm.postal_code != "" ? oldForm.postal_code : oldForm.postal_code == "" ? undefined : this.postal_code,
      residence_address: oldForm.residence_address != "" ? oldForm.residence_address : this.residence_address,
      billing_address: oldForm.billing_address != "" ? oldForm.billing_address : this.billing_address,
    }

    this.salesService.changeCustomer(this.readerCardNo, newForm).subscribe({
      next(customer) {
        message.innerText = customer.message
      }, error(e) {
        message.innerText = e.error.error
      }
    })
  }
}
