import { sortByColumn } from './utils';

const MOCKED_SORTER = {
  columnKey: 'finishDate',
  order: 'ascend',
};

describe('TipPayback utils', () => {
  describe('#sortByColumn', () => {
    it('should return formatted sort string', () => {
      expect(sortByColumn(MOCKED_SORTER)).toEqual('finishDate,asc');
    });
  });
});
