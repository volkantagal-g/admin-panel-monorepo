import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Row,
  Space,
  Typography,
} from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../../redux/actions';
import { leaveExcelSelector } from '@app/pages/LeaveManagement/redux/selectors';
import { getFranchisesSelector } from '@shared/containers/Select/Franchise/redux/selectors';
import SelectFranchise from '@shared/containers/Select/Franchise';
import useStyles from './styles';
import { usePermission } from '@shared/hooks';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, onSubmit, isDisabled }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('leaveManagement');
  const classes = useStyles();
  const refInitialCall = useRef(false);
  const { canAccess } = usePermission();
  const hasPermissionToDownloadExcel = canAccess(
    permKey.PAGE_WORKFORCE_REPORTS,
  );

  const [franchiseId, setFranchiseId] = useState(filters.franchiseId);
  const [date, setDate] = useState(filters.date);
  const isPending = useSelector(getFranchisesSelector.getIsPending);
  const isExcelPending = useSelector(leaveExcelSelector.getIsPending);

  const handleSubmit = useCallback(() => {
    onSubmit({ date, franchiseId });
  }, [onSubmit, date, franchiseId]);

  const handleExcelDownload = () => {
    const utcOffset = moment().utcOffset();
    const startDatetime = date[0] ? moment(date[0]).utc().startOf('day') : undefined;
    const endDatetime = date[1] ? moment(date[1]).utc().endOf('day') : undefined;
    dispatch(
      Creators.getLeaveExcelRequest({
        franchiseIds: [franchiseId],
        startDatetime,
        endDatetime,
        utcOffset,
      }),
    );
  };

  useEffect(() => {
    if (!isPending && !refInitialCall.current && franchiseId) {
      refInitialCall.current = true;
      handleSubmit();
    }
  }, [handleSubmit, franchiseId, isPending]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.fullWidth}>
              <Row gutter={[8, 8]} className={classes.alignEnd}>
                <Col md={10} xs={24}>
                  <Text>{t('DATE')}</Text>
                  <DatePicker.RangePicker
                    onChange={setDate}
                    value={date}
                    className={classes.fullWidth}
                    allowClear={false}
                  />
                </Col>
                <Col md={10} xs={24}>
                  <Text>{t('FRANCHISE')}</Text>
                  <SelectFranchise
                    disabled={isDisabled}
                    value={franchiseId}
                    onChange={setFranchiseId}
                    isFirstOptionSelected
                    allowClear={false}
                  />
                </Col>
                <Col className={classes.flex}>
                  <Row className={classes.justifyEnd}>
                    <Button
                      type="primary"
                      disabled={isDisabled}
                      onClick={handleSubmit}
                    >
                      {t('BRING')}
                    </Button>
                  </Row>
                </Col>
                {hasPermissionToDownloadExcel && (
                  <Col>
                    <Row className={classes.justifyEnd}>
                      <Button
                        type="default"
                        disabled={isDisabled}
                        loading={isExcelPending}
                        onClick={handleExcelDownload}
                        icon={<CloudDownloadOutlined />}
                      >
                        {t('global:EXPORT_EXCEL')}
                      </Button>
                    </Row>
                  </Col>
                )}
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
