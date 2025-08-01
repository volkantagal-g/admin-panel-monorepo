import { Button, Col, Form, InputNumber, Modal, Row, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import AntSelect from '@shared/components/UI/AntSelect';
import { getPosBankOptions } from '../../utils';
import { cardInstallmentCountsSelector, cardUserTypeSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { alphabeticallySortByParam } from '@shared/utils/common';

const NewCommissionModal = ({ isLoading }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['installmentCommissionPage', 'global', 'error']);
  const dispatch = useDispatch();

  const cardInstallmentCountsPosBankList = useSelector(
    cardInstallmentCountsSelector.getPosBankList,
  );

  const cardInstallmentCountsAllInstallments = useSelector(
    cardInstallmentCountsSelector.getInstallments,
  );

  const cardInitialInstallmentCounts = useSelector(cardInstallmentCountsSelector.getInitialInstallments);
  const cardUserType = useSelector(cardUserTypeSelector.getCardUserType);

  const posBankOptions = getPosBankOptions(cardInstallmentCountsPosBankList);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ cardUserType, isEnabled: true });
  }, [form, open, cardUserType]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const checkPairExistInData = () => {
    const values = form.getFieldsValue();
    const bankObj = JSON.parse(values.bankValues);
    const { posBank } = bankObj;
    const { installment } = values;

    const pairIndex = cardInitialInstallmentCounts?.findIndex(item => {
      return item.installment === installment && item.posBank === posBank;
    });

    return pairIndex > -1;
  };

  const onFinish = values => {
    const isPairExist = checkPairExistInData();
    if (isPairExist) {
      dispatch(ToastCreators.error({ message: t('installmentCommissionPage:EXIST_DATA') }));
    }
    else {
      const bankObj = JSON.parse(values.bankValues);
      const newValues = { ...values, ...bankObj, id: uuidv4(), operation: 'added' };

      // removing temp data from request body
      delete newValues.bankValues;

      cardInstallmentCountsAllInstallments.splice(0, 0, newValues);
      dispatch(Creators.updateLocalInstallmentDataRequest({ updatedInstallments: cardInstallmentCountsAllInstallments }));
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <Button type="primary" className="mr-1" loading={isLoading} disabled={isLoading} onClick={showModal}>
        {t('ADD_NEW_COMMISSION')}
      </Button>
      <Modal
        title={t('ADD_NEW_COMMISSION')}
        visible={open}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="new-commission"
          form={form}
          labelCol={{ span: 8 }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label={t('CARD_USER_TYPE')}
            name="cardUserType"
            rules={[
              {
                required: true,
                message: t('error:REQUIRED'),
              },
            ]}
          >
            <AntSelect
              allowClear
              disabled
              className="w-100"
              placeholder={t('CARD_USER_TYPE')}
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: t('error:REQUIRED'),
              },
            ]}
            label={t('POS_BANK')}
            name="bankValues"
          >
            <AntSelect
              allowClear
              className="w-100"
              optionFilterProp="label"
              placeholder={t('POS_BANK')}
              options={alphabeticallySortByParam(
                posBankOptions,
              )}
              showSearch
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: t('error:REQUIRED'),
              },
            ]}
            label={t('INSTALLMENT_COUNT')}
            name="installment"
          >
            <InputNumber
              className="w-100"
              placeholder={t('INSTALLMENT_COUNT')}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: t('error:REQUIRED'),
              },
            ]}
            label={`${t('TRANSACTION_COMMISSION')} (%)`}
            name="commission"
          >
            <InputNumber
              className="w-100"
              placeholder={t('TRANSACTION_COMMISSION')}
            />
          </Form.Item>

          <Form.Item valuePropName="checked" label={t('STATUS')} name="isEnabled">
            <Switch />
          </Form.Item>

          <Row>
            <Col span={24} className="text-right">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('global:SUBMIT')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>

  );
};

export default NewCommissionModal;
