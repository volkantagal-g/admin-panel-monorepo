import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';

const ABTestCodeSelectV2 = ({
  description,
  activeKey,
  value,
  label,
  tagValue,
  selectable,
  tagKey = 'id',
  placeholder,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getABTestCodesFromDataRequest({ activeKey }));
  }, [dispatch, activeKey]);

  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={label || t('SELECT_AB_TEST_CODE')}
      clientListKey="abTestCodes"
      description={description}
      selectable={selectable}
      tagValue={tagValue}
      tagKey={tagKey}
      placeholder={placeholder}
    />
  );
};

export default ABTestCodeSelectV2;
