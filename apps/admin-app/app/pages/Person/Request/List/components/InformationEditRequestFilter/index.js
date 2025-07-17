import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, DatePicker, Select, Typography, Collapse, Space } from 'antd';

import { informationEditRequestListSelector } from '@app/pages/Person/Request/List/redux/selectors';
import { personInformationChangeStatuses } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getLocalDateFormat } from '@shared/utils/localization';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectPerson from '@shared/containers/Select/Person';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;

function TagOption(value, text) {
  const customKey = (value.toString(36) + value);
  return (
    <Option
      value={value}
      key={customKey}
      title={value}
    >
      <Text>{text}</Text>
    </Option>
  );
}

const InformationEditRequestFilter = ({
  selectedRequestStatus,
  setSelectedRequestStatus,
  selectedRequestTimeRange,
  setSelectedRequestTimeRange,
  selectedFranchise,
  setSelectedFranchise,
  selectedPerson,
  setSelectedPerson,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('personRequestPage');

  const isPending = useSelector(informationEditRequestListSelector.getIsPending);

  const requestStatusList = convertConstantValuesToSelectOptions(personInformationChangeStatuses).map(option => {
    return TagOption(option.value, option.label);
  });

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t("global:FILTER")} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    className={classes.rangePicker}
                    value={selectedRequestTimeRange}
                    onChange={setSelectedRequestTimeRange}
                    format={getLocalDateFormat()}
                    allowClear={false}
                    disabled={isPending}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('FRANCHISE')}</Text>
                  <SelectFranchise
                    disabled={isPending}
                    value={selectedFranchise}
                    onChange={setSelectedFranchise}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:PERSON')}</Text>
                  <SelectPerson
                    disabled={isPending}
                    franchiseId={selectedFranchise}
                    value={selectedPerson}
                    onChange={setSelectedPerson}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:STATUS')}</Text>
                  <Select
                    disabled={isPending}
                    showArrow
                    allowClear
                    value={selectedRequestStatus}
                    placeholder={t("global:FILTER")}
                    onChange={setSelectedRequestStatus}
                    className={classes.requestStatusSelect}
                  >
                    {requestStatusList}
                  </Select>
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default InformationEditRequestFilter;
