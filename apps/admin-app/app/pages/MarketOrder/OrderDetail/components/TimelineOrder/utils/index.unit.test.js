import { calculateProgressBarPercent, initProgressBars } from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('Order timeline util', () => {
  describe('#initProgressBars', () => {
    it('should return progress bar information', () => {
      const productMap = initProgressBars(mockedMarketOrderDetail);
      expect(productMap).toMatchObject({ progressInfos: { bars: [], totalBarValue: 0, totalTime: 0 } });
    });
  });

  describe('#calculateProgressBarPercent', () => {
    it('should return the current refund amount', () => {
      const barPercent = calculateProgressBarPercent({ value: 10, totalBarValue: 50 });
      expect(barPercent).toEqual('20.00%');
    });
  });
});
