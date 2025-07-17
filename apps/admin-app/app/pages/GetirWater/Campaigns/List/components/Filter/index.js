import { useState } from 'react';
import { DatePicker, Typography, Row, Col, Collapse, Space, Input, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import moment from 'moment-timezone';

import { Creators } from '../../redux/actions';
import { createSelectOption } from '@app/pages/GetirWater/utils';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Text } = Typography;

const dateFormat = 'DD/MM/YYYY';

const CampaignFilterArea = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');

  const [filters, setFilters] = useState({
    endDate: undefined,
    startDate: undefined,
    searchWord: undefined,
    status: undefined,
  });

  const handleFilterClick = () => {
    dispatch(Creators.getCampaignsRequest({ data: filters }));
  };

  const handleChangeDate = value => {
    setFilters({
      ...filters,
      startDate: moment(value[0], dateFormat).local().startOf('d').toISOString(),
      endDate: moment(value[1], dateFormat).local().endOf('d').toISOString(),
    });
  };

  const handleChangeSearchText = e => {
    setFilters({
      ...filters,
      searchWord: e.target.value,
    });
  };

  const handleChangeStatus = e => {
    setFilters({
      ...filters,
      status: e,
    });
  };

  const campaignStatus = [
    { value: 1, label: t('global:ACTIVE') },
    { value: 2, label: t('global:INACTIVE') },
  ];

  const statusOptionsList = createSelectOption(
    campaignStatus,
    'value',
    'label',
    true,
  );

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('DATE')}</Text>
                  <RangePicker className="w-100" format={dateFormat} onChange={handleChangeDate} allowClear={false} />
                </Col>
                <Col span={8}>
                  <Text>{t('getirWaterCampaignsPage:COLUMNS.STATUS')}</Text>
                  <Select
                    placeholder={t(
                      'getirWaterCampaignsPage:COLUMNS.STATUS',
                    )}
                    className="w-100"
                    onChange={handleChangeStatus}
                    options={statusOptionsList}
                    allowClear
                    showSearch
                    // filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={8}>
                  <Text>{t('SEARCH')}</Text>
                  <Input placeholder={t('SEARCH')} onChange={handleChangeSearchText} />
                </Col>
              </Row>
              <Row justify="end">
                <Button type="primary" onClick={handleFilterClick}>
                  {t('FILTER')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default CampaignFilterArea;
