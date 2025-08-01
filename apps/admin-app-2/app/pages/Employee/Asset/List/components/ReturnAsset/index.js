import { useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import moment from 'moment';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { getReturnEmployeeAssetSelector } from '../../redux/selectors';
// import { TODAY_START } from '@app/pages/Employee/constants';
import useStyles from '../../styles';
import { ASSET_DEVICE_STATUS_OPTIONS } from '@app/pages/Asset/constants';

const { Item } = Form;

const isFormValid = async form => form.getFieldsError().some(({ errors }) => errors.length);

const ReturnAsset = ({ _id, asset, returnDate, returnNote }) => {
  const { t } = useTranslation(['assetPage', 'employeePage', 'button', 'error']);
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const classes = useStyles();
  const { id: employeeId } = useParams();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const loading = useSelector(getReturnEmployeeAssetSelector.getIsPending);

  const handleSubmit = values => {
    dispatch(Creators.returnEmployeeAssetRequest({ employeeId, assetId: asset, assignmentId: _id, ...values }));
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    formRef.current?.resetFields();
    setVisible(false);
  };

  const handleOnOk = async () => {
    formRef?.current?.submit();
    if (await isFormValid(form)) {
      handleCloseModal();
    }
  };

  return (
    <Can permKey={permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST_COMPONENT_MANAGE_ASSETS}>
      <Button size="small" onClick={showModal}>
        {t('employeePage:BUTTONS.RETURN_ASSET')}
      </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        ref={formRef}
        initialValues={{
          returnNote,
          returnDate,
        }}
      >
        <Modal
          centered
          title={t('employeePage:BUTTONS.RETURN_ASSET')}
          visible={visible}
          onOk={handleOnOk}
          okButtonProps={{ loading }}
          okText={t('button:SAVE')}
          cancelText={t('button:CANCEL')}
          onCancel={handleCloseModal}
          closable={!loading}
        >
          <Item
            name="returnNote"
            label={t('assetPage:RETURN_NOTE')}
            required={false}
            colon={false}
            className={classes.formItem}
          >
            <Input autoComplete="off" disabled={loading} />
          </Item>
          <Item
            name="returnDate"
            label={t('assetPage:RETURN_DATE')}
            required={false}
            colon={false}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
            className={classes.formItem}
          >
            <DatePicker className={classes.datePickerWidth} allowClear={false} disabled={loading} />
          </Item>
          <Item
            name={['returnDeviceStatus']}
            label={t('DEVICE_STATUS')}
            required={false}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
            className={classes.formItem}
          >
            <Select
              showSearch
              filterOption
              optionFilterProp="label"
              options={ASSET_DEVICE_STATUS_OPTIONS(t)}
              placeholder={t('DEVICE_STATUS')}
            />
          </Item>
        </Modal>
      </Form>
    </Can>
  );
};

export default ReturnAsset;
