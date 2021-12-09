import {
  Address,
  IPAddress,
  Mileage,
  Name,
  PictureURL,
  RegistrationId,
  Siret,
  UniqueId,
} from "../domain/ValueObjects";

describe("Name Value Object tests", () => {
  it("should create a correct name", () => {
    const name = new Name("Correct Name 1234");
    expect(name.value).toBe("Correct Name 1234");
  });
  it("should test equality", () => {
    const name = new Name("Correct Name 1234");
    const name2 = new Name("Correct Name 1234");
    expect(name.isEqual(name2)).toBeTruthy();
  });
  it("should test inequality", () => {
    const name = new Name("Correct Name 1234");
    const name2 = new Name("Correct other name 1234");
    expect(name.isEqual(name2)).toBeFalsy();
  });
  it("should throw error on undefined name", () => {
    try {
      const name = new Name();
      expect(name).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Name is mandatory.");
    }
  });
  it("should throw error on bad name", () => {
    try {
      const name = new Name("2x");
      expect(name).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe(
        "A name should have at least 3 characters, the first should be a letter."
      );
    }
  });
});

describe("UniqueId Value Object tests", () => {
  it("should create a correct unique id with a defined value", () => {
    const uniqueId = new UniqueId("12345");
    expect(uniqueId.value).toBe("12345");
  });
  it("should throw an error with an undefined value", () => {
    try {
      const uniqueId = new UniqueId();
      expect(uniqueId).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Id is mandatory.");
    }
  });
  it("should return equality with a defined value", () => {
    const uniqueId = new UniqueId("12345");
    const otherUniqueId = new UniqueId("12345");
    expect(uniqueId.isEqual(otherUniqueId)).toBeTruthy();
  });
  it("should return inequality with a defined value", () => {
    const uniqueId = new UniqueId("12345");
    const otherUniqueId = new UniqueId("12346");
    expect(uniqueId.isEqual(otherUniqueId)).toBeFalsy();
  });
});

describe("RegistrationId Value Object tests", () => {
  it("should create a correct registration id with a defined value", () => {
    const registrationId = new RegistrationId("AZ-567-UY");
    expect(registrationId.value).toBe("AZ-567-UY");
  });
  it("should throw an error on creating registration id with an undefined value", () => {
    try {
      const registrationId = new RegistrationId();
      expect(registrationId).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Registration id is mandatory.");
    }
  });
  it("should return equality with a defined value", () => {
    const registrationId = new RegistrationId("AZ-567-UY");
    const otherRegistrationId = new RegistrationId("AZ-567-UY");
    expect(registrationId.isEqual(otherRegistrationId)).toBeTruthy();
  });
  it("should return inequality with a defined value", () => {
    const registrationId = new RegistrationId("AZ-567-UY");
    const otherRegistrationId = new RegistrationId("AB-567-UY");
    expect(registrationId.isEqual(otherRegistrationId)).toBeFalsy();
  });
});

describe("PictureURL Value Object tests", () => {
  it("should create a correct picture url with a defined value", () => {
    const pictureURL = new PictureURL("http://toto.fr/toto.jpg");
    expect(pictureURL.value).toBe("http://toto.fr/toto.jpg");
  });
  it("should create a correct picture url with an undefined value", () => {
    const pictureURL = new PictureURL();
    expect(pictureURL.value).toBe("../assets/no-photo.jpg");
  });
  it("should return equality with a defined value", () => {
    const pictureURL = new PictureURL("http://toto.fr/toto.jpg");
    const pictureURL2 = new PictureURL("http://toto.fr/toto.jpg");
    expect(pictureURL.isEqual(pictureURL2)).toBeTruthy();
  });
  it("should return inequality with a defined value", () => {
    const pictureURL = new PictureURL("http://toto.fr/toto.jpg");
    const pictureURL2 = new PictureURL();
    expect(pictureURL.isEqual(pictureURL2)).toBeFalsy();
  });
});

