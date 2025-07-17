import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Collapse, Space, Spin } from 'antd';

import { getLangKey } from '@shared/i18n';
import { PersonalInfoCard, ChangeDetailsCard, RejectNotesSection, Title } from '@app/pages/Person/Request/Detail/components';
import { informationEditRequestDetailSelector } from '@app/pages/Person/Request/Detail/redux/selectors';
import { personInformationChangeStatuses } from '@shared/shared/constantValues';
import useStyles from './styles';

const { Panel } = Collapse;

const InformationEditRequestDetailBody = () => {
  const classes = useStyles();
  const { t } = useTranslation('personRequestPage');

  const {
    _id,
    franchiseName,
    personName,
    status,
    isWorkerCourier,
    isWorkerPicker,
    changeDetails,
    note,
  } = useSelector(informationEditRequestDetailSelector.getData);
  const isPending = useSelector(informationEditRequestDetailSelector.getIsPending);

  const panelRightTitle = () => {
    return (
      <>
        <Title>{t("COLUMNS.PERSON_NAME")}:</Title>
        <span>{personName}</span>
      </>
    );
  };

  const panelLeftTitle = () => {
    return (
      <>
        <Title>{t("global:STATUS")}:</Title>
        <span className={classes[`status_${status}`]}>
          <strong>{get(personInformationChangeStatuses[status], [getLangKey()]) || '-'}</strong>
        </span>
      </>
    );
  };

  if (isPending) return <div className={classes.spinnerWrapper}><Spin /></div>;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel
            key="1"
            header={panelRightTitle()}
            extra={panelLeftTitle()}
          >
            <Space direction="vertical" className={classes.filterWrapper}>
              <PersonalInfoCard franchiseName={franchiseName} isWorkerCourier={isWorkerCourier} isWorkerPicker={isWorkerPicker} />
              <ChangeDetailsCard changeDetails={changeDetails} />
              <RejectNotesSection approvalId={_id} status={status} note={note} isPending={isPending} />
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default InformationEditRequestDetailBody;
