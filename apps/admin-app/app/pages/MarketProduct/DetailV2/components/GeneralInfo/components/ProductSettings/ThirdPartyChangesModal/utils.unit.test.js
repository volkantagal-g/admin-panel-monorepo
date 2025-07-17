/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ThirdPartyChangesModal from './index';
import { FIELD_ID, FORM_ID } from './constants';
import { syncHeightOfFormItems } from './utils';

describe('MarketProduct/Detail', () => {
  afterAll(cleanup);

  describe('Header/ThirdPartyChangesModal/utils', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ThirdPartyChangesModal onCancel={() => {}} />
        ),
      });
      await screen.findByText('Current Product Data');
    });

    it(`should set the form item's height of ${FORM_ID.THIRD_PARTY_PRODUCT_DATA} when its offsetHeight is lower`, () => {
      const currentDataElementId = `${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.DESCRIPTION}`;
      const thirdPartyDataElementId = `${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.DESCRIPTION}`;
      const currentDataElement = document.getElementById(currentDataElementId);
      let thirdPartyDataElement = document.getElementById(thirdPartyDataElementId);
      jest.spyOn(currentDataElement, 'offsetHeight', 'get').mockReturnValue(200);
      jest.spyOn(thirdPartyDataElement, 'offsetHeight', 'get').mockReturnValue(100);
      syncHeightOfFormItems();
      thirdPartyDataElement = document.getElementById(thirdPartyDataElementId);
      const styleOfThirdPartyDataElement = thirdPartyDataElement.getAttribute('style');
      expect(styleOfThirdPartyDataElement).toEqual('height: 200px');
    });

    it(`should set the form item's height of ${FORM_ID.CURRENT_PRODUCT_DATA} when its offsetHeight is lower`, () => {
      const currentDataElementId = `${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.TAGS}`;
      const thirdPartyDataElementId = `${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.TAGS}`;
      let currentDataElement = document.getElementById(currentDataElementId);
      const thirdPartyDataElement = document.getElementById(thirdPartyDataElementId);
      jest.spyOn(currentDataElement, 'offsetHeight', 'get').mockReturnValue(300);
      jest.spyOn(thirdPartyDataElement, 'offsetHeight', 'get').mockReturnValue(400);
      syncHeightOfFormItems();
      currentDataElement = document.getElementById(currentDataElementId);
      const styleOfCurrentDataElement = currentDataElement.getAttribute('style');
      expect(styleOfCurrentDataElement).toEqual('height: 400px');
    });
  });
});
