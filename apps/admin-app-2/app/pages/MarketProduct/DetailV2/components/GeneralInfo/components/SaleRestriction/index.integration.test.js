import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { updateMarketProductSaleRestrictionMock } from '@shared/api/marketProduct/index.mock.handler';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import SaleRestriction from './index';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const SaleRestrictionWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <SaleRestriction />;
};

describe('Market Product/Detail/SaleRestriction', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <SaleRestriction /> });
  });

  it('should render correct form components', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <SaleRestriction /> });
    expect(screen.getByText('Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Max Order Count')).toBeInTheDocument();
  });

  it('should edit correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    mockApiPerTestCase(updateMarketProductSaleRestrictionMock);
    await renderComponent({ ui: <SaleRestrictionWithSaga /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const spinBtn = await screen.findByRole('spinbutton');
    userEvent.clear(spinBtn);
    userEvent.type(spinBtn, '1');
    const saveBtn = await screen.findByRole('button', { name: /save/i });
    userEvent.click(saveBtn);
  });

  it('should cancel correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <SaleRestrictionWithSaga /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
