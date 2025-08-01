import { Button, Col, Table, Modal, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { cardInstallmentCountsSelector } from '../../redux/selectors';
import useStyles from '../Table/styles';
import { columns } from './config';
import { applyChangesToInitialValue, prepareRequestBody } from './helpers';
import { Creators } from '../../redux/actions';

const ModalFoot = ({ t, handleSubmit, handleCancel, isPending }) => {
  return (
    <Row justify="end">
      <Col className="mr-2">
        <Button disabled={isPending} type="default" onClick={() => handleCancel()}>
          {t('global:CANCEL')}
        </Button>
      </Col>
      <Col>
        <Button loading={isPending} disabled={isPending} type="primary" onClick={() => handleSubmit()}>
          {t('global:SUBMIT')}
        </Button>
      </Col>
    </Row>
  );
};

const ConfirmationModal = ({ isLoading }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['installmentCommissionPage']);
  const dispatch = useDispatch();

  const cardInstallmentCountsModifiedData = useSelector(cardInstallmentCountsSelector.getModifiedInstallments);
  const cardInstallCountsVersion = useSelector(cardInstallmentCountsSelector.getVersion);
  const cardInstallCountsCardUserType = useSelector(cardInstallmentCountsSelector.getCardUserType);
  const cardInitialInstallmentCounts = useSelector(cardInstallmentCountsSelector.getInitialInstallments);

  const isApplyButtonDisable = cardInstallmentCountsModifiedData?.length < 1 || isLoading;
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const initialCountsWithChanges = applyChangesToInitialValue(cardInstallmentCountsModifiedData, cardInitialInstallmentCounts);
    const requestBody = prepareRequestBody(cardInstallCountsVersion, cardInstallCountsCardUserType, initialCountsWithChanges);
    dispatch(Creators.updateCardInstallmentCountsRequest({ ...requestBody }));

    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        loading={isLoading}
        disabled={isApplyButtonDisable}
        onClick={showModal}
      >
        {t('APPLY_CHANGES')}
      </Button>
      <Modal
        title={t('APPLY_CHANGES')}
        visible={open}
        onCancel={handleCancel}
        width={1000}
        footer={<ModalFoot t={t} handleCancel={handleCancel} handleSubmit={handleSubmit} isPending={isLoading} />}
      >
        <p>{t('APPLY_CHANGES_DESCRIPTION')}</p>
        <Row>
          <Col className={classes.scrollArea} span={24}>
            <Table
              // 3 different operation colors for table row; added - deleted - updated
              rowClassName={record => record.operation && classes[record.operation]}
              bordered
              dataSource={cardInstallmentCountsModifiedData}
              columns={columns(t)}
              rowKey={record => record.id}
              pagination={{ position: ['none', 'none'] }}
            />
          </Col>
        </Row>

      </Modal>
    </>

  );
};

export default ConfirmationModal;
