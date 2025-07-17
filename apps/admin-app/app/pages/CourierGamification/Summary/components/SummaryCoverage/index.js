import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Row, Card, Col, Input, DatePicker } from 'antd';

import useStyles from './styles';

import SelectDomains from '../../../components/SelectDomains';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const SummaryCoverage = (
  { data },
) => {
  const { t } = useTranslation('courierGamificationPage');
  const classes = useStyles();

  return (
    <Card size="small" title={t('CREATE.TASK_COVERAGE')}>
      <Row gutter={24}>
        <Col span={12}>
          <div className={classes.itemRow}>
            <label>{t('TASK_SUMMARY.TITLE')}:</label>
            <Input
              value={data?.title || ''}
              name="title"
              disabled
            />
          </div>
          <div className={classes.itemRow}>
            <label>{t('TASK_SUMMARY.DESCRIPTION')}:</label>
            <TextArea
              autoSize={{
                minRows: 8,
                maxRows: 8,
              }}
              rows={8}
              minRows={8}
              value={data?.description}
              disabled
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={classes.itemRow}>
            <label>{t('TASK_SUMMARY.DATE_RANGE')}:</label>
            <RangePicker
              disabled
              className="w-100"
              value={
                data?.startDate === null
                  ? null
                  : [moment(data?.startDate, 'YYYY-MM-DD'), moment(data?.endDate, 'YYYY-MM-DD')]
              }
            />
          </div>
          <div className={classes.itemRow}>
            <label>{t('CREATE.DOMAIN_TYPES')}:</label>
            <SelectDomains
              selectKey="summaryCoverage.domainTypes"
              fieldName="summaryCoverage.domainTypes"
              disabled
              value={data?.domainTypes}
            />
          </div>
          <div className={classes.itemRow}>
            <label>{t('TASK_SUMMARY.COURIER_COUNT')}:</label>
            <Input
              value={`${data?.courierCount || '0'} ${t('COURIER')}`}
              name="courierCount"
              disabled
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryCoverage;
