import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { PARAMETER_TYPE } from '../../constants';

export const getInitialValues = reportType => {
  const initialValues = {
    name: {
      tr: '',
      en: '',
    },
  };

  reportType?.parameters?.forEach(param => {
    const { type, variableName } = param;
    switch (type) {
      case PARAMETER_TYPE.date:
        initialValues[variableName] = null;
        break;
      case PARAMETER_TYPE.boolean:
        initialValues[variableName] = false;
        break;
      case PARAMETER_TYPE.string:
        initialValues[variableName] = '';
        break;
      case PARAMETER_TYPE.number:
        initialValues[variableName] = undefined;
        break;
      case PARAMETER_TYPE.dropdown:
        initialValues[variableName] = undefined;
        break;
      case PARAMETER_TYPE.country:
        initialValues[variableName] = [getSelectedCountry()._id];
        break;
      case PARAMETER_TYPE.store:
        initialValues[variableName] = ['STORES NOT SUPPORTED'];
        break;
      default:
        initialValues[variableName] = [];
        break;
    }
  });

  return initialValues;
};
