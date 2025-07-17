import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography,
  Button,
  DatePicker,
} from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';

import AntSelect from '@shared/components/UI/AntSelect';
import { getLocalDateFormat } from '@shared/utils/localization';
import { IS_DEFAULT_OPTIONS, SEGMENT_TYPE_OPTIONS, DEFAULT_ACTIVE_KEY } from '@app/pages/WarehouseSegment/constants';

import useStyles from './styles';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const classes = useStyles();
  const { t } = useTranslation(['warehouseSegmentPage', 'global']);

  const [name, setName] = useState(filters.name);
  const [isDefault, setIsDefault] = useState(filters.isDefault);
  const [dateRange, setDateRange] = useState(filters.dateRange);
  const [segmentTypes, setSegmentTypes] = useState(filters.segmentTypes);

  const handleSetName = event => {
    setName(event.target.value);
  };

  const handleIsDefault = values => {
    setIsDefault(values);
  };

  const handleDateRange = values => {
    setDateRange(values);
  };

  const handleSegmentTypes = values => {
    setSegmentTypes(values);
  };

  const submitButtonClick = () => {
    handleSubmit({
      name,
      isDefault,
      dateRange,
      segmentTypes,
    });
  };

  const disabledDateAfterToday = current => {
    return current && current.valueOf() > moment();
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={[DEFAULT_ACTIVE_KEY]}>
          <Panel header={t("FILTER")} key={DEFAULT_ACTIVE_KEY}>
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col md={12} xs={24}>
                  <Text>{t("LIST.NAME")}</Text>
                  <Input
                    value={name}
                    onChange={handleSetName}
                    placeholder={t("LIST.NAME")}
                    disabled={isPending}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <Text>{t("LIST.IS_DEFAULT")}</Text>
                  <AntSelect
                    value={isDefault}
                    onChange={handleIsDefault}
                    options={IS_DEFAULT_OPTIONS}
                    placeholder={t('LIST.IS_DEFAULT')}
                    allowClear
                    disabled={isPending}
                    className={classes.filterItem}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col md={12} xs={24}>
                  <Text>{t("LIST.SEGMENT_TYPE")}</Text>
                  <AntSelect
                    mode="multiple"
                    value={segmentTypes}
                    onChange={handleSegmentTypes}
                    options={SEGMENT_TYPE_OPTIONS(t)}
                    placeholder={t('LIST.SEGMENT_TYPE')}
                    allowClear
                    disabled={isPending}
                    className={classes.filterItem}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <Text className={classes.labelItem}>{t("LIST.DATE")}</Text>
                  <RangePicker
                    value={dateRange}
                    onChange={handleDateRange}
                    disabled={isPending}
                    format={getLocalDateFormat()}
                    disabledDate={disabledDateAfterToday}
                    className={classes.filterItem}
                  />
                </Col>
              </Row>
            </Space>
            <div className={classes.buttonContainer}>
              <Button
                type="primary"
                disabled={isPending}
                onClick={submitButtonClick}
              >
                {t('BRING')}
              </Button>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  filters: PropTypes.object,
  isPending: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default Filter;
