import { Booking } from "../domain/Aggregates/Booking";
import { IBookingInputPort } from "./Interfaces/booking/IBookingInputPort";
import { IBookingOutputPort } from "./Interfaces/booking/IBookingOutputPort";
import { IBookingRepository } from "./Interfaces/booking/IBookingRepository";

export class CheckVehiculeAvailability implements IBookingInputPort {
  private _bookingsRepository: IBookingRepository;
  private _presenter: IBookingOutputPort;
  constructor(
    bookingsRepository: IBookingRepository,
    presenter: IBookingOutputPort
  ) {
    this._bookingsRepository = bookingsRepository;
    this._presenter = presenter;
  }
  handle = async (booking: Booking) => {
    const bookings = await this._bookingsRepository.getAll();
    const vehiculeBookings = bookings.filter((b) =>
      b.vehicule.isEqual(booking.vehicule)
    );
    const alreadyBooked = vehiculeBookings.filter(
      (b) =>
        (booking.beginDate.getTime() >= b.beginDate.getTime() &&
          booking.beginDate.getTime() <= b.endDate.getTime()) ||
        (booking.endDate.getTime() >= b.beginDate.getTime() &&
          booking.endDate.getTime() <= b.endDate.getTime())
    );
    // TODO : return already booked dates
    if (alreadyBooked.length > 0)
      throw new Error("This vehicule hans already been booked at these dates.");
    this._presenter.present(booking);
  };
}
