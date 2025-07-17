import moment from 'moment/moment';

import { ActionTypePayload } from '@app/pages/DiscountCode/BulkEdit/select';

export enum DiscountCodeActionType {
  AssignSegment = 1,
  DefinePromotion = 2,
  ShowAnnouncement = 3,
}

export type GetDiscountCodesActionTypesResponse = {
  discountCode: string;
  actionType: DiscountCodeActionType | 0;
}

export type UpdateDiscountCodesFormType = {
  validDates: [moment.Moment, moment.Moment];
  useLimit: number;
  actionType: ActionTypePayload;
}

export type UpdateDiscountCodesResponse = {
  message: string;
}

export type UpdateDiscountCodesRequestPayload = {
  codes: string[];
  validFrom: string;
  validUntil: string;
  useLimit: number;
  actionType?: GetDiscountCodesActionTypesResponse['actionType'];
  promo?: string;
  announcement?: string;
  segment?: number;
  isAlreadySold?: boolean;
  resetUsage: boolean;
}

export const DISCOUNT_CODE_MODAL_TYPES = {
  UPDATE: 'update',
  REUSE: 'reuse',
};

export type DiscountCodeModalType = (typeof DISCOUNT_CODE_MODAL_TYPES)[keyof typeof DISCOUNT_CODE_MODAL_TYPES];
