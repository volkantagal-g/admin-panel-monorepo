import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import AntSelectWithCsvUpload from './index';

describe('<AntSelectWithCsvUpload /> Component - Integration Tests', () => {
  it('should select render successfully', async () => {
    const dummyLabel = 'dummyLabel';
    await renderComponent({ ui: (<Form><AntSelectWithCsvUpload label={dummyLabel} /></Form>) });
    expect(screen.getByRole('combobox', { name: dummyLabel })).toBeInTheDocument();
  });

  it('should import csv button render successfully', async () => {
    await renderComponent({ ui: (<Form><AntSelectWithCsvUpload /></Form>) });
    expect(screen.getByRole('button', { name: 'import-csv' })).toBeInTheDocument();
  });
});
