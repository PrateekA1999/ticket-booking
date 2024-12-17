import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TicketBookingService } from '../service/ticket-booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Seats {
  seat_id: number;
  is_reserved: number;
}

@Component({
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  loading = false;

  constructor(
    private dialog: MatDialog,
    private ticketBookingService: TicketBookingService
  ) {}

  seats: Seats[] = [];

  tiles1: number[] = [];

  ngOnInit() {
    this.getBookings();
  }

  // get all the seats
  getBookings() {
    this.ticketBookingService.getSeats().subscribe((data: any) => {
      console.log(data);
      this.seats = data.seats;
      this.tiles1 = [1, 2];
    });
  }

  // open dialog for reservation or cancellation
  openDialog(type: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'NotClicked') {
        this.loading = true;
        if (type == 'create') {
          this.ticketBookingService.bookTicket(result).subscribe(
            (data: any) => {
              console.log(data);
              this.getBookings();
              this.loading = false;
              this._snackBar.open(data.message, 'Close', { duration: 2000 });
            },
            (error: any) => {
              console.log(error);
              this.loading = false;
              this._snackBar.open(error.error.message, 'Close', {
                duration: 2000,
              });
            }
          );
        } else {
          this.ticketBookingService.cancelBooking(result).subscribe(
            (data: any) => {
              console.log(data);
              this.getBookings();
              this.loading = false;
              this._snackBar.open(data.message, 'Close', { duration: 2000 });
            },
            (error: any) => {
              console.log(error);
              this.loading = false;
              this._snackBar.open(error.error.message, 'Close', {
                duration: 2000,
              });
            }
          );
        }
      }
    });
  }
}
