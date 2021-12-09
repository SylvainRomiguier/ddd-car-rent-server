import { IBookingRepository } from "../../application/Interfaces/booking/IBookingRepository";
import { ICustomerRepository } from "../../application/Interfaces/customer/ICustomerRepository";
import { IVehiculeRepository } from "../../application/Interfaces/vehicule/IVehiculeRepository";
import { Booking } from "../../domain/Aggregates/Booking";

export interface IBookingDTO {
  id: string;
  customerId: string;
  vehiculeId: string;
  beginDate: Date;
  endDate: Date;
}

export class BookingRepository implements IBookingRepository {
  private _bookings: IBookingDTO[];
  private _vehiculeRepository: IVehiculeRepository;
  private _customerRepository: ICustomerRepository;
  constructor(
    vehiculeRepository: IVehiculeRepository,
    customerRepository: ICustomerRepository
  ) {
    this._bookings = [];
    this._vehiculeRepository = vehiculeRepository;
    this._customerRepository = customerRepository;
  }
  private domainToDTO = (booking: Booking): IBookingDTO => ({
    id: booking.id.value,
    customerId: booking.customer.id,
    vehiculeId: booking.vehicule.registrationId.value,
    beginDate: booking.beginDate,
    endDate: booking.endDate,
  });
  private dtoToDomain = async (booking: IBookingDTO): Promise<Booking> => {
    const vehicule = await this._vehiculeRepository.getById(booking.vehiculeId);
    const customer = await this._customerRepository.getById(booking.customerId);
    return new Booking(
      booking.id,
      customer,
      vehicule,
      booking.beginDate,
      booking.endDate
    );
  };
  create = async (booking: Booking) => {
    const alreadyExistingBooking = this._bookings.find(
      (b) => b.id === booking.id.value
    );
    if (alreadyExistingBooking)
      throw new Error(
        `A booking already exist with this id ${booking.id.value}.`
      );
    this._bookings.push(this.domainToDTO(booking));
  };
  remove = async (booking: Booking) => {
    const alreadyExistingBooking = this._bookings.find(
      (b) => b.id === booking.id.value
    );
    if (!alreadyExistingBooking)
      throw new Error(
        `This booking does not exist with id ${booking.id.value}.`
      );
    this._bookings = this._bookings.filter((b) => b.id !== booking.id.value);
  };
  getAll = async () => {
    return Promise.all(this._bookings.map((b) => this.dtoToDomain(b)));
  };
  getBookingById = async (id: string) => {
    const alreadyExistingBooking = this._bookings.find((b) => b.id === id);
    if (!alreadyExistingBooking)
      throw new Error(`This booking does not exist with id ${id}.`);
    return this.dtoToDomain(alreadyExistingBooking);
  };
}
