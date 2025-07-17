import { COURIER_TYPE } from '@shared/shared/constants';
import { removeNullOrUndefinedDeep, convertToCapitalLetter } from '@shared/utils/common';

export const getCountryById = (countryId, countries) => countries.find(country => country._id === countryId);

export const getNewPersonRequestParams = body => {
  const data = {
    person: {
      ...body,
      relative: { ...body.relative },
      homeAddress: { ...body.homeAddress },
      countryGsmCode: body.countryGsmCode.toString(),
      personalGsm: body.personalGsm.replace(/\D/g, ''),
      tc: body.uniqueIdentifier,
      iban: body.iban.replace(/\s/g, '').toLocaleUpperCase(),
      name: convertToCapitalLetter(body.name),
    },
    courierTypes: body.createCourier ? [COURIER_TYPE.GM] : [],
  };
  if (data.person.relative.countryGsmCode) {
    data.person.relative.countryGsmCode = data.person.relative.countryGsmCode.toString();
  }
  if (data.person.relative.gsm) {
    data.person.relative.gsm = data.person.relative.gsm.replace(/\D/g, '');
  }
  if (data.person.relative.name) {
    data.person.relative.name = convertToCapitalLetter(data.person.relative.name);
  }
  delete data.person.createCourier;
  delete data.person.homeAddress.mapOptions;
  return removeNullOrUndefinedDeep(data, { removeEmpty: true });
};
