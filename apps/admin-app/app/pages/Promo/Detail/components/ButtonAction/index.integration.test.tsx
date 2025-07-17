import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { BannerActionForm } from '@app/pages/Promo/Detail/components/ButtonAction/BannerActionForm';

describe('Banner Action:', () => {
  const mockForm = {
    getFieldProps: jest.fn(),
    getFieldMeta: jest.fn(),
  };
  const mockFormik = {
    values: {},
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  };

  afterEach(cleanup);

  it('should render the component', async () => {
    await renderComponent({ ui: <BannerActionForm disabled={false} formik={mockFormik as any} /> });
  });
});
