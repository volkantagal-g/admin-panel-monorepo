import * as Yup from 'yup';
import isNumber from 'lodash/isNumber';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

class YupMultiLanguage {
  static string = (params = {}) => {
    const { min = 2, max = 64, isRequired = false, isValidationSkipped = false } = params;
    const countryLanguages = getSelectedCountryLanguages();
    let multiLanguageYup = Yup.string().trim()
      .when('a', (a, schema) => {
        if (isNumber(min)) {
          return schema.min(min);
        }
        return schema;
      })
      .when('a', (a, schema) => {
        if (isNumber(max)) {
          return schema.max(max);
        }
        return schema;
      })
      .when('a', (a, schema) => {
        if (isRequired) {
          return schema.required();
        }
        return schema;
      });

    if (isValidationSkipped) {
      multiLanguageYup = Yup.string().trim();
    }

    const multiLanguageSchema = {};
    countryLanguages.forEach(countryLanguage => {
      multiLanguageSchema[countryLanguage] = multiLanguageYup;
    });

    return Yup.object().shape(multiLanguageSchema);
  };

  static arrayOfStrings = (params = {}) => {
    const { isRequired = false, isValidationSkipped = false } = params;
    const countryLanguages = getSelectedCountryLanguages();

    let multiLanguageYup = Yup.array()
      .of(
        Yup.string().trim()
          .when('a', (a, schema) => {
            if (isRequired) {
              return schema.required();
            }
            return schema;
          }),
      )
      .when('a', (a, schema) => {
        if (isRequired) {
          return schema.min(1).required();
        }
        return schema;
      });

    if (isValidationSkipped) {
      multiLanguageYup = Yup.array();
    }

    const multiLanguageSchema = {};
    countryLanguages.forEach(countryLanguage => {
      multiLanguageSchema[countryLanguage] = multiLanguageYup;
    });

    return Yup.object().shape(multiLanguageSchema);
  };
}

export { YupMultiLanguage };
