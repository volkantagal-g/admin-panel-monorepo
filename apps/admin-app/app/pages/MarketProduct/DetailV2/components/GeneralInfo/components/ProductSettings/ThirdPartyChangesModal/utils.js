import { FIELD_ID, FORM_ID } from './constants';

export const syncHeightOfFormItems = () => {
  Object.values(FIELD_ID).forEach(fieldId => {
    const currentDataElement = document.getElementById(`${FORM_ID.CURRENT_PRODUCT_DATA}-${fieldId}`);
    const thirdPartyDataElement = document.getElementById(`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${fieldId}`);
    if (currentDataElement && thirdPartyDataElement) {
      if (currentDataElement.offsetHeight > thirdPartyDataElement.offsetHeight) {
        thirdPartyDataElement.setAttribute('style', `height: ${currentDataElement.offsetHeight}px`);
      }
      else if (currentDataElement.offsetHeight < thirdPartyDataElement.offsetHeight) {
        currentDataElement.setAttribute('style', `height: ${thirdPartyDataElement.offsetHeight}px`);
      }
    }
  });
};
