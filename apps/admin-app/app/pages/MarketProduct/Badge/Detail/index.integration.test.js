import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, render, screen } from '@testing-library/react';

import { expectSaga } from 'redux-saga-test-plan';

import { call } from 'redux-saga/effects';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

import { Creators, Types } from './redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getBadge, updateBadge, createBadgeImageUrl } from '@shared/api/marketProductBadge';
import { getBadgeRequest, updateBadgeRequest, updateBadgeImageUrlRequest } from './redux/saga';
import useStyles from './components/ImageInfo/styles';
import { ImageInfo } from '@app/pages/MarketProduct/Badge/Detail/components';

import reducer, { INITIAL_STATE } from './redux/reducer';

const TestComponent = () => {
  const classes = useStyles();
  return <div data-testid="wrapper" className={classes.wrapper}>Test</div>;
};
describe('MarketProductBadgeDetail', () => {
  afterAll(cleanup);

  describe('MarketProductBadgeDetail Page', () => {
    it('should render page without error', async () => {
      const marketProductBadgeDetailPageUrl = ROUTE.MARKET_PRODUCT_BADGE_DETAIL.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_BADGE_DETAIL,
        pageUrl: marketProductBadgeDetailPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('StyledComponent', () => {
    it('applies the wrapper style', () => {
      render(<TestComponent />);
      const wrapper = screen.getByTestId('wrapper');
      expect(wrapper).toHaveStyle('min-height: 100px');
    });
  });

  describe('Badge Saga Tests', () => {
    describe('getBadgeRequest', () => {
      it('handles success', () => {
        const id = '123';
        const data = { id, name: 'Test Badge' };

        return expectSaga(getBadgeRequest, { id })
          .provide([
            [call(getBadge, { id }), data],
          ])
          .put(Creators.getBadgeSuccess({ data }))
          .run();
      });

      it('handles failure', () => {
        const id = '123';
        const error = new Error('Failed to fetch badge');

        return expectSaga(getBadgeRequest, { id })
          .provide([
            [call(getBadge, { id }), Promise.reject(error)],
          ])
          .put(Creators.getBadgeFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('updateBadgeRequest', () => {
      it('handles success', () => {
        const id = '123';
        const body = { name: 'Updated Badge' };
        const data = { id, name: 'Updated Badge' };

        return expectSaga(updateBadgeRequest, { id, body })
          .provide([
            [call(updateBadge, { id, body }), data],
          ])
          .put(Creators.updateBadgeSuccess({ data }))
          .put(Creators.getBadgeRequest({ id }))
          .put(ToastCreators.success())
          .run();
      });

      it('handles failure', () => {
        const id = '123';
        const body = { name: 'Updated Badge' };
        const error = new Error('Failed to update badge');

        return expectSaga(updateBadgeRequest, { id, body })
          .provide([
            [call(updateBadge, { id, body }), Promise.reject(error)],
          ])
          .put(Creators.updateBadgeFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('updateBadgeImageUrlRequest', () => {
      it('handles failure', () => {
        const id = '123';
        const loadedImage = 'fakeImageData';
        const extension = 'jpg';
        const body = { name: 'Badge With Image' };
        const imagePath = 'picUrl.en';
        const isAppliedToOtherLanguanges = true;
        const error = new Error('Failed to upload image');

        return expectSaga(updateBadgeImageUrlRequest, { id, loadedImage, extension, body, imagePath, isAppliedToOtherLanguanges })
          .provide([
            [call(createBadgeImageUrl, { extension }), Promise.reject(error)],
          ])
          .put(Creators.updateBadgeImageUrlFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('ImageInfo', () => {
      it('renders without crashing', () => {
        const { container } = render(<ImageInfo />);
        expect(container).toBeInTheDocument();
      });
    });

    describe('Reducer Tests', () => {
      it('should handle GET_BADGE_REQUEST', () => {
        const state = reducer(INITIAL_STATE, { type: Types.GET_BADGE_REQUEST });
        expect(state.getBadge.isPending).toBe(true);
      });

      it('should handle GET_BADGE_SUCCESS', () => {
        const mockData = { id: 'badge-id', name: 'Badge' };
        const state = reducer(INITIAL_STATE, { type: Types.GET_BADGE_SUCCESS, data: mockData });
        expect(state.getBadge.isPending).toBe(false);
        expect(state.getBadge.data).toEqual(mockData);
        expect(state.getBadge.error).toBe(null);
      });

      it('should handle GET_BADGE_FAILURE', () => {
        const mockError = { message: 'Error fetching badge' };
        const state = reducer(INITIAL_STATE, { type: Types.GET_BADGE_FAILURE, error: mockError });
        expect(state.getBadge.isPending).toBe(false);
        expect(state.getBadge.error).toEqual(mockError);
      });

      it('should handle UPDATE_BADGE_REQUEST', () => {
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_REQUEST });
        expect(state.updateBadge.isPending).toBe(true);
      });

      it('should handle UPDATE_BADGE_SUCCESS', () => {
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_SUCCESS });
        expect(state.updateBadge.isPending).toBe(false);
        expect(state.updateBadge.error).toBe(null);
      });

      it('should handle UPDATE_BADGE_FAILURE', () => {
        const mockError = { message: 'Error updating badge' };
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_FAILURE, error: mockError });
        expect(state.updateBadge.isPending).toBe(false);
        expect(state.updateBadge.error).toEqual(mockError);
      });

      it('should handle UPDATE_BADGE_IMAGE_URL_REQUEST', () => {
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_IMAGE_URL_REQUEST });
        expect(state.updateBadgeImageUrl.isPending).toBe(true);
      });

      it('should handle UPDATE_BADGE_IMAGE_URL_SUCCESS', () => {
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_IMAGE_URL_SUCCESS });
        expect(state.updateBadgeImageUrl.isPending).toBe(false);
        expect(state.updateBadgeImageUrl.error).toBe(null);
      });

      it('should handle UPDATE_BADGE_IMAGE_URL_FAILURE', () => {
        const mockError = { message: 'Error updating badge image URL' };
        const state = reducer(INITIAL_STATE, { type: Types.UPDATE_BADGE_IMAGE_URL_FAILURE, error: mockError });
        expect(state.updateBadgeImageUrl.isPending).toBe(false);
        expect(state.updateBadgeImageUrl.error).toEqual(mockError);
      });

      it('should handle DESTROY_PAGE', () => {
        const currentState = { ...INITIAL_STATE, getBadge: { ...INITIAL_STATE.getBadge, isPending: true } };
        const state = reducer(currentState, { type: Types.DESTROY_PAGE });
        expect(state).toEqual(INITIAL_STATE);
      });

      it('should return initial state for unknown action types', () => {
        const currentState = { ...INITIAL_STATE, someOtherState: { data: [], isPending: true } };
        const state = reducer(currentState, { type: 'UNKNOWN_ACTION' });
        expect(state).toEqual(currentState);
      });
    });
  });
});
