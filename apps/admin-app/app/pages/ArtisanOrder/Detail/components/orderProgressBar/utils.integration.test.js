import { initProgressBar } from './utils';

const MOCKED_SUCCESSFUL_ORDER_DATES = {
  deliverDate: '2022-07-25T06:59:35.633Z',
  checkoutDate: '2022-07-25T06:45:09.084Z',
  verifyDate: '2022-07-25T06:45:25.484Z',
  prepareDate: '2022-07-25T06:59:33.908Z',
  deliveryType: 2,
};

const MOCKED_CANCELLED_ORDER_DATES = {
  checkoutDate: '2022-07-22T13:50:12.093Z',
  verifyDate: '2022-07-22T14:00:03.032Z',
  cancelDate: '2022-07-22T14:00:10.081Z',
  deliveryType: 1,
};

describe('ArtisanOrder Detail OrderProgressBar utils', () => {
  describe('#initProgressBar', () => {
    it('should return expected values with correct inputs for successful order', () => {
      expect(initProgressBar(MOCKED_SUCCESSFUL_ORDER_DATES)).toEqual({
        progressBarItems: [
          {
            tooltipText: 'PROGRESSBAR.MERCHANT_VERIFY',
            key: 'verifyDate',
            color: '#5D3EBD',
            percentage: 2,
            text: '16sec',
          },
          {
            tooltipText: 'PROGRESSBAR.PREPARE',
            key: 'prepareDate',
            color: '#0077b6',
            percentage: '98.03',
            text: '14min 8sec',
          },
          {
            tooltipText: 'PROGRESSBAR.DELIVER',
            key: 'deliverDate',
            color: '#90e0ef',
            percentage: 2,
            text: '1sec',
          },
        ],
        totalTime: '14min 25sec',
      });
    });

    it('should return expected values with correct inputs for cancelled order', () => {
      expect(initProgressBar(MOCKED_CANCELLED_ORDER_DATES)).toEqual({
        progressBarItems: [],
        totalTime: '9min 57sec',
      });
    });

    it('should return empty values for no inputs', () => {
      expect(initProgressBar({})).toEqual({
        progressBarItems: [],
        totalTime: '0sec',
      });
    });
  });
});
