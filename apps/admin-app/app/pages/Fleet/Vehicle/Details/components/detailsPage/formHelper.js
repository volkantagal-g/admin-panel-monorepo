import moment from 'moment';

export const intialValues = {
  vehicleId: null,
  inspectionValidityDate: moment(),
  firstRegistrationDate: moment(),
  registrationDate: moment(),
  ownershipType: null,
  tags: [],
  engineNumber: null,
  identityNumber: null,
  chasis: null,
  kind: null,
  color: null,
  modelYear: null,
  licenceOwner: null,
  licenceSerial: null,
  licenceNumber: null,
  licenceImage: null,
  brand: null,
  tradeName: null,
  constraintId: null,
  plate: null,
  franchise: null,
  city: null,
};

export const findFranchise = (value, franchises) => {
  let selectedFranchise = null;
  franchises.forEach(franchise => {
    franchise.warehouses.forEach(warehouseOfFranchise => {
      if (warehouseOfFranchise._id === value) {
        selectedFranchise = warehouseOfFranchise;
      }
    });
  });
  return selectedFranchise;
};

export const findCity = (value, warehouse) => {
  let selectedCity = null;
  warehouse.forEach(wr => {
    if (wr._id === value) {
      selectedCity = wr.city._id;
    }
  });
  return selectedCity;
};
