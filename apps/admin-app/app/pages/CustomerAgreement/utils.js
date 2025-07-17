// library imports
import { isEmpty } from 'lodash';

// local imports
import { activeAgreementTypes } from './constantValues';

// constants
const agreementFileBase = {
  name: '',
  preSignedUrl: '',
  content: null,
};

// util funcs: UploadDoc
export const uploadDocMaker = key => {
  return (value = null) => {
    const uploadDocContent = (isEmpty(value) ? {} : value);
    return { [key]: uploadDocContent };
  };
};

export const getUploadDocLanguage = file => {
  const [fileLanguage] = Object.keys(file);
  return fileLanguage;
};

// util funcs: AgreementFile
export const agreementFileMaker = key => {
  return (value = null) => {
    const agreementFileValue = (isEmpty(value) ? agreementFileBase : value);

    return {
      fileLanguage: key,
      uploadDetails: { ...agreementFileValue },
    };
  };
};

export const initAgreementFiles = countryLanguages => {
  return countryLanguages.map(countryLang => {
    return agreementFileMaker(countryLang)();
  });
};

// util funcs: Document Type Filter

/**
 *
 * @param documentTypes - Array of document type objects
 * @returns active agreements amongst API result with translations only declared as in the FE side
 */
export const formatAgreementTypes = ({ documentTypes }) => {
  const activesWithTranslatedValues = documentTypes && documentTypes.map(docType => {
    const activeType = activeAgreementTypes[docType.type];
    if (activeType) {
      const { tr, en } = activeType;
      return {
        name: {
          tr,
          en,
        },
        type: docType.type,
      };
    }
    return false;
  });
  return activesWithTranslatedValues;
};
