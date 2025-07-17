import { parsePhoneNumber } from 'libphonenumber-js';

export const isValidClientGSM = (gsm, dialingCode) => {
  const phoneNumber = parsePhoneNumber(`+${dialingCode}${gsm}`);

  return (
    phoneNumber.isValid() &&
    phoneNumber.countryCallingCode === dialingCode &&
    phoneNumber.nationalNumber === gsm &&
    /^\d*$/.test(`${dialingCode}${gsm}`)
  );
};
