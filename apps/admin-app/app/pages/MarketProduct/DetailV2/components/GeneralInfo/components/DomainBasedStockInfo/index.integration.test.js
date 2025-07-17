import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import renderComponent from '@test/publicUtils/renderComponent';
import DomainBasedStockInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { updateMarketProductAgeRestrictionMock } from '@shared/api/marketProduct/index.mock.handler';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const DomainBasedStockInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <DomainBasedStockInfo />;
};

describe('Market Product/Detail/DomainBasedStockInfo', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <DomainBasedStockInfo /> });
  });

  it('should render correct form components', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <DomainBasedStockInfo /> });
    expect(screen.getByText('Getir10')).toBeInTheDocument();
    expect(screen.getByText('GetirMore')).toBeInTheDocument();
    expect(screen.getByText('GetirWater')).toBeInTheDocument();
  });

  it('should edit correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    mockApiPerTestCase(updateMarketProductAgeRestrictionMock);
    await renderComponent({ ui: <DomainBasedStockInfoWithSaga /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const [getir10Input, getirMoreInput, getirWaterInput] = await screen.findAllByRole('spinbutton');
    userEvent.clear(getir10Input);
    userEvent.type(getir10Input, '1');
    userEvent.clear(getirMoreInput);
    userEvent.type(getirMoreInput, '1');
    userEvent.clear(getirWaterInput);
    userEvent.type(getirWaterInput, '1');
    const saveBtn = await screen.findByRole('button', { name: /save/i });
    userEvent.click(saveBtn);
  });

  it('should cancel correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <DomainBasedStockInfoWithSaga /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
