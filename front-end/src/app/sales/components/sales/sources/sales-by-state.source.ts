import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {SalesService} from "../../../services/sales.service";
import {SalesMetrics} from "../interfaces/sales-metrics.interface";

export class SalesByStateDataSource implements DataSource<SalesMetrics> {

  private _salesSubject = new BehaviorSubject<SalesMetrics[]>([])

  constructor(private salesService: SalesService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<SalesMetrics[]> {
    return this._salesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._salesSubject.complete();
  }

  loadSalesStates(readerCardNum: number) {
    this.salesService.getSalesMetrics(readerCardNum)
      .subscribe(state => this._salesSubject.next(state))
  }

  loadPurchasesStats(readerCardNum: number) {
    this.salesService.getStatus(readerCardNum)
      .subscribe(state => this._salesSubject.next(state))
  }
}
