import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';

import ContentInformatıonForm from './index';

describe('<ContentInformatıonForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form><ContentInformatıonForm /></Form>) });
    expect(screen.getByText('Content Information')).toBeInTheDocument();
  });
});
