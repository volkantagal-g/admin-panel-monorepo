import { Promo } from '@app/pages/Promo/types';

interface SubmitValues {
  values: {
    badgeId: any
  }
}

export const getOnlyModifiedValuesBeforeSubmit = ({ values }: SubmitValues) => {
  const badgeId = values.badgeId?.value ? values.badgeId.value : values.badgeId;
  return { badgeId };
};

type InitialValues = (promo: Promo) => { badgeId: string };

export const getInitialValues: InitialValues = promo => {
  return { badgeId: promo?.badgeId?.toString() || '' };
};
