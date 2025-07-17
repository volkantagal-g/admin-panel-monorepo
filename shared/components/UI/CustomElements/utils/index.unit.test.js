const uniqIdGenerator = jest.fn();
uniqIdGenerator.mockImplementation(prefix => `${prefix}1`);

export const getTableID = () => {
  return uniqIdGenerator('getir-custom-table');
};

describe('CustomElements Utils', () => {
  describe('#getTableID', () => {
    it('should return the uniqTableId with prefix', () => {
      expect(getTableID()).toEqual('getir-custom-table1');
    });
  });
});
