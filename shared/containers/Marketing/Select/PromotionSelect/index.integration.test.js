import { screen } from '@testing-library/react';
import { Form } from 'antd';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import PromotionSelect from './index';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';

describe('<PromotionSelect /> Component - Integration Tests', () => {
  it('should promotionSelect render succesfully without targetServiceId', async () => {
    await renderComponent({
      ui: (
        <Form>
          <PromotionSelect form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });
    expect(screen.getByPlaceholderText('Please select the service first.')).toBeInTheDocument();
  });

  it('should custom dropdown render succesfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <PromotionSelect targetServiceId={GETIR_FOOD_DOMAIN_TYPE} form={{ getFieldValue: () => 0, setFields: () => true }} />
        </Form>
      ),
    });

    const select = screen.getByRole('combobox');
    await userEvent.click(select);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should foodPromoSelect render & visible succesfully with targetServiceId', async () => {
    await renderComponent({
      ui: (
        <Form>
          <PromotionSelect form={{ getFieldValue: () => 0, setFields: () => true }} targetServiceId={GETIR_FOOD_DOMAIN_TYPE} />
        </Form>
      ),
    });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should marketPromoSelect render & visible succesfully with targetServiceId', async () => {
    await renderComponent({
      ui: (
        <Form>
          <PromotionSelect form={{ getFieldValue: () => 0, setFields: () => true }} targetServiceId={GETIR_MARKET_DOMAIN_TYPE} />
        </Form>
      ),
    });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
