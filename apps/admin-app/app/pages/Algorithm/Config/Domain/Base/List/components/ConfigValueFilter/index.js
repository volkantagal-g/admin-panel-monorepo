import { useCallback, useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import AlgorithmConfigValueFilter from '@app/pages/Algorithm/Config/components/AlgorithmConfigValueFilter';

const ConfigValueFilter = () => {
  const dispatch = useDispatch();
  const namespace = useSelector(algorithmDomainConfigListSelector.getNamespace);
  const domainSettings = useSelector(algorithmDomainConfigListSelector.getDomainSettingsData);

  useEffect(() => {
    dispatch(Creators.getAlgorithmDomainSettingsRequest({ namespace }));
  }, [dispatch, namespace]);

  const onFinish = useCallback(values => {
    dispatch(Creators.addFilterParameter({
      field: 'value',
      value: values.filters,
      operator: 'json_condition',
    }));
  }, [dispatch]);

  const schemaOptions = get(domainSettings, 'default_config_set', [])
    .map(configField => {
      return {
        label: configField.field,
        value: configField.field,
      };
    });

  return (
    <AlgorithmConfigValueFilter onFinish={onFinish} schemaOptions={schemaOptions} />
  );
};

export default ConfigValueFilter;
