import { useCallback, useEffect, useMemo } from 'react';
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

import { algorithmConfigListSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

const { Text } = Typography;
const { Panel } = Collapse;

const ConfigFilter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('algorithmConfigPage');

  const selectedFilters = useSelector(algorithmConfigListSelector.getFilters);
  const selectedNamespace = useSelector(algorithmConfigListSelector.getNamespace);
  const namespaceListData = useSelector(algorithmConfigListSelector.getNamespaceListData);
  const typeListData = useSelector(algorithmConfigListSelector.getTypeListData);
  const typeListIsPending = useSelector(algorithmConfigListSelector.getTypeListIsPending);

  const handleSearch = (field, value, operator) => {
    dispatch(Creators.addFilterParameter({
      field,
      value,
      operator,
    }));
  };

  const namespaceOptions = useMemo(
    () => namespaceListData?.map(item => {
      return {
        value: item,
        label: item,
      };
    }),
    [namespaceListData],
  );

  const typeOptions = useMemo(
    () => typeListData?.map(item => {
      return {
        value: item,
        label: item,
      };
    }),
    [typeListData],
  );

  useEffect(() => {
    dispatch(Creators.getAlgorithmConfigTypeListRequest({ namespace: selectedNamespace }));
    dispatch(Creators.getConfigSchemaRequest({ namespace: selectedNamespace }));
  }, [dispatch, selectedNamespace]);

  const changeNamespace = useCallback(namespace => {
    dispatch(Creators.clearTypeFilter());
    dispatch(Creators.setNamespace({ namespace }));
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { debouncedCallback: onChange } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Text>{t('NAMESPACE')}</Text>
              <Select
                value={selectedNamespace}
                placeholder={t('NAMESPACE')}
                onChange={val => {
                  changeNamespace(val);
                }}
                options={namespaceOptions}
                className="w-100"
              />
              <Text>{t('KEY')}</Text>
              <Input
                placeholder={t('SEARCH')}
                onChange={({ target }) => onChange('key', target.value, 'icontains')}
              />
              <Text>{t('TYPE')}</Text>
              <Select
                loading={typeListIsPending}
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
              <Text>{t('PARENT_KEY')}</Text>
              <Input
                placeholder={t('SEARCH')}
                onChange={({ target }) => {
                  onChange('parent', target.value ? { key: target.value } : null, 'relational');
                }}
              />
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default ConfigFilter;
