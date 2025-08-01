import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Input,
  Form,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { productGroupFilters } from '@app/pages/MarketProduct/constantValues';
import { getDomainTypeOptions } from '@shared/utils/formHelper';
import { customDomainTypes } from '../../../Detail/components/Form';
import { getGroupTypeOptions, getPlacementOptions } from '../../../utils';
import useStyles from './styles';

const { Option } = Select;
const { Panel } = Collapse;

const productGroupFilterOptions = Object.entries(productGroupFilters)
  .map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

const Filter = ({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  form,
  setFormValues,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketProductPage');

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Form
                layout="vertical"
                form={form}
                onValuesChange={(_, allValues) => {
                  setFormValues(allValues);
                }}
              >
                <Form.Item
                  label={t('FILTER_OPTION')}
                  style={{ marginBottom: '1.5em' }}
                  htmlFor="filters"
                >
                  <Select
                    value={filters}
                    mode="multiple"
                    placeholder={t('FILTER_OPTION')}
                    onChange={onFiltersChange}
                    showArrow={false}
                    className="w-100"
                    showSearch
                    filterOption={getSelectFilterOption}
                    id="filters"
                  >
                    {productGroupFilterOptions}
                  </Select>
                </Form.Item>
                <Space>
                  <Form.Item label={t('GROUP_TARGET')} name="groupTarget" className={classes['form-item']}>
                    <Select
                      id="group-target"
                      placeholder={t('GROUP_TARGET')}
                      options={getDomainTypeOptions(customDomainTypes)}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item label={t('GROUP_TYPE')} name="groupType" className={classes['form-item']}>
                    <Select
                      id="group-type"
                      placeholder={t('GROUP_TYPE')}
                      options={getGroupTypeOptions()}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item label={t('GROUP_PLACEMENT')} name="groupPlacement" className={classes['form-item']}>
                    <Select
                      id="group-placement"
                      placeholder={t('GROUP_PLACEMENT')}
                      options={getPlacementOptions()}
                      allowClear
                    />
                  </Form.Item>
                </Space>
                <Form.Item
                  label={t('SEARCH')}
                  style={{ marginBottom: 0 }}
                  htmlFor="query"
                >
                  <Input
                    value={query}
                    onChange={e => onQueryChange(e.target.value)}
                    id="query"
                  />
                </Form.Item>
              </Form>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
