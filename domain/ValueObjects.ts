import { AddressType, ValueOrEntityObject } from "./types";

export class UniqueId implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(id?: string) {
    if (!id) throw new Error("Id is mandatory.");
    this._value = id;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof UniqueId && other.value === this.value;
}

export class RegistrationId implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(registrationId?: string) {
    if (!registrationId) throw new Error("Registration id is mandatory.");
    this._value = registrationId;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof RegistrationId && other.value === this.value;
}

export class IPAddress implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(ipAddress?: string) {
    if (!ipAddress) throw new Error("IP Address is not valid.");
    let validIpAddress = false;
    // Test IPv4 addresses
    validIpAddress =
      validIpAddress ||
      !!ipAddress.match(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      );
    // Test IPv6 addresses
    validIpAddress =
      validIpAddress ||
      !!ipAddress.match(
        /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
      );
    if (!validIpAddress) throw new Error("IP Address is not valid.");

    this._value = ipAddress;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof IPAddress && other.value === this.value;
}

export class Siret implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(siret?: string) {
    if (!siret?.match(/^\d{14}$/))
      throw new Error("Siret should have 14 figures.");
    this._value = siret;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof Siret && other.value === this.value;
}

export class PictureURL implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(pictureURL?: string) {
    this._value = pictureURL || "../assets/no-photo.jpg";
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof PictureURL && other.value === this.value;
}

export class Mileage implements ValueOrEntityObject<number> {
  private _value: number;
  constructor(mileage?: number) {
    if (mileage && mileage < 0)
      throw new Error("Mileage can be less than zero.");
    this._value = mileage || 0;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof Mileage && other.value === this.value;
}

export class Name implements ValueOrEntityObject<string> {
  private _value: string;
  constructor(name?: string) {
    if (!name) throw new Error("Name is mandatory.");
    if (!name.match(/^([A-Za-z])(.*){3,}$/))
      throw new Error(
        "A name should have at least 3 characters, the first should be a letter."
      );
    this._value = name;
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof Name && other.value === this.value;
}

export class Address implements ValueOrEntityObject<AddressType> {
  private _value: AddressType;
  constructor(
    number?: string,
    street?: string,
    complement?: string,
    zipCode?: string,
    city?: string,
    country?: string
  ) {
    if (!number || !street || !zipCode || !city || !country)
      throw new Error(
        "Number, street name, zip code, city name, country name are mandatory."
      );
    this._value = {
      number,
      street,
      complement: complement || "",
      zipCode,
      city,
      country,
    };
  }
  get value() {
    return this._value;
  }
  isEqual = (other: unknown) =>
    other instanceof Address &&
    other.value.number === this.value.number &&
    other.value.street === this.value.street &&
    other.value.complement === this.value.complement &&
    other.value.zipCode === this.value.zipCode &&
    other.value.city === this.value.city &&
    other.value.country === this.value.country;
}
