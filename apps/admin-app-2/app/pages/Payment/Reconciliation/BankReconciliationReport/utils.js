import moment from 'moment';
import _ from 'lodash';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { isCurrentCountryTurkey } from '@shared/utils/common';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

export const isSelectedLanguageTR = getSelectedLanguage() === 'tr';
export const momentLocalType = isSelectedLanguageTR ? 'tr' : 'en';

export const untilTodayRange = current => {
  return current && current.valueOf() > moment();
};

export const isLocationTurkey = isCurrentCountryTurkey();

export const handleTranslateData = (reconciliationData, t) => {
  let translatedArr = [];

  translatedArr = reconciliationData?.map(report => {
    const {
      primaryRefundStatus,
      additionalRefundStatus,
      status,
      orderStatus,
      isRefundable,
      checkDate,
      checkoutDate,
      domainType,
    } = report;
    _.set(
      report,
      'primaryRefundStatus',
      primaryRefundStatus &&
        t(
          `bankReconciliationReportPage:REFUND_STATUS_TYPES.${primaryRefundStatus}`,
        ),
    );
    _.set(
      report,
      'additionalRefundStatus',
      additionalRefundStatus &&
        t(
          `bankReconciliationReportPage:REFUND_STATUS_TYPES.${additionalRefundStatus}`,
        ),
    );
    _.set(
      report,
      'status',
      status && t(`global:POS_REPORT_ORDER_STATUS.${status}`),
    );
    _.set(
      report,
      'domainType',
      domainType && t(`bankReconciliationReportPage:DOMAINS.${domainType}`),
    );
    _.set(
      report,
      'orderStatus',
      t(`global:POS_REPORT_ORDER_STATUS.${orderStatus}`),
    );
    _.set(report, 'isRefundable', isRefundable.toString());
    _.set(report, 'checkDate', formatUTCDate(checkDate, DEFAULT_TIME_FORMAT));
    _.set(
      report,
      'checkoutDate',
      formatUTCDate(checkoutDate, DEFAULT_TIME_FORMAT),
    );

    return report;
  });
  return translatedArr;
};

export const handleTranslateDriveData = (reconciliationData, t) => {
  let translatedArr = [];

  translatedArr = reconciliationData?.map(report => {
    const {
      checkDate,
      transactionBehaviourType,
      refundAmountFromSource,
      purchaseAmountFromSource,
      purchaseAmountFromDomain,
      transactionDate,
      reasonsForDisagreement,
      isReconciled,
    } = report;
    const purchaseAmountFromSourceCondition =
      transactionBehaviourType === 'Refund'
        ? refundAmountFromSource
        : purchaseAmountFromSource;
    const purchaseAmountFromDomainCondition =
      transactionBehaviourType === 'Refund'
        ? refundAmountFromSource
        : purchaseAmountFromDomain;

    _.set(
      report,
      'transactionBehaviourType',
      transactionBehaviourType &&
        t(
          `bankReconciliationReportPage:TRANSACTION_BEHAVIOUR_TYPE_OPTIONS.${transactionBehaviourType}`,
        ),
    );
    _.set(
      report,
      'purchaseAmountFromSource',
      purchaseAmountFromSourceCondition,
    );
    _.set(
      report,
      'purchaseAmountFromDomain',
      purchaseAmountFromDomainCondition,
    );

    _.set(
      report,
      'transactionDate',
      formatUTCDate(transactionDate, DEFAULT_TIME_FORMAT),
    );
    _.set(report, 'checkDate', formatUTCDate(checkDate, DEFAULT_TIME_FORMAT));
    _.set(
      report,
      'isReconciled',
      isReconciled.toString(),
    );
    _.set(
      report,
      'reasonsForDisagreement',
      reasonsForDisagreement &&
        t(
          `bankReconciliationReportPage:DISAGREEMENT_NOTES.${reasonsForDisagreement}`,
        ),
    );
    return report;
  });
  return translatedArr;
};
