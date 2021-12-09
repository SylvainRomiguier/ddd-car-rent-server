import { IVehiculeOutputPort } from "../../application/Interfaces/vehicule/IVehiculeOutputPort";
import { Vehicule } from "../../domain/entities/Vehicule";

export class VehiculeConsolePresenter implements IVehiculeOutputPort {
  present = (vehicule: Vehicule) => {
    console.log(
      JSON.stringify(
        {
          registrationId: vehicule.registrationId.value,
          modelName: vehicule.model.name.value,
          modelBrand: vehicule.model.brand.value,
          originalInServiceDate:
            vehicule.originalInServiceDate.toLocaleDateString("fr-FR"),
          mileage: vehicule.mileage.value.toLocaleString("fr-FR"),
          pictureURL: vehicule.picture.value,
        },
        null,
        2
      )
    );
  };
}
