import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  type: 'create' | 'cancel';
}
@Component({
  selector: 'app-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  type: 'create' | 'cancel' = 'create';
  dialogTitle: string = '';
  value: string = '';
  closeValue = 'NotClicked';
  max: number = 7;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  // open dialog with default values
  ngOnInit(): void {
    this.type = this.data.type;
    this.value = '';
    this.dialogTitle =
      this.type == 'create' ? 'Create Booking' : 'Cancel Booking';
    this.max = this.type == 'create' ? 7 : 10000;
  }

  // close dialog and return value
  closeDialog(action: string) {
    if (action == 'create') {
      this.dialogRef.close({ requestedSeats: this.value });
    } else {
      this.dialogRef.close({
        bookingId: this.value,
      });
    }
  }
}
