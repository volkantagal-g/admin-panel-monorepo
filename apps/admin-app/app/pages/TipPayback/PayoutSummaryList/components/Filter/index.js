import { useState } from 'react';
import { Row, Col, Collapse, Typography, Button, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import useStyles from './styles';
import { summariesSelector } from '../../redux/selectors';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit, pagination }) => {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const classes = useStyles();
  const summariesIsPending = useSelector(summariesSelector.getIsPending);

  const [date, setDate] = useState(filters.date);

  const handleDate = values => {
    setDate(values);
  };

  const submitButtonClick = () => {
    const finishDate = date[1].endOf('day').valueOf();
    const startDate = date[0].startOf('day').valueOf();
    handleSubmit({
      startDate,
      finishDate,
      currentPage: pagination.currentPage,
      rowsPerPage: pagination.rowsPerPage,
    });
  };

  return (
    <Row className={classes.margin8}>
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Row gutter={[8, 8]}>
              <Col md={6} xs={24}>
                <Text>{t('global:DATE')}</Text>
                <RangePicker
                  data-testid="payout-summary-date"
                  className={classes.filterItem}
                  value={date}
                  onChange={handleDate}
                  disabled={summariesIsPending}
                  format={getLocalDateFormat()}
                  allowClear={false}
                />
              </Col>
            </Row>

            <Row justify="end" className={classes.margin8}>
              <Button
                type="primary"
                disabled={summariesIsPending}
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
    date: PropTypes.arrayOf(PropTypes.instanceOf(Moment)),
    startDate: PropTypes.number,
    finishDate: PropTypes.number,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
};

export default Filter;
