import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import OptinalControlForm from './index';

describe('<OptinalControlForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <OptinalControlForm form={
            {
              getFieldValue: () => { },
              setFieldsValue: () => { },
              setFields: () => { },
            }
          }
          />
        </Form>
      ),
    });
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });
});
