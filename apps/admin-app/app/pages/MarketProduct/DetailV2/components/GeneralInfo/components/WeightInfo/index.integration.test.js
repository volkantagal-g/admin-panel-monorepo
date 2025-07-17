import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import WeightInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedWeightTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { updateMarketProductWeightInfoMock } from '@shared/api/marketProduct/index.mock.handler';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const WeightInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <WeightInfo />;
};
describe('MarketProduct/Detail', () => {
  afterAll(cleanup);
  describe('WeightInfo', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <WeightInfo />
        ),
      });
    });

    it('should render correct form components', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedWeightTypeProduct.marketProduct);
      await renderComponent({ ui: <WeightInfo /> });
      expect(screen.getByText('Starting Weight')).toBeInTheDocument();
      expect(screen.getByText('Minimum Weight')).toBeInTheDocument();
    });

    it('should edit correctly', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedWeightTypeProduct.marketProduct);
      mockApiPerTestCase(updateMarketProductWeightInfoMock);
      await renderComponent({ ui: <WeightInfoWithSaga /> });
      const editBtn = await screen.findByRole('button', { name: /edit/i });
      userEvent.click(editBtn);
      const [startingWeight, increasingDecreasingWeight, minimumWeight] = await screen.findAllByRole('combobox');

      userEvent.click(startingWeight);
      const firstOptionStartingWeight = screen.getAllByRole('option')[1];
      userEvent.click(firstOptionStartingWeight);

      userEvent.click(increasingDecreasingWeight);
      const firstOptionIncreasingDecreasingWeight = screen.getAllByRole('option')[3];
      userEvent.click(firstOptionIncreasingDecreasingWeight);

      userEvent.click(minimumWeight);
      const firstOptionMinimumWeight = screen.getAllByRole('option')[5];
      userEvent.click(firstOptionMinimumWeight);

      const saveBtn = await screen.findByRole('button', { name: /save/i });
      userEvent.click(saveBtn);
    });
  });
});
