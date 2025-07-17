import { screen } from '@testing-library/react';

import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';

import GetirMarketCategoryControl from './index';

describe('<GetirMarketCategoryControl /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <GetirMarketCategoryControl
            parentFieldName="marketCategoryIds"
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
    expect(screen.getByText('Getir10 Category Control')).toBeInTheDocument();
  });
});
