import { Model } from "../domain/entities/Model";
import { Vehicule } from "../domain/entities/Vehicule";

describe("Vehicule tests", () => {
  it("should create a valid vehicule", () => {
    const model = new Model("Yaris", "Toyota");
    const vehicule = new Vehicule("AX-456-BZ", model, new Date("04/04/2019"));
    const _vehicule = {
      model: {
        name: vehicule.model.name.value,
        brand: vehicule.model.brand.value,
      },
      registrationId: vehicule.registrationId.value,
      mileage: vehicule.mileage.value,
      originalInServiceDate: vehicule.originalInServiceDate.getTime(),
      picture: vehicule.picture.value,
    };
    expect(_vehicule).toEqual({
      model: {
        name: "Yaris",
        brand: "Toyota",
      },
      picture: "../assets/no-photo.jpg",
      registrationId: "AX-456-BZ",
      originalInServiceDate: new Date("04/04/2019").getTime(),
      mileage: 0,
    });
  });
  it("should test equality", () => {
    const model = new Model("Yaris", "Toyota");
    const vehicule = new Vehicule("AX-456-BZ", model, new Date("04/04/2019"));
    const otherVehicule = new Vehicule(
      "AX-456-BZ",
      model,
      new Date("04/04/2019")
    );

    expect(vehicule.isEqual(otherVehicule)).toBeTruthy();
  });

  it("should test inequality", () => {
    const model = new Model("Yaris", "Toyota");
    const vehicule = new Vehicule("AB-456-BZ", model, new Date("04/04/2019"));
    const otherVehicule = new Vehicule(
      "AX-456-BZ",
      model,
      new Date("04/04/2019")
    );

    expect(vehicule.isEqual(otherVehicule)).toBeFalsy();
  });

  it("should throw an error if model or original in-service date are not defined", () => {
    try {
      const vehicule = new Vehicule("AX-456-BZ");
      expect(vehicule).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe(
        "A model and original in-service date are mandatory."
      );
    }
  });
  it("should throw an error if original in-service date is greater than now", () => {
    const model = new Model("Yaris", "Toyota");
    const oneHour = 3600 * 1000;
    try {
      const vehicule = new Vehicule(
        "AX-456-BZ",
        model,
        new Date(new Date().getTime() + oneHour)
      );
      expect(vehicule).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe(
        "The original in-service date can not be greater than now."
      );
    }
  });
});
