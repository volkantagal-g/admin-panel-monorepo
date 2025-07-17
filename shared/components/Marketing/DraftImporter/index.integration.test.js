import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import DraftImporter from './index';

describe('<DraftImporter /> Component - Integration Tests', () => {
  it('should draft import type select render successfully', async () => {
    const label = 'label';
    await renderComponent({ ui: (<Form> <DraftImporter name="fieldName" label={label} form={{ getFieldValue: () => 2 }} /></Form>) });
    expect(screen.getByRole('combobox', { name: label })).toBeInTheDocument();
  });
});
