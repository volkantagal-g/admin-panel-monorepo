import { useState } from 'react';
import { Row, Col, Collapse, Typography, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AntSelect from '@shared/components/UI/AntSelect';
import useStyles from '../styles';
import { PAYOUT_STATUS_OPTIONS } from '../../constants';
import { summaryDetailsSelector } from '../../redux/selectors';
import { alphabeticallySortByParam } from '@shared/utils/common';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit, pagination }) => {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const classes = useStyles();
  const summaryDetailsIsPending = useSelector(summaryDetailsSelector.getIsPending);

  const [payoutStatus, setPayoutStatus] = useState(filters.payoutStatus);
  const [personName, setPersonName] = useState(filters.personName);
  const [person, setPerson] = useState(filters.person);
  const [taxNum, setTaxNumber] = useState(filters.taxNum);

  const handlePayoutStatus = values => {
    setPayoutStatus(values);
  };

  const submitButtonClick = () => {
    handleSubmit({
      personName,
      payoutStatus,
      person,
      taxNum,
      currentPage: pagination.currentPage,
      rowsPerPage: pagination.rowsPerPage,
    });
  };

  return (
    <Row className={classes.marginBottom16}>
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Row gutter={[8, 8]}>
              <Col md={6} xs={24}>
                <Text>{t('payoutSummaryPage:PERSON_NAME')}</Text>
                <Input
                  placeholder={t('payoutSummaryPage:PERSON_NAME_DESC')}
                  allowClear
                  onChange={event => setPersonName(event.target.value)}
                  className={classes.filterItem}
                  value={personName}
                  disabled={summaryDetailsIsPending}
                />
              </Col>

              <Col md={6} xs={24}>
                <Text>{t('payoutSummaryPage:PERSON_ID')}</Text>
                <Input
                  placeholder={t('payoutSummaryPage:PERSON_ID_DESC')}
                  allowClear
                  onChange={event => setPerson(event.target.value)}
                  className={classes.filterItem}
                  value={person}
                  disabled={summaryDetailsIsPending}
                />
              </Col>

              <Col md={6} xs={24}>
                <Text>{t('payoutSummaryPage:TAX_NUMBER')}</Text>
                <Input
                  placeholder={t('payoutSummaryPage:TAX_NUMBER_DESC')}
                  allowClear
                  onChange={event => setTaxNumber(event.target.value)}
                  className={classes.filterItem}
                  value={taxNum}
                  disabled={summaryDetailsIsPending}
                />
              </Col>

              <Col md={6} xs={24}>
                <Text>{t('payoutSummaryPage:PAYOUT_STATUS')}</Text>
                <AntSelect
                  placeholder={t('payoutSummaryPage:PAYOUT_STATUS_DESC')}
                  allowClear
                  onChange={handlePayoutStatus}
                  className={classes.filterItem}
                  value={payoutStatus}
                  optionFilterProp="label"
                  options={alphabeticallySortByParam(PAYOUT_STATUS_OPTIONS(t))}
                  disabled={summaryDetailsIsPending}
                />
              </Col>
            </Row>

            <Row justify="end" className={classes.margin8}>
              <Button
                type="primary"
                disabled={summaryDetailsIsPending}
                onClick={() => submitButtonClick()}
              >
                {t('BRING')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  filters: PropTypes.shape({
    payoutStatus: PropTypes.number,
    personName: PropTypes.string,
    person: PropTypes.string,
    taxNum: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
};

export default Filter;
