import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Modal, Button, Row, Col, Radio } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { currency } from '@shared/utils/common';
import FileUploader from '@shared/components/UI/FileUploader';
import { MIME_TYPE } from '@shared/shared/constants';

import { Creators } from '@app/pages/ShopExternalTransaction/redux/actions';
import { bulkExternalTransactionExcel } from '@app/pages/ShopExternalTransaction/redux/selectors';

import useStyles from './styles';
import { EXCEL_TEMPLATE_URL, DEFERRED_PAYMENT_DATE_OPTIONS, DEFERRED_PAYMENT_DATE_TYPES } from './constants';
import { getLangKey } from '@shared/i18n';

const TransactionModal = ({
  title,
  warningMessage,
  confirmationModalTitle,
  getConfirmationModalContent,
  buttonText,
  manualType,
}) => {
  const { t } = useTranslation('localsShopExternalTransaction');
  const dispatch = useDispatch();
  const selectedDeferredPaymentDateOptionRef = useRef(DEFERRED_PAYMENT_DATE_TYPES.NextPaymentDate);

  const isPending = useSelector(bulkExternalTransactionExcel.getIsPending);

  const classes = useStyles({ isPending });

  const handleConfirmSubmit = fileName => {
    const selectedDeferredPaymentDateOption = selectedDeferredPaymentDateOptionRef.current;
    dispatch(Creators.importBulkExternalTransactionExcelRequest({ fileName, manualType, selectedDeferredPaymentDateOption }));

    selectedDeferredPaymentDateOptionRef.current = DEFERRED_PAYMENT_DATE_TYPES.NextPaymentDate;
  };

  const handlePaymentDateChange = ({ target: { value } }) => {
    selectedDeferredPaymentDateOptionRef.current = value;
  };

  const openConfirmModal = ({ fileName, amount, shopCount }) => {
    const confirmationModalTextContent = getConfirmationModalContent({
      shopCount,
      currency: currency(),
      amount,
    });

    Modal.confirm({
      title: confirmationModalTitle,
      content: (
        <Row gutter={[0, 8]}>
          <Col>
            {confirmationModalTextContent}
          </Col>
          <Col>
            <Radio.Group className={classes.radioGroup} onChange={handlePaymentDateChange} defaultValue={selectedDeferredPaymentDateOptionRef.current}>
              {DEFERRED_PAYMENT_DATE_OPTIONS?.map(option => (
                <>
                  <Radio key={option.value} value={option.value}>{option?.label[getLangKey()]}</Radio>
                  <span className={classes.radioGroupInfoText}>{option?.infoText}</span>
                </>
              ))}
            </Radio.Group>
          </Col>
        </Row>
      ),
      icon: null,
      okText: t('CONFIRM'),
      cancelText: t('CANCEL'),
      onOk: () => handleConfirmSubmit(fileName),
      centered: true,
    });
  };

  const handleSubmit = (base64File, file) => {
    dispatch(Creators.validateBulkExternalTransactionExcelRequest({
      file: { base64File, name: file.name },
      manualType,
      onSuccess: openConfirmModal,
    }));
  };

  return (
    <div className={classes.card}>
      <Button className={classes.button} loading={isPending} type="primary">
        <FileUploader
          okText={t('global:CREATE')}
          supportedFileTypes={[MIME_TYPE.XLS, MIME_TYPE.XLSX]}
          modalTitle={title}
          buttonText={(
            <div className={classes.buttonText}>
              {buttonText}
            </div>
          )}
          onOkayClick={handleSubmit}
          warningText={(
            <a href={EXCEL_TEMPLATE_URL} download>
              <div className={classes.downloadLink}>
                <span>{t('BULK_TRANSACTION.DOWNLOAD_TEMPLATE')}</span>
                <CloudDownloadOutlined className={classes.downloadIcon} />
              </div>
            </a>
          )}
        />
      </Button>
      <Alert className={classes.alert} message={warningMessage} type="warning" showIcon />
    </div>
  );
};

export default TransactionModal;
