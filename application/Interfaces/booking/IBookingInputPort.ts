import { Booking } from "../../../domain/Aggregates/Booking";

export interface IBookingInputPort {
  handle: (booking: Booking) => Promise<void>;
}
