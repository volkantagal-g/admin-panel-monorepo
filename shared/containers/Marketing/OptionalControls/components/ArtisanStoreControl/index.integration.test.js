import { screen } from '@testing-library/react';

import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ArtisanStoreControl from './index';

describe('<ArtisanStoreControl /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <ArtisanStoreControl
            parentFieldName="test"
            form={
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
    expect(screen.getByText('Artisan Store Controls')).toBeInTheDocument();
  });
});
