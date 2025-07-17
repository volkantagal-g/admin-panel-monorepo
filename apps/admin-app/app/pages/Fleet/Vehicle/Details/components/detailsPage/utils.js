import { removeNullOrUndefinedDeep } from '@shared/utils/common';

export const editVehicleCreationBody = ({
  plate, constraintId, warehouse, franchise, city, licenceImage, licenceSerial, firstRegistrationDate, registrationDate,
  tradeName, brand, chasis, kind, color, engineNumber, identityNumber, inspectionValidityDate, tags, ownershipType,
  licenceNumber, modelYear, licenceOwner,
}) => {
  const body = {
    constraintId,
    plate,
    warehouse,
    franchise,
    city,
    licence: {
      inspectionValidityDate,
      registrationDate,
      firstRegistrationDate,
      licenceImage: licenceImage?.length > 0 ? licenceImage : null,
      licenceSerial: licenceSerial?.length > 0 ? licenceSerial : null,
      tradeName: tradeName?.length > 0 ? tradeName : null,
      brand: brand?.length > 0 ? brand : null,
      class: chasis?.length > 0 ? chasis : null,
      modelYear: modelYear?.length > 0 ? modelYear : null,
      identityNumber: identityNumber?.length > 0 ? identityNumber : null,
      engineNumber: engineNumber?.length > 0 ? engineNumber : null,
      color: color?.length > 0 ? color : null,
      kind: kind?.length > 0 ? kind : null,
      licenceNumber: licenceNumber?.length > 0 ? licenceNumber : null,
      licenceOwner: licenceOwner?.length > 0 ? licenceOwner : null,
    },
    tags,
    ownershipType: typeof (ownershipType) === 'number' ? parseInt(ownershipType, 10) : null,
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
  return removeNullOrUndefinedDeep(body);
};

export const getVehicleTypeOptions = options => {
  const dropdownOptions = [];
  options?.forEach(option => {
    dropdownOptions.push({ value: option._id, label: option.name });
  });
  return dropdownOptions;
};
