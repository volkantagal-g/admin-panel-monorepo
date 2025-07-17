import * as Yup from 'yup';
import moment from 'moment';
import { get } from 'lodash';

import { CONFIG_KEY_NAME, MARKET_CONFIG_QUERY_TYPES } from '../../utils/index';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      frame: Yup.number()
        .min(1)
        .max(100)
        .required(),
    })
  );
};

export const manipulateValuesAfterSubmit = (values, selectableLanguages) => {
  const newValues = { ...values };
  const value = selectableLanguages?.map(lang => {
    return {
      description: newValues?.description[lang] || '',
      url: newValues?.url[lang] || '',
      lang,
      frame: get(newValues, 'frame', 1),
      version: newValues?.version[lang] ? `${moment().valueOf()}-${newValues.version[lang]}` : '',
    };
  });

  return {
    key: CONFIG_KEY_NAME[newValues.key],
    configType: MARKET_CONFIG_QUERY_TYPES.ARRAY,
    value,
    isCustomEnabled: true,
  };
};

export const getInitialValues = (config, configValue, selectableLanguages) => {
  const descriptionsMap = new Map();
  const urlMap = new Map();
  const fileMap = new Map();
  const versionMap = new Map();

  selectableLanguages.forEach(lang => {
    descriptionsMap.set(lang, configValue?.[lang]?.description);
    urlMap.set(lang, configValue?.[lang]?.url);
    fileMap.set(lang, '');
    versionMap.set(lang, '');
  });
  const description = Object.fromEntries(descriptionsMap);
  const url = Object.fromEntries(urlMap);
  const file = Object.fromEntries(fileMap);
  const version = Object.fromEntries(versionMap);

  const initialValues = {
    key: get(config, 'key', ''),
    frame: get(config, 'value[0].frame', 0),
    description,
    url,
    file,
    version,
  };

  return initialValues;
};
