import { Col, Modal, Row, Skeleton, Collapse } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, CloseCircleOutlined, MessageOutlined, FieldTimeOutlined, CompressOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import useStyles from '@app/pages/Sms/Detail/components/ConfirmationModal/styles';
import { domainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { targetAudienceStatisticsSelector, contentValidationSelector } from '@app/pages/Sms/Detail/redux/selectors';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';
import { STATISTIC_PROCESS } from '@app/pages/Sms/Detail/components/AudienceStatisticModal/constants';

const ConfirmationModal = ({ isModalVisible, onCancel, form, onOk }) => {
  const { t } = useTranslation('marketing');
  const draft = form?.getFieldValue('clientImportTemplate');

  const audienceStatistics = useSelector(targetAudienceStatisticsSelector.getData);
  const isAudienceStatisticsPending = useSelector(targetAudienceStatisticsSelector.getIsPending);
  const audienceStatisticsErr = useSelector(targetAudienceStatisticsSelector.getError);

  const contentValidator = useSelector(contentValidationSelector.getContent);

  let publishDisabled = false;
  const content = Object.entries(contentValidator ?? {}).map(([lang, validator]) => {
    if (validator.isPending || !validator.data?.isValid) {
      publishDisabled = true;
    }
    return <ContentValidator lang={lang} contentValidator={validator} />;
  });

  return (
    <Modal
      centered
      bodyStyle={{ paddingTop: '5px' }}
      title={t('PUBLISH_CAMPAIGN')}
      destroyOnClose
      visible={isModalVisible}
      onOk={onOk}
      okButtonProps={{ disabled: publishDisabled }}
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
      {/* Show all content||messages */}
      {content}
      <hr />
      <Row className="align-items-center">
        <Col lg={4}>
          <UsergroupDeleteOutlined style={{ fontSize: '28px' }} />
        </Col>
        <Col lg={18}>
          <Skeleton loading={isAudienceStatisticsPending} active className="bg-white pr-3" paragraph={{ rows: 1 }}>
            <p className="m-0">{t('TARGET_AUDIENCE')}:
              <span> {audienceStatistics?.totalClientCount === STATISTIC_PROCESS.IN_PROGRESS ? t('PREPEARING') : audienceStatistics?.totalClientCount} </span>
            </p>
            <p className="m-0">{draft?.type === DRAFT_TYPES.CSV && draft?.csv?.csvName}</p>
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
          <p className="m-0">{form?.getFieldValue('validDates')?.[0]?.format('YYYY-MM-DD HH:mm')}</p>
        </Col>
        <Col lg={2} className="text-right">
          <CheckCircleOutlined className="text-success" />
        </Col>
      </Row>
    </Modal>
  );
};

const { Panel } = Collapse;

const HighlightedParagraph = ({ paragraph, invalidChars = [] }) => {
  const classes = useStyles();
  return (
    <p className="m-0">
      {[...paragraph].map(letter => {
        const charPoint = letter.codePointAt();
        if (invalidChars?.includes(charPoint)) {
          return <span className={classes.vawe}>{letter}</span>;
        }
        return <span>{letter}</span>;
      })}
    </p>
  );
};

const ContentValidator = ({ lang, contentValidator }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketing');
  const content = contentValidator.data;

  return (
    <Collapse style={{ padding: '0px' }} className={classes.collapse} ghost>
      <Panel
        header={(
          <Row className="w-100 align-items-center">
            <Skeleton loading={contentValidator.isPending} active className="bg-white pr-3" paragraph={{ rows: 1 }}>
              <Col lg={4}>
                <MessageOutlined style={{ fontSize: '26px' }} />
              </Col>
              <Col lg={5}>
                <p className="m-0">{t('CONTENT')} (<b>{lang}</b>)</p>
              </Col>
              <Col lg={8} className="text-right">
                {content?.invalidChars?.map(charPoint => (
                  <h5 key={charPoint} className="text-danger d-inline mb-0 mx-1 ">{String.fromCodePoint(charPoint)}</h5>))}
              </Col>
              <Col lg={5} className="text-right">
                {content?.isValid && <p className="m-0">{contentValidator.data?.segmentCount} / {content?.evaluatedCharCount}</p>}
              </Col>
              <Col lg={2} className="text-right">
                {content?.isValid ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
              </Col>
            </Skeleton>
          </Row>
        )}
        key={lang}
        showArrow={false}
      >
        {content?.isValid ?
          <p className="mb-0">{contentValidator.message}</p> :
          // If content is not valid show invalid chars on full paragraph
          <HighlightedParagraph paragraph={contentValidator.message} invalidChars={content?.invalidChars} />}

      </Panel>
    </Collapse>

  );
};

export default memo(ConfirmationModal);
