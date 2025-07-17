/* eslint-disable */
import { Creators, Types } from '@app/pages/Brand/List/redux/actions';

describe('Brand/List', () => {
  describe('action-creator #getBrandsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandsRequest({});
      const expectedAction = { type: Types.GET_BRANDS_REQUEST, limit: 10, offset: 0, name: '', status: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandsRequest({ limit: 5, offset: 0, name: 'Name', status: true });
      const expectedAction = { type: Types.GET_BRANDS_REQUEST, limit: 5, offset: 0, name: 'Name', status: true };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getBrandsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandsSuccess();
      const expectedAction = { type: Types.GET_BRANDS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandsSuccess({ data: [{ name: 'Name' }] });
      const expectedAction = { type: Types.GET_BRANDS_SUCCESS, data: [{ name: 'Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBrandsSuccess({ data: [{ name: 'Name' }], wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BRANDS_SUCCESS, data: [{ name: 'Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getBrandsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandsFailure();
      const expectedAction = { type: Types.GET_BRANDS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandsFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_BRANDS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBrandsFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BRANDS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setFilterOptions', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setFilterOptions({});
      const expectedAction = { type: Types.SET_FILTER_OPTIONS, selectedStatuses: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setFilterOptions({ selectedStatuses: [] });
      const expectedAction = { type: Types.SET_FILTER_OPTIONS, selectedStatuses: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.initPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.destroyPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
