import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInformationForm from './index';
import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

describe('<GeneralInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form initialValues={{ domainType: GETIR_10_DOMAIN_TYPE }}>
          <GeneralInformationForm form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });
    expect(screen.getByText('General Information')).toBeInTheDocument();
  });
});
