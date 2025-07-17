import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import BatchedOrdersTable from './components/batchedOrdersTable';
import BatchedReturnsTable from './components/batchedReturnsTable';
import ForbiddenMatches from './components/forbiddenMatches';
import CardSections from './components/cardSections';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import {
  mockedArtisanOrderDetail,
  mockedShopReturnDetails,
  mockedReturnDetails,
  mockedCourierTasks,
  mockedReturnDetailsWithReturnIds,
  mockedCourierReturnTasks,
} from '@shared/api/artisan/index.mock.data';
import PageComponent from '.';
import RefundInfo from './components/timelineRefund/RefundedBy';
import { DELIVERY_TYPES } from './components/actionsMenu/modals/RefundModal/constants';
import RefundBasket from './components/timelineRefund/RefundBasket';
import TagStatuses from './components/tagStatuses';
import SubscriptionInfoTable from './components/subscriptionInfoTable';
import CancelShopOrderModal from './components/actionsMenu/modals/cancelShopOrderModal';
import CallInfoTimeline from './components/CallInfoTimeline';

const orderTestId = 'test_id';
const initialUrl = `/artisanOrder/detail/${orderTestId}`;

describe('In Artisan Order Detail Page:', () => {
  describe('For Page Details', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_ARTISAN_ORDER_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For Timeline', () => {
    it('should render', async () => {
      await screen.findAllByText(mockedArtisanOrderDetail.client.name);
      await screen.findAllByText(mockedArtisanOrderDetail.shop.name);
      await screen.findAllByText(/Order Number: 1027624/);
    });
  });

  describe('For ProgressBar', () => {
    it('should render', async () => {
      await screen.findByText(/Total Time/);
      await screen.findByText('29sec');
      await screen.findByText('8sec');
      await screen.findByText('9sec');
      await screen.findByText('12sec');
    });
  });

  describe('<BatchedOrdersTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({
        ui: <BatchedOrdersTable
          orderDetailId="62f259036eb4977c3d4f8bb5"
          courierOrderTasks={mockedCourierTasks}
          isInQueue={false}
          assignmentType="LOCALS_ALGO"
          isPendingOrderDetail={false}
          isPendingCourierTasks={false}
        />,
      });
      const batchedOrdersTable = screen.getByText(/Batch Order/);
      expect(batchedOrdersTable).toBeInTheDocument();
    });
  });

  describe('<BatchedReturnsTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({
        ui:
  <BatchedReturnsTable
    orderDetailId="668ba25f3e1323ea935b23a4"
    returnId="1796fc17-03ad-4a1a-a00b-c792afd85251"
    courierReturnTasks={mockedCourierReturnTasks}
    returnDetailsWithReturnIdsData={mockedReturnDetailsWithReturnIds}
  />,
      });
      const batchedReturnsTable = screen.getByText(/Batch Return/);
      expect(batchedReturnsTable).toBeInTheDocument();
    });
  });

  describe('<CardSections /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({
        ui: <CardSections
          returnCourier={mockedArtisanOrderDetail.courier.id}
          currentRunner={mockedArtisanOrderDetail.courier.id}
          refundCourierId={mockedArtisanOrderDetail.courier.id}
        />,
      });
      const CourierTable = screen.getAllByText(/Courier/)[0];
      expect(CourierTable).toBeInTheDocument();
    });
  });

  describe('<RefundInfo /> Component', () => {
    it('should render refund informations', async () => {
      await renderComponent({ ui: <RefundInfo refundedBy="Serkan" deliveryType={DELIVERY_TYPES.COURIER_RETRIEVES} /> });
      const refundInfo = screen.getByText(/Refund Type/);
      expect(refundInfo).toBeInTheDocument();
    });
  });

  describe('<Forbidden Matches /> Component', () => {
    it('should render forbidden matches', async () => {
      await renderComponent({ ui: <ForbiddenMatches /> });
      const forbiddenMatch = screen.getByText(/Forbidden Match/);
      expect(forbiddenMatch).toBeInTheDocument();
    });
  });

  describe('<RefundBasket /> Component', () => {
    it('should render refund basket', async () => {
      await renderComponent({
        ui: <RefundBasket
          returnId="d33e79aa-9818-4097-b7fc-3beb4dda06c3"
          paymentInfo={mockedShopReturnDetails?.paymentInfo}
          products={mockedReturnDetails?.selectedProducts}
          detailProducts={mockedShopReturnDetails?.products || []}
          isBasketDetailsLoading={false}
        />,
      });
      const refundBasket = screen.getByText(/Refund Basket/);
      expect(refundBasket).toBeInTheDocument();
    });
  });

  describe('<TagStatuses /> Component', () => {
    it('should render tags', async () => {
      await renderComponent({ ui: <TagStatuses /> });
      const jsonTag = screen.getByText(/JSON/);
      expect(jsonTag).toBeInTheDocument();
    });
  });

  describe('<SubscriptionInfoTable /> Component', () => {
    it('should render table', async () => {
      await renderComponent({ ui: <SubscriptionInfoTable subscriptionInfo={mockedArtisanOrderDetail.subscriptionInfo} /> });
      const getirSubsTexts = screen.getAllByText(/GetirSelect/);
      getirSubsTexts.forEach(text => expect(text).toBeInTheDocument());
    });
  });

  describe('<CancelShopOrderModal /> Component', () => {
    it('should render order cancellation modal', async () => {
      await renderComponent({ ui: <CancelShopOrderModal /> });
      const title = screen.getByText(/Cancel the Order/);
      expect(title).toBeInTheDocument();
    });
  });

  describe('<CallInfoTimeline /> Component', () => {
    it('should render call info timeline', async () => {
      await renderComponent({ ui: <CallInfoTimeline orderId={orderTestId} callPin="1337" /> });
      const callInfo = screen.getByTestId('call-info-timeline');
      expect(callInfo).toBeInTheDocument();
    });
  });
});
