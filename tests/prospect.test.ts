import { Prospect } from "../domain/Aggregates/Prospect";

describe("Prospect domain tests", () => {
  it("should create a valid prospect with a correct IPv4 address", () => {
    const prospect = new Prospect("127.0.0.1");
    expect(prospect.value.id.value).toBe("127.0.0.1");
  });
  it("should create a valid prospect with a correct IPv6 address", () => {
    const prospect = new Prospect("2001:41D0:1:2E4e::1");
    expect(prospect.value.id.value).toBe("2001:41D0:1:2E4e::1");
  });
  it("should throw an error if ip address is not supplied", () => {
    try {
      const prospect = new Prospect();
      expect(prospect).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("IP Address is not valid.");
    }
  });
  it("should throw an error if ip address is not valid", () => {
    try {
      const prospect = new Prospect("nimportequoi");
      expect(prospect).toThrowError();
    } catch (e) {
      expect((e as Error).message).toBe("IP Address is not valid.");
    }
  });
  it("should create a valid prospect and compare equality to other one", () => {
    const prospect = new Prospect("2001:41D0:1:2E4e::1");
    const prospect2 = new Prospect("2001:41D0:1:2E4e::1");
    expect(prospect.isEqual(prospect2)).toBeTruthy();
  });
  it("should create a valid prospect and compare inequality to other one", () => {
    const prospect = new Prospect("2002:41D0:1:2E4e::1");
    const prospect2 = new Prospect("2001:41D0:1:2E4e::1");
    expect(prospect.isEqual(prospect2)).toBeFalsy();
  });
});
