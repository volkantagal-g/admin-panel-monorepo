import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Row, Col, Popconfirm, Typography, Alert } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { documentTypeSelector, uploadAgreementsSelector } from '../../../redux/selectors';
import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const AddAgreementModal = ({
  isVisible,
  isPendingConfirm,
  isUploadPending,
  onConfirm,
  onCancel,
  documents,
  isPopconfirmVisible,
  showPopconfirm,
  hidePopconfirm,
}) => {
  // constants
  const { Paragraph } = Typography;
  const dispatch = useDispatch();
  const { t } = useTranslation(['customerAgreementPage', 'button', 'global']);
  const translatePrefix = 'LATEST_AGREEMENT.ADD_AGREEMENT_MODAL';
  // selectors
  const countryLanguages = getSelectedCountryLanguages();
  const selectedAgreementType = useSelector(documentTypeSelector.getSelected);
  const agreementDocs = useSelector(uploadAgreementsSelector.getFiles);
  // states
  const [isValidAgreementDocs, setIsValidAgreementDocs] = useState(false);
  // managing side effects
  useEffect(() => {
    const isFulfilledWithNewVersions = file => {
      const { uploadDetails } = file;
      const { content } = uploadDetails;
      return !isEmpty(content);
    };
    const isAllDocsPlaced = agreementDocs.every(isFulfilledWithNewVersions);
    setIsValidAgreementDocs(isAllDocsPlaced);
  }, [agreementDocs]);

  const footerActions = [
    <Button key="back" type="danger" onClick={() => onCancel()}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      key="submit"
      title={t(`${translatePrefix}.CONFIRM_TEXT`)}
      visible={isPopconfirmVisible}
      onConfirm={onConfirm}
      okButtonProps={{ loading: isPendingConfirm }}
      onCancel={hidePopconfirm}
      okText={t('global:YES')}
      cancelText={t('global:NO')}
    >
      <Button
        key="save"
        type="success"
        disabled={!isValidAgreementDocs}
        onClick={showPopconfirm}
      >
        {t('button:CONFIRM')}
      </Button>
    </Popconfirm>,
  ];

  return (
    <Modal
      title={t(`${translatePrefix}.TITLE`)}
      visible={isVisible}
      onCancel={onCancel}
      footer={footerActions}
    >
      <Row>
        <Col span={24}>
          <Paragraph>
            <Alert
              message={t(`${translatePrefix}.UPLOAD_MESSAGE`)}
              type="info"
              showIcon
            />
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AntTableV2
            data={documents}
            columns={tableColumns({ t, dispatch, isUploadPending, selectedAgreementType, countryLanguages })}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddAgreementModal;
