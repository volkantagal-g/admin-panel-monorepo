import { screen } from '@testing-library/react';

import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import AggressionLevelControl from './index';

describe('<AggressionLevelControl /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <AggressionLevelControl fieldName="sampleField" />
        </Form>
      ),
    });
    expect(screen.getByLabelText('Aggression Level')).toBeInTheDocument();
  });
});
