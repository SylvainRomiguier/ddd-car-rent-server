import { IndividualCustomer } from "../domain/entities/IndividualCustomer";
import { Address } from "../domain/ValueObjects";

describe("Individual Customer domain tests", () => {
  it("should create a valid individual customer", () => {
    const address = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    const individualCustomer = new IndividualCustomer(
      "1234",
      address,
      "Sylvain",
      "Romiguier"
    );

    const _individualCustomer = {
      id: individualCustomer.value.id.value,
      address: {
        number: individualCustomer.value.address.value.number,
        street: individualCustomer.value.address.value.street,
        complement: individualCustomer.value.address.value.complement,
        zipCode: individualCustomer.value.address.value.zipCode,
        city: individualCustomer.value.address.value.city,
        country: individualCustomer.value.address.value.country,
      },
      firstName: individualCustomer.value.firstName.value,
      lastName: individualCustomer.value.lastName.value,
    };

    expect(_individualCustomer).toEqual({
      id: "1234",
      address: {
        number: "113",
        street: "impasse des oliviers",
        complement: "",
        zipCode: "30980",
        city: "Langlade",
        country: "France",
      },
      firstName: "Sylvain",
      lastName: "Romiguier",
    });
  });
  it("should thrown an error if address is not supplied", () => {
    const address = undefined;
    try {
      const individualCustomer = new IndividualCustomer(
        "1234",
        address,
        "Sylvain",
        "Romiguier"
      );
      expect(individualCustomer).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Address is mandatory.");
    }
  });
  it("should test equality", () => {
    const address = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    const individualCustomer = new IndividualCustomer(
      "1234",
      address,
      "Sylvain",
      "Romiguier"
    );
    const individualCustomer2 = new IndividualCustomer(
      "1234",
      address,
      "Sylvain",
      "Romiguier"
    );
    expect(individualCustomer.isEqual(individualCustomer2)).toBeTruthy();
  });
  it("should test inequality", () => {
    const address = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    const individualCustomer = new IndividualCustomer(
      "1234",
      address,
      "Sylvain",
      "Romiguier"
    );
    const individualCustomer2 = new IndividualCustomer(
      "1235",
      address,
      "Sylvain",
      "Romiguier"
    );
    expect(individualCustomer.isEqual(individualCustomer2)).toBeFalsy();
  });
});
