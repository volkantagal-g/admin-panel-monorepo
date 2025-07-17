import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import StockLevelControllerForm from './index';

describe('<StockLevelControllerForm/> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form><StockLevelControllerForm controlFormName={['fieldName']} /></Form>) });
    expect(screen.getByText('Stock Level Control')).toBeInTheDocument();
  });
});
