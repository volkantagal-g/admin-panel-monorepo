import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Input,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useMemo } from 'react';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/actions';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';

const { Text } = Typography;
const { Panel } = Collapse;

const ConfigFilter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('algorithmConfigPage');

  const selectedFilters = useSelector(algorithmDomainConfigListSelector.getFilters);
  const constants = useSelector(algorithmDomainConfigListSelector.getConstants);

  const typeOptions = useMemo(() => {
    return constants?.typeOptions?.map(option => {
      return {
        ...option,
        label: t(`algorithmConfigPage:${option.label}`),
      };
    });
  }, [t, constants]);

  const handleSearch = (field, value, operator) => {
    dispatch(Creators.addFilterParameter({
      field,
      value,
      operator,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { debouncedCallback: onChange } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Text>{t('ID')}</Text>
              <Input
                placeholder={t('SEARCH')}
                onChange={({ target }) => onChange('key', target.value, 'icontains')}
              />
              <Text>{t('TYPE')}</Text>
              <Select
                value={selectedFilters?.type?.value}
                allowClear
                placeholder={t('SEARCH')}
                onChange={val => {
                  handleSearch('type', val, 'exact');
                }}
                options={typeOptions}
                showArrow={false}
                className="w-100"
              />
              <Text>{t('ALIAS')}</Text>
              <Input
                placeholder={t('SEARCH')}
                onChange={({ target }) => onChange('alias', target.value, 'icontains')}
              />
              <Row gutter={10} justify="space-around" align="middle">
                <Col span={12}>
                  <Text>{t('PARENT_KEY')}</Text>
                  <Input
                    placeholder={t('SEARCH')}
                    onChange={({ target }) => {
                      onChange('parent', target.value ? { key: target.value } : null, 'relational');
                    }}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('PARENT_ALIAS')}</Text>
                  <Input
                    placeholder={t('SEARCH')}
                    onChange={({ target }) => {
                      onChange('parent', target.value ? { alias: target.value } : null, 'relational');
                    }}
                  />
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default ConfigFilter;