describe("Siret Value Object tests", () => {
  it("should create a correct siret with a defined value", () => {
    const siret = new Siret("12345678907894");
    expect(siret.value).toBe("12345678907894");
  });
  it("should throw an error on creating siret with an undefined value", () => {
    try {
      const siret = new Siret();
      expect(siret).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Siret should have 14 figures.");
    }
  });
  it("should throw an error on creating siret with letters", () => {
    try {
      const siret = new Siret("AAAA1234AAAAAA");
      expect(siret).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Siret should have 14 figures.");
    }
  });
  it("should throw an error on creating siret with less than 14 figures", () => {
    try {
      const siret = new Siret("1234568");
      expect(siret).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Siret should have 14 figures.");
    }
  });
  it("should throw an error on creating siret with more than 14 figures", () => {
    try {
      const siret = new Siret("123456789012345");
      expect(siret).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Siret should have 14 figures.");
    }
  });
  it("should return equality with a defined value", () => {
    const siret = new Siret("12345678907894");
    const otherSiret = new Siret("12345678907894");
    expect(siret.isEqual(otherSiret)).toBeTruthy();
  });
  it("should return inequality with a defined value", () => {
    const siret = new Siret("12345678907894");
    const otherSiret = new Siret("12345678907895");
    expect(siret.isEqual(otherSiret)).toBeFalsy();
  });
});

describe("Address Value Object tests", () => {
  it("should create a correct address with a defined value", () => {
    const address = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    expect(address.value).toEqual({
      number: "113",
      street: "impasse des oliviers",
      complement: "",
      zipCode: "30980",
      city: "Langlade",
      country: "France",
    });
  });
  it("should throw an error on creating address without undefined values", () => {
    try {
      const address = new Address();
      expect(address).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe(
        "Number, street name, zip code, city name, country name are mandatory."
      );
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
    const address2 = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30980",
      "Langlade",
      "France"
    );
    expect(address.isEqual(address2)).toBeTruthy();
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
    const address2 = new Address(
      "113",
      "impasse des oliviers",
      undefined,
      "30981",
      "Langlade",
      "France"
    );
    expect(address.isEqual(address2)).toBeFalsy();
  });
});

describe("Mileage Value Object tests", () => {
  it("should create a valid mileage", () => {
    const mileage = new Mileage(1250);
    expect(mileage.value).toBe(1250);
  });
  it("should create a mileage with zero if undefined, test equality", () => {
    const mileage = new Mileage();
    expect(mileage.value).toBe(0);
    const mileage2 = new Mileage();
    expect(mileage.isEqual(mileage2));
  });
  it("should throw an error if value is less than zero", () => {
    try {
      const mileage = new Mileage(-50);
      expect(mileage).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("Mileage can be less than zero.");
    }
  });
});

describe("IP Address Value Object tests", () => {
  it("should create a valid IPv4 address", () => {
    const ipAddress = new IPAddress("192.168.0.10");
    expect(ipAddress.value).toBe("192.168.0.10");
  });
  it("should create a valid IPv6 address", () => {
    const ipAddress = new IPAddress("2001:41D0:1:2E4e::1");
    expect(ipAddress.value).toBe("2001:41D0:1:2E4e::1");
  });
  it("should throw an erro if ip address is undefined", () => {
    try {
      const ipAddress = new IPAddress();
      expect(ipAddress).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("IP Address is not valid.");
    }
  });
  it("should throw an error if ip address is not valid", () => {
    try {
      const ipAddress = new IPAddress("nimportequoi");
      expect(ipAddress).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("IP Address is not valid.");
    }
  });
  it("should test equality", () => {
    const ipAddress = new IPAddress("192.168.0.10");
    const ipAddress2 = new IPAddress("192.168.0.10");
    expect(ipAddress.isEqual(ipAddress2)).toBeTruthy();
  });
  it("should test inequality", () => {
    const ipAddress = new IPAddress("192.168.0.10");
    const ipAddress2 = new IPAddress("192.168.0.11");
    expect(ipAddress.isEqual(ipAddress2)).toBeFalsy();
  });
});
