export interface ValueOrEntityObject<T> {
  isEqual: (other: unknown) => boolean;
}

export interface AddressType {
  street: string;
  complement: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}
