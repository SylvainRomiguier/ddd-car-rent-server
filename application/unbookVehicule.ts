import { Booking } from "../domain/Aggregates/Booking";
import { IBookingInputPort } from "./Interfaces/booking/IBookingInputPort";
import { IBookingOutputPort } from "./Interfaces/booking/IBookingOutputPort";
import { IBookingRepository } from "./Interfaces/booking/IBookingRepository";

export class UnbookVehicule implements IBookingInputPort {
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
    await this._bookingsRepository.remove(booking);
    this._presenter.present(booking);
  };
}
