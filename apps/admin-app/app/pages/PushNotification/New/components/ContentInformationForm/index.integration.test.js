import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ContentInformationForm from './index';
import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

describe('<ContentInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form initialValues={{ domainType: GETIR_10_DOMAIN_TYPE }}>
          <ContentInformationForm form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });
    expect(screen.getByText('Push Content Information')).toBeInTheDocument();
  });
});
