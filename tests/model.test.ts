import { Model } from "../domain/entities/Model";

describe("Domain Model tests", () => {
  it("should get a correct model", () => {
    const model = new Model("Yaris", "Toyota");
    const _model = {
      name: model.name.value,
      brand: model.brand.value,
    };
    expect(_model).toEqual({ name: "Yaris", brand: "Toyota" });
  });
  it("should test equality", () => {
    const model = new Model("Yaris", "Toyota");
    const model2 = new Model("Yaris", "Toyota");

    expect(model.isEqual(model2)).toBeTruthy();
  });
  it("should test inequality", () => {
    const model = new Model("Yaris", "Toyota");
    const model2 = new Model("Auris", "Toyota");

    expect(model.isEqual(model2)).toBeFalsy();
  });
});
