/* eslint-disable */
import { Creators, Types } from '@app/pages/Brand/Detail/redux/actions';

describe('Brand/Detail', () => {
  describe('action-creator #getBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandRequest();
      const expectedAction = { type: Types.GET_BRAND_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandRequest({ id: '123' });
      const expectedAction = { type: Types.GET_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBrandRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getBrandSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandSuccess();
      const expectedAction = { type: Types.GET_BRAND_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandSuccess({ data: { name: 'BrandName' } });
      const expectedAction = { type: Types.GET_BRAND_SUCCESS, data: { name: 'BrandName' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBrandSuccess({ data: { name: 'BrandName' }, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BRAND_SUCCESS, data: { name: 'BrandName' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBrandFailure();
      const expectedAction = { type: Types.GET_BRAND_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBrandFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBrandFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBrandRequest();
      const expectedAction = { type: Types.UPDATE_BRAND_REQUEST, id: null, updateData: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBrandRequest({ id: '123', updateData: {} });
      const expectedAction = { type: Types.UPDATE_BRAND_REQUEST, id: '123', updateData: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBrandRequest({ id: '123', updateData: {}, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BRAND_REQUEST, id: '123', updateData: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBrandSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBrandSuccess();
      const expectedAction = { type: Types.UPDATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateBrandSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBrandFailure();
      const expectedAction = { type: Types.UPDATE_BRAND_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBrandFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBrandFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateBrandRequest();
      const expectedAction = { type: Types.ACTIVATE_BRAND_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.activateBrandRequest({ id: '123' });
      const expectedAction = { type: Types.ACTIVATE_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.activateBrandRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.ACTIVATE_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateBrandSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateBrandSuccess();
      const expectedAction = { type: Types.ACTIVATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.activateBrandSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.ACTIVATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateBrandFailure();
      const expectedAction = { type: Types.ACTIVATE_BRAND_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.activateBrandFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.ACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.activateBrandFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.ACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateBrandRequest();
      const expectedAction = { type: Types.DEACTIVATE_BRAND_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateBrandRequest({ id: '123' });
      const expectedAction = { type: Types.DEACTIVATE_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateBrandRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DEACTIVATE_BRAND_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateBrandSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateBrandSuccess();
      const expectedAction = { type: Types.DEACTIVATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.deactivateBrandSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DEACTIVATE_BRAND_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateBrandFailure();
      const expectedAction = { type: Types.DEACTIVATE_BRAND_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateBrandFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.DEACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateBrandFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.DEACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') };
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
