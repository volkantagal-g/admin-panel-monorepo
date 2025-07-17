const mockGetDurationText = jest.fn();
const mockFormatDateWithSecond = jest.fn();
const mockTFunction = jest.fn((key: string) => key);
jest.mock('@app/pages/Courier/Detail/utils', () => ({ getDurationText: mockGetDurationText }));
jest.mock('@shared/utils/dateHelper', () => ({ formatDateWithSecond: mockFormatDateWithSecond }));

const {
  getHeaderTitle,
  getLastStatusChangeText,
} = require('./utils');

describe('getHeaderTitle', () => {
  it('should return the title with the name if name is provided', () => {
    const name = 'John Doe';
    expect(getHeaderTitle(mockTFunction, name)).toEqual('John Doe - DRIVER_DETAIL');
    expect(mockTFunction).toHaveBeenCalledWith('DRIVER_DETAIL');
  });

  it('should return the title without the name if name is not provided', () => {
    expect(getHeaderTitle(mockTFunction, null)).toEqual('DRIVER_DETAIL');
    expect(mockTFunction).toHaveBeenCalledWith('DRIVER_DETAIL');
  });
});

describe('getLastStatusChangeText', () => {
  beforeEach(() => {
    mockFormatDateWithSecond.mockReset();
    mockGetDurationText.mockReset();
  });

  it('should return the last status change text if statusLastChangedAt is provided', () => {
    const statusLastChangedAt = '2023-01-01T00:00:00Z';
    mockFormatDateWithSecond.mockReturnValue('January 1, 2023 00:00:00');
    mockGetDurationText.mockReturnValue('2 days ago');

    expect(getLastStatusChangeText(mockTFunction, statusLastChangedAt)).toEqual('LAST_STATUS_CHANGE: January 1, 2023 00:00:00 - 2 days ago');
    expect(mockTFunction).toHaveBeenCalledWith('LAST_STATUS_CHANGE');
    expect(mockFormatDateWithSecond).toHaveBeenCalledWith(statusLastChangedAt);
    expect(mockGetDurationText).toHaveBeenCalledWith(statusLastChangedAt);
  });

  it('should return unknown last status change text if statusLastChangedAt is not provided', () => {
    expect(getLastStatusChangeText(mockTFunction, null)).toEqual('LAST_STATUS_CHANGE - UNKNOWN');
    expect(mockTFunction).toHaveBeenCalledWith('LAST_STATUS_CHANGE');
    expect(mockTFunction).toHaveBeenCalledWith('UNKNOWN');
    expect(mockFormatDateWithSecond).not.toHaveBeenCalled();
    expect(mockGetDurationText).not.toHaveBeenCalled();
  });
});
