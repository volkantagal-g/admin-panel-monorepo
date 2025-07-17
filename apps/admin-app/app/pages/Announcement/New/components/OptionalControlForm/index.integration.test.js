import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import OptinalControlForm from './index';

describe('<OptinalControlForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (<OptinalControlForm form={
        {
          getFieldValue: () => { },
          setFieldsValue: () => { },
          setFields: () => { },
        }
      }
      />),
    });
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });
});
