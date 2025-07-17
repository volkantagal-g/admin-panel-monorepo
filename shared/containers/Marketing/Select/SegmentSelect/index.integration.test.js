import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import SegmentSelect from './index';

describe('<SegmentSelect /> Component - Integration Tests', () => {
  it('should segmentSelect render & visible successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <SegmentSelect form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
