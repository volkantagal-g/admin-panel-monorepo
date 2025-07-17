import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { KeyboardEventHandler } from 'react';
import * as Yup from 'yup';
import { EditOutlined, RetweetOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';

import { DiscountCodeActionType, UpdateDiscountCodesRequestPayload } from '@app/pages/DiscountCode/BulkEdit/types';
import { UpdateDiscountCodesRequest } from '@app/pages/DiscountCode/BulkEdit/slice';

// Constants
export const CSV_VALIDATION_SCHEMA = Yup.object().shape({ code: Yup.string().required() });
export const EXAMPLE_CSV = [{ code: 'AKBANK_CALISAN_150' }, { code: 'AKBANK_CALISAN_250' }, { code: 'AKBANK_CALISAN_350' }];

export const ButtonKeys = {
  update: 'UPDATE_CODES',
  reuse: 'REUSE_CODES',
};

export const ButtonIcons = {
  update: <EditOutlined />,
  reuse: <RetweetOutlined />,
};

export const AlertBoxes = {
  update: <UpdateAlert />,
  reuse: <ReuseAlert />,
};

// Atom components
export function UpdateAlert() {
  const { t } = useTranslation('editDiscountCodeComponent');

  return (
    <Alert
      message={t('UPDATE_TOOLTIP')}
      type="info"
      showIcon
    />
  );
}

export function ReuseAlert() {
  const { t } = useTranslation('editDiscountCodeComponent');

  return (
    <Alert
      message={t('REUSE_TOOLTIP')}
      type="warning"
      showIcon
    />
  );
}

export function ActionTypesDontOverlapAlert() {
  const { t } = useTranslation('editDiscountCodeComponent');

  return (
    <Alert type="error" showIcon message={t('ACTION_TYPES_DONT_OVERLAP')} />
  );
}

// Utilities
export const useDiscountCodeActionTypeOptions = (t: TFunction) => [
  {
    label: t('ASSIGN_SEGMENT'),
    value: DiscountCodeActionType.AssignSegment,
  },
  {
    label: t('DEFINE_PROMOTION'),
    value: DiscountCodeActionType.DefinePromotion,
  },
  {
    label: t('SHOW_ANNOUNCEMENT'),
    value: DiscountCodeActionType.ShowAnnouncement,
  },
];

export const InputNumberKeyPressHandler: KeyboardEventHandler = event => {
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
};

export function prepareUpdateDiscountCodesRequest(
  codes: string[],
  request: UpdateDiscountCodesRequest,
): UpdateDiscountCodesRequestPayload {
  const actionPayload: Partial<UpdateDiscountCodesRequestPayload> = {};

  if (request.actionType?.actionType === DiscountCodeActionType.AssignSegment && request.actionType.segment) {
    actionPayload.actionType = DiscountCodeActionType.AssignSegment;
    actionPayload.segment = request.actionType.segment;
  }
  else if (request.actionType?.actionType === DiscountCodeActionType.DefinePromotion && request.actionType.promotion) {
    actionPayload.actionType = DiscountCodeActionType.DefinePromotion;
    actionPayload.promo = request.actionType.promotion;
    actionPayload.isAlreadySold = request.actionType.isAlreadySold;
  }
  else if (request.actionType?.actionType === DiscountCodeActionType.ShowAnnouncement && request.actionType.announcement) {
    actionPayload.actionType = DiscountCodeActionType.ShowAnnouncement;
    actionPayload.announcement = request.actionType.announcement;
  }
  else {
    actionPayload.actionType = 0; // Don't set action type if not defined
  }

  return {
    codes,
    validFrom: request.validDates[0].toISOString(),
    validUntil: request.validDates[1].toISOString(),
    useLimit: request.useLimit,
    resetUsage: request.resetUsage,
    ...actionPayload,
  };
}
