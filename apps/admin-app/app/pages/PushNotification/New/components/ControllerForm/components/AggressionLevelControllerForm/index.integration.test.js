import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import AggressionLevelControllerForm from './index';

describe('<AggressionLevelControllerForm/> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form><AggressionLevelControllerForm controlFormName={['fieldName']} /></Form>) });
    expect(screen.getByText('Aggression Level Control')).toBeInTheDocument();
  });
});
