import { Col, Modal, Row, Skeleton } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, CloseCircleOutlined, FieldTimeOutlined, CompressOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { domainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { targetAudienceStatisticsSelector } from '@app/pages/Email/Detail/redux/selectors';
import { STATISTIC_PROCESS } from '@app/pages/Email/Detail/components/AudienceStatisticModal/constants';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

const ConfirmationModal = ({ isModalVisible, onCancel, form, onOk }) => {
  const { t } = useTranslation('marketing');
  const draft = form?.getFieldValue('clientImportTemplate');
  const audienceStatistics = useSelector(targetAudienceStatisticsSelector.getData);
  const isAudienceStatisticsPending = useSelector(targetAudienceStatisticsSelector.getIsPending);
  const audienceStatisticsErr = useSelector(targetAudienceStatisticsSelector.getError);

  return (
    <Modal
      centered
      bodyStyle={{ paddingTop: '5px' }}
      title={t('PUBLISH_CAMPAIGN')}
      destroyOnClose
      visible={isModalVisible}
      onOk={onOk}
      width={400}
      okText={t('PUBLISH')}
      onCancel={onCancel}
    >
      <Row>
        <Col lg={24}>
          <p className="mb-4">{t('PUBLISH_TEXT')}</p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col lg={4}>
          <CompressOutlined style={{ fontSize: '28px' }} />
        </Col>
        <Col lg={18}>
          <p className="m-0">{t('TARGET_SERVICE')}</p>
          <p className="m-0">{domainTypes[form?.getFieldValue('domainType')][[getLangKey()]]} </p>
        </Col>
        <Col lg={2} className="text-right">
          <CheckCircleOutlined className="text-success" />
        </Col>
      </Row>
      <hr />
      <Row className="align-items-center">
        <Col lg={4}>
          <UsergroupDeleteOutlined style={{ fontSize: '28px' }} />
        </Col>
        <Col lg={18}>
          <Skeleton loading={isAudienceStatisticsPending} active className="bg-white pr-3" paragraph={{ rows: 1 }}>
            <p className="m-0">{t('TARGET_AUDIENCE')}:
              <span>{audienceStatistics?.totalClientCount === STATISTIC_PROCESS.IN_PROGRESS ? t('PREPEARING') : audienceStatistics?.totalClientCount}</span>
            </p>
            <p className="m-0">{draft?.type === DRAFT_TYPES.CSV && draft?.csv?.csvName} </p>
          </Skeleton>
        </Col>
        <Col lg={2} className="text-right">
          {(!audienceStatisticsErr && !isAudienceStatisticsPending) && <CheckCircleOutlined className="text-success" />}
          {audienceStatisticsErr && <CloseCircleOutlined className="text-danger" />}
        </Col>
      </Row>
      <hr />
      <Row className="align-items-center">
        <Col lg={4}>
          <FieldTimeOutlined style={{ fontSize: '28px' }} />
        </Col>
        <Col lg={18}>
          <p className="m-0">{t('START_DATE')}</p>
          <p className="m-0">{form?.getFieldValue('validDates')?.[0]?.format('YYYY.MM.DD HH:mm')}</p>
        </Col>
        <Col lg={2} className="text-right">
          <CheckCircleOutlined className="text-success" />
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(ConfirmationModal);
