import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketBookingService {
  constructor(private http: HttpClient) {}

  // service to get all the seats
  getSeats() {
    return this.http.get(
      'https://01pwzplo0m.execute-api.ap-south-1.amazonaws.com/ticket-book/get-seats'
    );
  }

  // service to book seats
  bookTicket(data: { requestedSeats: number }) {
    return this.http.post(
      'https://01pwzplo0m.execute-api.ap-south-1.amazonaws.com/ticket-book/book',
      data
    );
  }

  // service to cancel a booking
  cancelBooking(data: { bookingId: number }) {
    return this.http.post(
      'https://01pwzplo0m.execute-api.ap-south-1.amazonaws.com/ticket-book/cancel',
      data
    );
  }
}
