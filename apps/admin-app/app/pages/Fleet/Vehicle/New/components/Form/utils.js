import { removeNullOrUndefinedDeep } from '@shared/utils/common';

export const editVehicleCreationBody = ({
  plate, constraintId, warehouse, franchise, city, licenceImage, licenceSerial, firstRegistrationDate, registrationDate,
  tradeName, brand, chasis, kind, color, engineNumber, identityNumber, inspectionValidityDate, tags, ownershipType,
  licenceNumber, modelYear, licenceOwner,
}) => {
  const body = {
    constraintId,
    warehouse,
    plate,
    franchise,
    city,
    licence: {
      inspectionValidityDate,
      registrationDate,
      firstRegistrationDate,
      licenceImage,
      licenceSerial,
      tradeName,
      brand,
      class: chasis,
      modelYear,
      identityNumber,
      engineNumber,
      color,
      kind,
      licenceNumber,
      licenceOwner,
    },
    tags,
    ownershipType,
  };
  body.licence.inspectionValidityDate = (
    typeof (body.licence.inspectionValidityDate) === 'object' ? body.licence.inspectionValidityDate.format('YYYY-MM-DD') : body.licence.inspectionValidityDate
  );
  body.licence.firstRegistrationDate = (
    typeof (body.licence.firstRegistrationDate) === 'object' ? body.licence.firstRegistrationDate.format('YYYY-MM-DD') : body.licence.firstRegistrationDate
  );
  body.licence.registrationDate = (
    typeof (body.licence.registrationDate) === 'object' ? body.licence.registrationDate.format('YYYY-MM-DD') : body.licence.registrationDate
  );
  body.tags = body.tags ? body.tags : null;
  body.licence.licenceNumber = body.licence.licenceNumber ? parseInt(body.licence.licenceNumber, 10) : body.licence.licenceNumber;
  body.licence.modelYear = body.licence.modelYear ? parseInt(body.licence.modelYear, 10) : body.licence.modelYear;
  return removeNullOrUndefinedDeep(body);
};

export const getVehicleTypeOptions = options => {
  const dropdownOptions = [];
  options?.forEach(option => {
    dropdownOptions.push({ value: option._id, label: option.name });
  });
  return dropdownOptions;
};
