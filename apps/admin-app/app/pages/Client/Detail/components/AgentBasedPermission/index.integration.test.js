import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AgentBasedPermission from './index';
import { accessSelector } from '@app/pages/Client/Detail/redux/selectors';
import { GATEWAY_ERRORS } from '@shared/shared/constants';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('AgentBasedPermission', () => {
    it('should render component without error', async () => {
      const spy = jest.spyOn(accessSelector, 'getErrorCode');
      spy.mockReturnValue(GATEWAY_ERRORS.YOU_SHALL_NOT_PASS.errorCode);

      await renderComponent({
        ui: (
          <AgentBasedPermission />
        ),
      });
      await screen.findByText('OTP');
    });
  });
});
