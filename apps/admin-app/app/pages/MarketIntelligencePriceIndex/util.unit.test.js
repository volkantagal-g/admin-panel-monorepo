import { isFloat } from '@app/pages/MarketIntelligencePriceIndex/utils/isFloat';
import {
  colorFinder,
  backgroundColorFinder,
  colorCategoryFinder,
  backgroundColorCategoryFinder,
  colorProductFinder,
  backgroundColorProductFinder,
} from '@app/pages/MarketIntelligencePriceIndex/utils/colorFinder';

describe('PriceIndex utils', () => {
  describe('#isFloat', () => {
    it('should return', () => {
      expect(isFloat(200)).toEqual(false);
    });
    it('should return price', () => {
      expect(isFloat(300)).toEqual(false);
    });
    it('should return price', () => {
      expect(isFloat(600)).toEqual(false);
    });
    it('should return price', () => {
      expect(isFloat(15)).toEqual(false);
    });
    it('should return price', () => {
      expect(isFloat(1.5)).toEqual(true);
    });
  });

  describe('#colorFinder', () => {
    it('should return #ffc107 ', () => {
      expect(colorFinder(100)).toEqual('#ffc107');
    });
    it('should return rgb(0, 176, 80) ', () => {
      expect(colorFinder(400)).toEqual('rgb(0, 176, 80)');
    });
    it('should return rgb(192, 0, 0) ', () => {
      expect(colorFinder(20)).toEqual('rgb(192, 0, 0)');
    });
  });

  describe('#backgroundColorFinder', () => {
    it('should return #fff6db ', () => {
      expect(backgroundColorFinder(100)).toEqual('#fff6db');
    });
    it('should return rgb(228, 248, 228) ', () => {
      expect(backgroundColorFinder(400)).toEqual('rgb(228, 248, 228)');
    });
    it('should return rgb(255, 229, 229) ', () => {
      expect(backgroundColorFinder(20)).toEqual('rgb(255, 229, 229)');
    });
  });

  describe('#colorCategoryFinder', () => {
    it('should return #424242 ', () => {
      expect(colorCategoryFinder(100)).toEqual('#424242');
    });
    it('should return #1e88e5 ', () => {
      expect(colorCategoryFinder(400)).toEqual('#1e88e5');
    });
    it('should return #f9a825 ', () => {
      expect(colorCategoryFinder(20)).toEqual('#f9a825');
    });
  });

  describe('#backgroundColorCategoryFinder', () => {
    it('should return #bdbdbd ', () => {
      expect(backgroundColorCategoryFinder(100)).toEqual('#bdbdbd');
    });
    it('should return #e3f2fd ', () => {
      expect(backgroundColorCategoryFinder(400)).toEqual('#e3f2fd');
    });
    it('should return #ffecb3 ', () => {
      expect(backgroundColorCategoryFinder(20)).toEqual('#ffecb3');
    });
  });

  describe('#colorProductFinder', () => {
    it('should return #424242 ', () => {
      expect(colorProductFinder(100)).toEqual('#424242');
    });
    it('should return #1e88e5 ', () => {
      expect(colorProductFinder(400)).toEqual('#1e88e5');
    });
    it('should return #f9a825 ', () => {
      expect(colorProductFinder(20)).toEqual('#f9a825');
    });
  });

  describe('#backgroundColorProductFinder', () => {
    it('should return #bdbdbd ', () => {
      expect(backgroundColorProductFinder(100)).toEqual('#bdbdbd');
    });
    it('should return #e3f2fd ', () => {
      expect(backgroundColorProductFinder(400)).toEqual('#e3f2fd');
    });
    it('should return #ffecb3 ', () => {
      expect(backgroundColorProductFinder(20)).toEqual('#ffecb3');
    });
  });
});
