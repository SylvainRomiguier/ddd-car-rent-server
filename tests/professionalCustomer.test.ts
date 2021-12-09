import { ProfessionalCustomer } from "../domain/entities/ProfessionalCustomer";
import { Address } from "../domain/ValueObjects";

describe("Professional Customer domain tests", () => {
  it("should create a valid professional customer", () => {
    const address = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    const professionalCustomer = new ProfessionalCustomer(
      address,
      "Grimoire Systems",
      "12345678901234"
    );

    const _professionalCustomer = {
      address: {
        number: professionalCustomer.value.address.value.number,
        street: professionalCustomer.value.address.value.street,
        complement: professionalCustomer.value.address.value.complement,
        zipCode: professionalCustomer.value.address.value.zipCode,
        city: professionalCustomer.value.address.value.city,
        country: professionalCustomer.value.address.value.country,
      },
      companyName: professionalCustomer.value.companyName.value,
      siret: professionalCustomer.value.siret.value,
    };

    expect(_professionalCustomer).toEqual({
      address: {
        number: "113",
        street: "impasse des oliviers",
        complement: "",
        zipCode: "30980",
        city: "Langlade",
        country: "France",
      },
      companyName: "Grimoire Systems",
      siret: "12345678901234",
    });
  });
  it("should throw an error if an address is not supplied", () => {
    const address = undefined;
    try {
      const professionalCustomer = new ProfessionalCustomer(
        address,
        "Grimoire Systems",
        "12345678901234"
      );
      expect(professionalCustomer).toThrowError();
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
    const professionalCustomer = new ProfessionalCustomer(
      address,
      "Grimoire Systems",
      "12345678901234"
    );
    const professionalCustomer2 = new ProfessionalCustomer(
      address,
      "Grimoire Systems",
      "12345678901234"
    );
    expect(professionalCustomer.isEqual(professionalCustomer2)).toBeTruthy();
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
    const professionalCustomer = new ProfessionalCustomer(
      address,
      "Grimoire Systems",
      "12345678901234"
    );
    const professionalCustomer2 = new ProfessionalCustomer(
      address,
      "Grimoire Systems",
      "12345678901235"
    );
    expect(professionalCustomer.isEqual(professionalCustomer2)).toBeFalsy();
  });
});
