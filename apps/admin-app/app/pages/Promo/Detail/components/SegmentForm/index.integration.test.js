import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { mockedListingPromo } from '@shared/api/promo/index.mock.data';
import {
  downloadP3SegmentClientsSelector,
  generateP3SegmentSelector,
  getP3DetailsSelector,
  getSegmentClientCountsSelector,
  updateClientSegmentSelector,
} from '../../redux/selectors';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

jest.mock('@shared/hooks', () => ({
  usePermission: () => {
    return { canAccess: jest.fn().mockReturnValue(true) };
  },
  usePrevious: () => {
    return jest.fn().mockReturnValue(true);
  },
}));

describe('SegmentForm:', () => {
  afterEach(cleanup);

  it('should render without an error', async () => {
    const promoSpy = jest.spyOn(PromoDetailSlice.selectors, 'promo');
    const getP3DetailsSpy = jest.spyOn(getP3DetailsSelector, 'getData');
    const isPendingSpy = jest.spyOn(updateClientSegmentSelector, 'getIsPending');
    const isFetchingP3DetailsSpy = jest.spyOn(getP3DetailsSelector, 'getIsPending');
    const updateErrorSpy = jest.spyOn(updateClientSegmentSelector, 'getError');
    const segmentClientCountsSpy = jest.spyOn(getSegmentClientCountsSelector, 'getData');
    const p3SegmentCountSpy = jest.spyOn(getSegmentClientCountsSelector, 'getData');
    const isSegmentClientCountPendingSpy = jest.spyOn(getSegmentClientCountsSelector, 'getIsPending');
    const isDownloadSegmentClientPendingSpy = jest.spyOn(downloadP3SegmentClientsSelector, 'getIsPending');
    const isP3GeneratePendingSpy = jest.spyOn(generateP3SegmentSelector, 'getIsPending');

    promoSpy.mockReturnValue(mockedListingPromo);
    isPendingSpy.mockReturnValue(false);
    isFetchingP3DetailsSpy.mockReturnValue(false);
    isSegmentClientCountPendingSpy.mockReturnValue(false);
    isDownloadSegmentClientPendingSpy.mockReturnValue(false);
    isP3GeneratePendingSpy.mockReturnValue(false);
    updateErrorSpy.mockReturnValue(null);
    getP3DetailsSpy.mockReturnValue({ data: {} });
    segmentClientCountsSpy.mockReturnValue({ data: {} });
    p3SegmentCountSpy.mockReturnValue({ data: {} });

    await renderComponent({ ui: <PageComponent /> });
  });
});
