import { useCallback } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { configSchemaSelector } from '@app/pages/Algorithm/Config/List/redux/selectors';
import AlgorithmConfigValueFilter from '@app/pages/Algorithm/Config/components/AlgorithmConfigValueFilter';

const ConfigValueFilter = () => {
  const dispatch = useDispatch();
  const schemaData = useSelector(configSchemaSelector.getData);

  const onFinish = useCallback(values => {
    dispatch(Creators.addFilterParameter({
      field: 'value',
      value: values.filters,
      operator: 'json_condition',
    }));
  }, [dispatch]);

  const schemaOptions = Object.keys(get(schemaData, 'properties', {}))
    .map(key => {
      return {
        label: key,
        value: key,
      };
    });

  return (
    <AlgorithmConfigValueFilter onFinish={onFinish} schemaOptions={schemaOptions} />
  );
};

export default ConfigValueFilter;
