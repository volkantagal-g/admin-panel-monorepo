import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { isNil, isEmpty } from 'lodash';
import { Form, Input, DatePicker, Select, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { convertConstantValuesToSelectOptions, getBase64 } from '@shared/utils/common';
import { getLocalDateFormat } from '@shared/utils/localization';
import { FileUploadWrapper } from '@shared/components/UI/Form';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { MIME_TYPE } from '@shared/shared/constants';

import { REASON_AREA_MAX_CHAR_LIMIT, ACTION_TYPES, ACTION_TYPE_VALUES } from '../../constants';
import { Creators } from '../../redux/actions';
import { validatePartialRestaurantsPaybackStatus, changePartialRestaurantsPaybackStatus } from '../../redux/selectors';
import useStyles from './styles';

const StatusForm = () => {
  const { t } = useTranslation('foodRestaurantPaybackStatus');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Can } = usePermission();

  const [files, setFiles] = useState([]);
  const [isFileValid, setIsFileValid] = useState(false);
  const [fileName, setFileName] = useState();
  const [shopCount, setShopCount] = useState();
  const [actionType, setActionType] = useState();

  const isChangeStatusPending = useSelector(changePartialRestaurantsPaybackStatus.getIsPending);
  const isValidateExcelPending = useSelector(validatePartialRestaurantsPaybackStatus.getIsPending);

  const handleSubmit = values => {
    const data = {
      fileName,
      status: actionType,
      reason: values.reason,
      pausedUntil: values.pausedUntil && moment(values.pausedUntil).format('YYYY-MM-DDTHH:mm:ss'),
    };
    dispatch(Creators.changePartialRestaurantsPaybackStatusRequest({ data }));
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: t('CONFIRM_MODAL_TITLE'),
      content: actionType === ACTION_TYPES.PAUSE
        ? t('foodRestaurantPaybackStatus:ACTIVE_PARTIAL_RESTAURANTS_CONFIRM_CONTENT', { shopCount })
        : t('foodRestaurantPaybackStatus:PAUSED_PARTIAL_RESTAURANTS_CONFIRM_CONTENT', { shopCount }),
      icon: null,
      okText: t('global:CONFIRM'),
      cancelText: t('global:CANCEL'),
      onOk: () => handleSubmit(values),
      centered: true,
    });
  };

  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  const handleValidationSuccess = ({ fileName: _fileName, shopCount: _shopCount }) => {
    setFileName(_fileName);
    setIsFileValid(true);
    setShopCount(_shopCount);
  };

  const handleValidationError = () => {
    setIsFileValid(false);
    setShopCount(null);
  };

  const handleFileChange = selectedFiles => {
    setFiles(selectedFiles.slice(-1));

    if (!isEmpty(selectedFiles)) {
      const [selectedFile] = selectedFiles.slice(-1);
      getBase64(selectedFile, base64File => {
        dispatch(Creators.validatePartialRestaurantsPaybackStatusRequest({
          file: { base64File, name: selectedFile.name },
          onSuccess: handleValidationSuccess,
          onError: handleValidationError,
        }));
      });
    }
  };

  const handleActionTypeChange = value => {
    setActionType(value);
  };

  const hasFileUploadError = () => {
    if (!isFileValid) return true;
    if (isEmpty(files)) return true;

    return false;
  };

  const getValidationHintLabel = () => {
    if (hasFileUploadError()) return null;
    return t('foodRestaurantPaybackStatus:UPLOAD_HINT_LABEL', { shopCount });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      labelAlign="left"
      onFinish={handleConfirmSubmit}
      colon={false}
      requiredMark={false}
    >
      <Form.Item rules={[{ required: true }]} label={t('PAUSE_RESUME')}>
        <Select
          value={actionType}
          onChange={handleActionTypeChange}
          options={convertConstantValuesToSelectOptions(ACTION_TYPE_VALUES)}
        />
      </Form.Item>
      {!isNil(actionType) && (
        <>
          <FileUploadWrapper
            inputKey="file"
            accept={`${MIME_TYPE.XLS}, ${MIME_TYPE.XLSX}`}
            onChangeCallback={handleFileChange}
            fileList={files}
            label={t('RESTAURANTS')}
            disabled={isValidateExcelPending}
            hasError={hasFileUploadError()}
            hintLabel={getValidationHintLabel()}
          />
          {actionType === ACTION_TYPES.PAUSE && (
          <Form.Item
            name="pausedUntil"
            label={t('PAUSE_UNTIL')}
          >
            <DatePicker
              disabledDate={disabledDate}
              format={getLocalDateFormat()}
            />
          </Form.Item>
          )}
          <Form.Item rules={[{ required: true }]} name="reason" label={t('REASON')}>
            <Input.TextArea showCount maxLength={REASON_AREA_MAX_CHAR_LIMIT} autoSize={{ minRows: 4 }} />
          </Form.Item>
          <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_PAYBACK_STATUS_CHANGE}>
            <Form.Item className={classes.submitButton}>
              <Button
                disabled={hasFileUploadError()}
                loading={isChangeStatusPending || isValidateExcelPending}
                type="primary"
                htmlType="submit"
              >
                {
                  actionType === ACTION_TYPES.PAUSE
                    ? t('foodRestaurantPaybackStatus:PAUSE')
                    : t('foodRestaurantPaybackStatus:RESUME')
                }
              </Button>
            </Form.Item>
          </Can>
        </>
      )}
    </Form>
  );
};

export default StatusForm;
