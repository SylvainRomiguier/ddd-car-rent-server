import { Booking } from "../../../domain/Aggregates/Booking";

export interface IBookingOutputPort {
  present: (booking: Booking) => void;
}
