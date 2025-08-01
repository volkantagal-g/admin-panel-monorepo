import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import userEvent from '@testing-library/user-event';

import { getModifiedValues } from '@app/pages/MarketProduct/containers/NewProductButton/NewProductModal/formHelper';

import renderComponent from '@test/publicUtils/renderComponent';
import NewProductButton from '@app/pages/MarketProduct/containers/NewProductButton/index';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { createMarketProductURLMock } from '@shared/api/marketProduct/index.mock.handler';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { reduxKey } from '@app/pages/MarketProduct/containers/NewProductButton/constants';
import { Creators } from '@app/pages/MarketProduct/containers/NewProductButton/redux/actions';
import reducer from '@app/pages/MarketProduct/containers/NewProductButton/redux/reducer';
import saga from '@app/pages/MarketProduct/containers/NewProductButton/redux/saga';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';

const NewProductButtonWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useEffect(() => {
    dispatch(Creators.openModal());
    return () => {
      dispatch(Creators.closeModal());
    };
  });
  return (
    <NewProductButton />
  );
};

describe('MarketProductNewButtonComponent', () => {
  afterAll(cleanup);

  it('should render component without error', async () => {
    await renderComponent({ ui: (<NewProductButtonWithSaga />) });
  });

  it('should create new product without error', async () => {
    mockApiPerTestCase(createMarketProductURLMock);
    const newProductButton = await screen.findByRole('button', { name: 'New Product' });
    userEvent.click(newProductButton);
    const [productTargets, barcodes, productType] = await screen.findAllByRole('combobox');
    const [nameTR, nameEN] = await screen.findAllByRole('textbox');

    userEvent.click(productTargets);
    let optionsList = screen.getByRole('listbox');
    expect(optionsList).toBeInTheDocument();
    const options = await within(optionsList).findAllByRole('option');
    const [firstOption] = options;
    await userEvent.click(firstOption);

    userEvent.click(productType);
    [, optionsList] = screen.getAllByRole('listbox');
    expect(optionsList).toBeInTheDocument();

    const bundleSwitch = screen.getByRole('switch');
    expect(bundleSwitch).not.toBeChecked();
    userEvent.click(bundleSwitch);
    expect(bundleSwitch).toBeChecked();
    userEvent.click(bundleSwitch);
    expect(bundleSwitch).not.toBeChecked();
    userEvent.type(productTargets, 'Getir10');
    userEvent.type(nameTR, 'example');
    userEvent.type(nameEN, 'example');
    userEvent.type(barcodes, '1');
    const okButton = await screen.findByText(/ok/i);
    userEvent.click(okButton);
  });

  it('should open and close model without error', async () => {
    const newProductButton = await screen.findByRole('button', { name: 'New Product' });
    userEvent.click(newProductButton);
    const cancelButton = await screen.findByRole('button', { name: 'CANCEL' });
    userEvent.click(cancelButton);
  });

  describe('getModifiedValues', () => {
    it('should correctly modify values for weight product', () => {
      const initialValues = {
        type: MARKET_PRODUCT_TYPE.WEIGHT,
        subType: '2',
        domainTypes: ['1', '2'],
        name: { en: 'Test Product', tr: 'Test Ürün' },
        isBundle: true,
        bundleDisplayType: '1',
      };

      const result = getModifiedValues(initialValues);

      expect(result).toEqual({
        type: MARKET_PRODUCT_TYPE.WEIGHT,
        subType: 2,
        domainTypes: [1, 2],
        name: { en: 'Test Product', tr: 'Test Ürün' },
        fullName: expect.any(Object),
      });

      expect(result.isBundle).toBeUndefined();
      expect(result.bundleDisplayType).toBeUndefined();
    });

    it('should correctly modify values for non-weight product', () => {
      const initialValues = {
        type: MARKET_PRODUCT_TYPE.PIECE,
        domainTypes: ['1', '2'],
        name: { en: 'Test Product', tr: 'Test Ürün' },
        isBundle: true,
        bundleDisplayType: '1',
      };

      const result = getModifiedValues(initialValues);

      expect(result).toEqual({
        type: MARKET_PRODUCT_TYPE.PIECE,
        domainTypes: [1, 2],
        name: { en: 'Test Product', tr: 'Test Ürün' },
        isBundle: true,
        bundleDisplayType: '1',
        fullName: expect.any(Object),
      });

      expect(result.subType).toBeUndefined();
    });

    it('should remove bundleDisplayType if it is null', () => {
      const initialValues = {
        type: MARKET_PRODUCT_TYPE.PIECE,
        domainTypes: ['1'],
        name: { en: 'Test Product', tr: 'Test Ürün' },
        bundleDisplayType: null,
      };

      const result = getModifiedValues(initialValues);

      expect(result.bundleDisplayType).toBeUndefined();
    });
  });
});
