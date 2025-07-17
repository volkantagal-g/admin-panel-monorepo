import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form, Divider, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { find, get, values as objToArr, sumBy } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { currency } from '@shared/utils/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import {
  getMainReasonsSelector,
  getSubReasonsSelector,
  productsSelector,
} from '@app/pages/GetirFood/OrderDetail/redux/selectors';

import {
  channelOptions,
  refundSourceOptions,
  FULL_REFUND,
  getExpiryDate,
} from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/ComplaintRefundModal/formHelper';
import { tableColumns } from './config';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const ConfirmPhase = ({ values, hasComplaint, refundType, hasPromo }) => {
  const { t } = useTranslation('foodOrderPage');

  const mainReasons = useSelector(getMainReasonsSelector.getData);
  const { subReasons } = useSelector(getSubReasonsSelector.getData);

  const { channel, mainReason, subReason } = values;

  const channelOptionText = get(values, 'channelOptionText');
  const subReasonText = get(values, 'subReasonText');

  const products = useSelector(productsSelector.getData);
  const selectedCountry = useSelector(getSelectedCountryV2) || null;
  const tableData = useMemo(
    () => objToArr(values?.refundedProducts)
      .map((p, idx) => ({
        ...p,
        ...(p.refundType === FULL_REFUND ? { amount: products?.[idx]?.discountedPriceWithOption } : {}),
        name: `${products?.[idx]?.name?.[getLangKey()]} - ${currency()}${products?.[idx]?.discountedPriceWithOption}`,
      }))
      .filter(p => p.checked),
    [products, values?.refundedProducts],
  );

  return (
    <>
      {channel && (
      <Form.Item label={t('COMPLAINT_REFUND_MODAL.CHANNEL')}>
        <Input disabled value={get(find(channelOptions, { _id: channel }), ['name', getLangKey()])} />
      </Form.Item>
      )}
      {channelOptionText && (
        <Form.Item label={t('COMPLAINT_REFUND_MODAL.CHANNEL_TEXT')}>
          <Input disabled value={channelOptionText} />
        </Form.Item>
      )}
      {mainReason && (
      <Form.Item label={t('COMPLAINT_REFUND_MODAL.MAIN_REASON')}>
        <Input disabled value={get(find(mainReasons, { _id: mainReason }), ['name', getLangKey()])} />
      </Form.Item>
      )}
      {subReason && (
      <Form.Item label={t('COMPLAINT_REFUND_MODAL.SUB_REASON')}>
        <Input disabled value={get(find(subReasons, { _id: subReason }), ['name', getLangKey()])} />
      </Form.Item>
      )}
      {subReasonText && (
        <Form.Item label={t('COMPLAINT_REFUND_MODAL.SUB_REASON_TEXT')}>
          <Input disabled value={subReasonText} />
        </Form.Item>
      )}
      {hasComplaint && (
        <>
          <Divider />
          <Form.Item label={t('COMPLAINT_REFUND_MODAL.COMPLAINT_DETAIL')}>
            <Input.TextArea disabled value={values?.complaintDescription} />
          </Form.Item>
        </>
      )}
      {refundType && (
        <>
          <Divider />
          <Form.Item label={t('COMPLAINT_REFUND_MODAL.REFUND_SOURCE')}>
            <Input disabled value={get(refundSourceOptions, values?.refundSource)} />
          </Form.Item>
          <Form.Item label={t('COMPLAINT_REFUND_MODAL.REFUND_REASON')}>
            <Input.TextArea disabled value={values?.refundDescription} />
          </Form.Item>
          <Divider />
          <AntTableV2
            data={tableData}
            columns={tableColumns(t)}
          />
          <b>
            {t('COMPLAINT_REFUND_MODAL.CONFIRM_REFUND_MESSAGE', {
              total: sumBy(tableData, 'amount'),
              currency: currency(),
            })}
          </b>
        </>
      )}
      {hasPromo && (
        <>
          {subReason && <Divider />}
          <Form.Item labelCol={{ span: 12 }} label={t('PROMOTION_MODAL.COUNTRY_INFO')}>
            <Input
              disabled
              value={selectedCountry.name[getLangKey()]}
              addonBefore={selectedCountry.flag}
            />
          </Form.Item>
          <Form.Item labelCol={{ span: 12 }} label={t('PROMOTION_MODAL.DISCOUNT_AMOUNT')}>
            <Input
              disabled
              value={get(values, ['promo', 'discountAmount'])}
              addonBefore={currency()}
            />
          </Form.Item>
          <Form.Item labelCol={{ span: 12 }} label={t('PROMOTION_MODAL.VALID_DAY_AMOUNT_INFO')}>
            <Input
              disabled
              value={`${get(values, ['promo', 'validDayAmount'], 0)} ${t(
                'PROMOTION_MODAL.VALID_DAY_AMOUNT_SUFFIX',
              )} (${getExpiryDate(
                get(values, ['promo', 'validDayAmount'], 0),
              )})`}
            />
          </Form.Item>
          <Form.Item initialValue={false}>
            <Checkbox disabled>{t('PROMOTION_MODAL.NO_DELIVERY_FEE')}</Checkbox>
          </Form.Item>
          <Form.Item initialValue={false}>
            <Checkbox disabled>
              {t('PROMOTION_MODAL.NO_MINIMUM_BASKET_SIZE')}
            </Checkbox>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default ConfirmPhase;
