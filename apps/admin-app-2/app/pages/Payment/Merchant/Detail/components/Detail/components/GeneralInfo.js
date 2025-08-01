import {
  Col,
  Collapse,
  Form,
  Input,
  Row,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { prepareUpdateMerchantPayload } from '../formHelpers';
import { merchantDetailSelector, updateMerchantSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import CardFooter from '../../CardFooter';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

const { Panel } = Collapse;

const GeneralInfo = ({ initialGeneralInfo, t, disableEditAction }) => {
  const { id, key, createdAt, updatedAt } = initialGeneralInfo;
  const [editActive, setEditActive] = useState(false);
  const dispatch = useDispatch();
  const merchantDetailSelectorData = useSelector(
    merchantDetailSelector.getData,
  );
  const updateMerchantSelectorIsPending = useSelector(updateMerchantSelector.getIsPending);

  const [form] = Form.useForm();

  const handleSubmitForm = () => {
    const { key: updatedKey } = form.getFieldsValue();

    merchantDetailSelectorData.key = updatedKey; // only "key" field changeable in this form
    const updateMerchantPayload = prepareUpdateMerchantPayload(merchantDetailSelectorData);
    dispatch(Creators.updateMerchantRequest(updateMerchantPayload));
    setEditActive(false);
  };

  const handleCancel = () => {
    setEditActive(false);
    form.resetFields();
  };

  return (
    <Collapse defaultActiveKey="1">
      <Panel
        header={<div>{t('paymentMerchantPage:GENERAL_INFO')}</div>}
        key="1"
      >
        <Form
          form={form}
          name="general-info-form"
          initialValues={{
            id,
            key,
            createdAt: moment(createdAt).format(DEFAULT_TIME_FORMAT),
            updatedAt: moment(updatedAt).format(DEFAULT_TIME_FORMAT),
          }}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="ID" name="id">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Key" name="key">
                <Input rules={[{ required: true, message: t('error:REQUIRED') }]} disabled={!editActive} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item data-testid="general-info-createdAt" label={t('global:CREATED_AT')} name="createdAt">
                <Input disabled />
              </Form.Item>
              <Form.Item data-testid="general-info-updatedAt" label={t('global:UPDATED_AT')} name="updatedAt">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          {
            !disableEditAction && (
              <CardFooter
                loading={updateMerchantSelectorIsPending}
                editActive={editActive}
                setEditActive={setEditActive}
                handleSubmitForm={handleSubmitForm}
                handleCancel={handleCancel}
              />
            )
          }

        </Form>
      </Panel>
    </Collapse>
  );
};

GeneralInfo.prototype = {
  initialGeneralInfo: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  t: PropTypes.func,
  disableEditAction: PropTypes.bool,
};
GeneralInfo.defaultProps = {
  initialGeneralInfo: {
    id: '',
    key: '',
    createdAt: '',
    updatedAt: '',
  },
  t: () => {},
  disableEditAction: false,
};

export default GeneralInfo;
