/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ThirdPartyChangesModal from './index';
import { FIELD_ID, FORM_ID } from './constants';

const fieldIds = Object.values(FIELD_ID);

describe('MarketProduct/Detail', () => {
  afterAll(cleanup);

  describe('Header/ThirdPartyChangesModal', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ThirdPartyChangesModal onCancel={() => {}} />
        ),
      });
    });

    it.each(fieldIds)(`${FORM_ID.CURRENT_PRODUCT_DATA}-%s div should exist`, async fieldId => {
      const divId = `${FORM_ID.CURRENT_PRODUCT_DATA}-${fieldId}`;
      const element = document.getElementById(divId);
      expect(element).toBeInTheDocument();
    });

    it.each(fieldIds)(`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-%s div should exist`, async fieldId => {
      const divId = `${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${fieldId}`;
      const element = document.getElementById(divId);
      expect(element).toBeInTheDocument();
    });
  });
});
