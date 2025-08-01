import { ASSET_RENTALS } from '../../../constants';

export const getInitialValues = ({
  deviceType,
  country,
  rental,
}) => {
  const initialValues = {
    deviceType: deviceType ?? undefined,
    country: country ?? undefined,
    rental: rental ?? undefined,
  };
  return initialValues;
};

export const formatFiltersBeforeSubmit = ({ deviceType, country, rental: selectedRentalOptions }) => {
  let isRental; // (undefined means no filter) fetches both rental and non-rental
  if (selectedRentalOptions?.length === 1 && selectedRentalOptions?.includes(ASSET_RENTALS.Rental)) {
    isRental = true; // fetches only rental
  }
  else if (selectedRentalOptions?.length === 1 && selectedRentalOptions?.includes(ASSET_RENTALS.Bought)) {
    isRental = false; // fetches only non-rental
  }
  return {
    deviceType: deviceType?.length === 0 ? undefined : deviceType,
    country,
    isRental,
  };
};
