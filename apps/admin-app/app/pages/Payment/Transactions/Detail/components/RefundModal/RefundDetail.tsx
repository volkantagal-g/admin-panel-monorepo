import { Col, Row, Select, Space, Typography, Checkbox, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { refundDetailForm, refundTable } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { amountCurrencyFormat, handleRefundReasonsTranslate } from '@app/pages/Payment/utils';
import { CurrencyType } from '.';

const { Text } = Typography;

type RefundDetailProps = {
  currency : CurrencyType
}

const RefundDetail = ({ currency }: RefundDetailProps) => {
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const dispatch = useDispatch();
  const refundTableData = useSelector(refundTable.getData);
  const refundDetailFormData = useSelector(refundDetailForm.getData);
  const refundDetailFormRefundReason = useSelector(refundDetailForm.getRefundReason);
  const refundDetailFormOtherRefundReason = useSelector(refundDetailForm.getOtherRefundReason);

  const calculateTotalRefund = () => {
    const totalRefundAmount = refundTableData.reduce(
      (accumulator:number, currentValue:{ amount: number }) => accumulator + currentValue.amount,
      0,
    );
    return amountCurrencyFormat(totalRefundAmount, currency);
  };

  const handleRefundReasonChange = (value: string) => {
    dispatch(Creators.refundDetailForm({ ...refundDetailFormData, refundReason: value, otherRefundReason: '' }));
  };

  const handleOtherRefundReason = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(Creators.refundDetailForm({ ...refundDetailFormData, otherRefundReason: e.target.value }));
  };

  const handleConfirmCheckBox = (e: CheckboxChangeEvent) => {
    dispatch(Creators.refundDetailForm({ ...refundDetailFormData, isConfirmed: e.target.checked }));
  };
  return (
    <Row className="d-flex">
      <Col md={12} />
      <Col md={12}>
        <Space direction="vertical" size="large" className="w-100">
          <Row>
            <Col md={6}>
              <Text className="pr-4" type="secondary">
                {t('paymentTransactionPage:TOTAL_REFUND')}
              </Text>
            </Col>
            <Col>
              <Text> {calculateTotalRefund()} </Text>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text className="pr-4" type="secondary">
                {t('paymentTransactionPage:REFUND_REASON')}
              </Text>
            </Col>
            <Col md={10}>
              <Select
                size="small"
                onChange={handleRefundReasonChange}
                value={refundDetailFormRefundReason}
                options={handleRefundReasonsTranslate(t)}
                className="w-100"
              />
              {refundDetailFormRefundReason === 'Other' && (
              <Input
                value={refundDetailFormOtherRefundReason}
                onChange={handleOtherRefundReason}
                maxLength={50}
                size="small"
                className="mt-2"
                placeholder="Please specify"
              />
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Checkbox onChange={e => handleConfirmCheckBox(e)} className="pr-4" />
            </Col>
            <Col>
              <Text>
                {t('paymentTransactionPage:CONFIRM_TEXT')}
              </Text>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  );
};

export default RefundDetail;
