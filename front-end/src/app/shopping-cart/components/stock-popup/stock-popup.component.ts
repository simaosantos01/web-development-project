import { Component, OnInit, Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-stock-popup',
  templateUrl: './stock-popup.component.html',
  styleUrls: ['./stock-popup.component.css'],
})
export class StockPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StockPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public message: DialogData
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
