import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ClientAppActionForm from './index';
import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

describe('<ClientAppActionForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form initialValues={{ domainType: GETIR_10_DOMAIN_TYPE }}>
          <ClientAppActionForm form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
