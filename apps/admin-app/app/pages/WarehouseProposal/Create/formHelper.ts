import * as Yup from 'yup';
import { parsePhoneNumber } from 'libphonenumber-js';
import { TFunction } from 'i18next';

import { IWarehouseProposalFormValues } from '@app/pages/WarehouseProposal/interfaces';
import { DEFAULT_MAP_COORDINATES } from '@shared/shared/constants';

export const defaultValues: IWarehouseProposalFormValues = {
  proposal: { name: '' },
  applicant: {
    name: '',
    surname: '',
    gsm: '',
    countryGsmCode: '+90',
    email: '',
    isPropertyOwner: false,
  },
  property: {
    country: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    buildingNo: '',
    addressDescription: '',
    netFloorSize: null,
    netBasementSize: null,
    netMezzanineSize: null,
    netTotalSize: null,
    rent: null,
    taxType: null,
    kind: null,
    year: null,
    hasOccupancyPermit: false,
    hasConstructionRegistration: false,
    note: '',
  },
  location: {
    lat: DEFAULT_MAP_COORDINATES[1],
    lon: DEFAULT_MAP_COORDINATES[0],
  },
  photos: [],
};

export const isValidClientGSM = (gsm: string, dialingCode: string): boolean => {
  try {
    const phoneNumber = parsePhoneNumber(`${dialingCode}${gsm}`);
    return phoneNumber.isValid();
  }
  catch (error) {
    return false;
  }
};

export const getValidationSchema = (t: TFunction) => Yup.object().shape({
  proposal: Yup.object().shape({ name: Yup.string().required(t('error:REQUIRED')) }),
  applicant: Yup.object().shape({
    name: Yup.string().required(t('error:REQUIRED')),
    surname: Yup.string().required(t('error:REQUIRED')),
    gsm: Yup.string()
      .required(t('error:REQUIRED'))
      .matches(/^[0-9]{10}$/, t('warehouseProposalPage:ERRORS.PHONE_NUMBER_MUST_BE_10_DIGITS'))
      .test('validGsm', t('error:INVALID'), function (value) {
        if (!value) return false;
        const { countryGsmCode } = this.parent;
        return isValidClientGSM(value, countryGsmCode);
      }),
    email: Yup.string().email(t('error:VALID_EMAIL')).required(t('error:REQUIRED')),
    isPropertyOwner: Yup.boolean(),
  }),
  property: Yup.object().shape({
    city: Yup.string().required(t('error:REQUIRED')),
    district: Yup.string().required(t('error:REQUIRED')),
    neighborhood: Yup.string().required(t('error:REQUIRED')),
    street: Yup.string().required(t('error:REQUIRED')),
    buildingNo: Yup.string().required(t('error:REQUIRED')),
    addressDescription: Yup.string().required(t('error:REQUIRED')),
    netFloorSize: Yup.number().nullable().required(t('error:REQUIRED')),
    netBasementSize: Yup.number().nullable().required(t('error:REQUIRED')),
    netMezzanineSize: Yup.number().nullable().required(t('error:REQUIRED')),
    netTotalSize: Yup.number().nullable().required(t('error:REQUIRED')),
    rent: Yup.number().nullable().required(t('error:REQUIRED')),
    taxType: Yup.string().nullable().required(t('error:REQUIRED')),
    kind: Yup.string().nullable().required(t('error:REQUIRED')),
    year: Yup.string().nullable().required(t('error:REQUIRED')),
    hasOccupancyPermit: Yup.boolean(),
    hasConstructionRegistration: Yup.boolean(),
  }),
  note: Yup.string(),
  photos: Yup.array()
    .min(3)
    .required(t('warehouseProposalPage:ERRORS.MIN_THREE_PHOTOS')),
  location: Yup.object().shape({
    lat: Yup.number().nullable().required(t('error:REQUIRED')),
    lon: Yup.number().nullable().required(t('error:REQUIRED')),
  }),
});

export const formatWarehouseProposalData = (formValues: IWarehouseProposalFormValues) => {
  return {
    applicant: {
      name: formValues.applicant.name,
      surname: formValues.applicant.surname,
      gsm: formValues.applicant.gsm,
      email: formValues.applicant.email,
    },
    property: {
      city: formValues.property.city,
      district: formValues.property.district,
      neighborhood: formValues.property.neighborhood,
      street: formValues.property.street,
      buildingNo: formValues.property.buildingNo,
      addressDescription: formValues.property.addressDescription,
      netFloorSize: formValues.property.netFloorSize,
      netBasementSize: formValues.property.netBasementSize,
      netMezzanineSize: formValues.property.netMezzanineSize,
      netTotalSize: formValues.property.netTotalSize,
      rent: formValues.property.rent,
      taxType: formValues.property.taxType,
      kind: formValues.property.kind,
      year: formValues.property.year,
      hasOccupancyPermit: formValues.property.hasOccupancyPermit,
      hasConstructionRegistration: formValues.property.hasConstructionRegistration,
    },
    note: formValues.property.note,
  };
};

interface OptionType {
  value: number;
  label: string;
}

export const getImmovablePropertyOptions = (t: TFunction): OptionType[] => [
  { value: 1, label: t('warehouseProposalPage:LAND') },
  { value: 2, label: t('warehouseProposalPage:STORE') },
];

export const getTaxTypeOptions = (t: TFunction): OptionType[] => [
  { value: 1, label: t('warehouseProposalPage:STOPPAGE') },
  { value: 2, label: t('warehouseProposalPage:TAX') },
];

export const prepareData = (values: IWarehouseProposalFormValues, selectedCountryId: string) => {
  const requestBody = {
    applicant: values.applicant,
    property: {
      ...values.property,
      country: selectedCountryId,
    },
    note: values.property.note || values.note,
    photos: values.photos,
    proposal: values.proposal,
    location: {
      lat: values.location.lat,
      lon: values.location.lon,
    },
  };

  delete requestBody.property.note;
  return requestBody;
};
