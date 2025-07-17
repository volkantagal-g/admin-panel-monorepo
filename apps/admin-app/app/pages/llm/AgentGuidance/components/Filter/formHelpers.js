import * as Yup from 'yup';

export const validationSchema = t => Yup.object().shape({
  type: Yup.string().required(t('error:REQUIRED')).nullable(),
  feature: Yup.string().required(t('error:REQUIRED')).nullable(),
  domain: Yup.string().required(t('error:REQUIRED')).nullable(),
  contact: Yup.string().required(t('error:REQUIRED')).nullable(),
  channel: Yup.string().required(t('error:REQUIRED')).nullable(),
  level: Yup.string().required(t('error:REQUIRED')).nullable(),
  mr: Yup.string().required(t('error:REQUIRED')).nullable(),
  sr: Yup.string().required(t('error:REQUIRED')).nullable(),
  segment: Yup.string().required(t('error:REQUIRED')).nullable(),
});

export const contentValidationSchema = t => Yup.object().shape({ content: Yup.string().required(t('error:REQUIRED')) });

export const getInitialValues = ({
  type,
  feature,
  domain,
  contact,
  channel,
  level,
  mr,
  sr,
  segment,
}) => {
  return {
    type,
    feature,
    domain,
    contact,
    channel,
    level,
    mr,
    sr,
    segment,
  };
};
