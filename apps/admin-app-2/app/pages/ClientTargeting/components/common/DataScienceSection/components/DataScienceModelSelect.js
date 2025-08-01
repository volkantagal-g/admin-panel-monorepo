import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Space, Typography } from 'antd';

import { Creators } from '@app/pages/ClientTargeting/redux/actions';
import { getDataScienceModelsSelector, getPersonaDomainTypesSelector, getClientListData } from '@app/pages/ClientTargeting/redux/selectors';
import { getLangKey } from '@shared/i18n';
import useStyles from '../styles';

import { MAPPED_DOMAIN_TYPES_TO_SECTION_KEYS } from '../utils';

const { Text } = Typography;

const ModelSelect = (({ activeKey, selectedDomainType, section }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');

  const dataScienceModels = useSelector(getDataScienceModelsSelector.getData({ section }));
  const isDataScienceModelsPending = useSelector(getDataScienceModelsSelector.getIsPending({ section }));

  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const modelId = clientListData.params[activeIndex]?.modelId;
  const isValidationSchemaExist = clientListData.params[activeIndex]?.validationSchema;
  const tagOptions = useMemo(
    () => (dataScienceModels.length ? dataScienceModels.map(model => ({ value: model._id, label: model.modelName[getLangKey()] })) : null),
    [dataScienceModels],
  );
  const isSelectedModelExist = tagOptions?.some(option => option.value === modelId);
  const onModelSelect = id => {
    const dataScienceRequestBody = {
      modelId: id,
      selectedDomainType,
      data: {},
    };
    dispatch(Creators.setDataScienceFields({ data: dataScienceRequestBody, section, activeKey }));
  };

  useEffect(() => {
    if (selectedDomainType) {
      dispatch(Creators.getDataScienceModelsRequest({ section, domainType: MAPPED_DOMAIN_TYPES_TO_SECTION_KEYS[selectedDomainType] }));
    }
  }, [activeKey, dispatch, section, selectedDomainType]);

  // If user change domain type, reset modelId
  // if use switch between tabs, we should not reset modelId if validationSchema is already set
  useEffect(() => {
    if (!isSelectedModelExist && !isValidationSchemaExist) {
      dispatch(Creators.setDataScienceFields({ data: { modelId: null, selectedDomainType }, section, activeKey }));
    }
  }, [activeKey, dispatch, isValidationSchemaExist, isSelectedModelExist, section, selectedDomainType]);
  return (
    <Select
      value={modelId ?? null}
      onChange={onModelSelect}
      placeholder={t('DATA_SCIENCE_MODEL')}
      options={tagOptions}
      optionFilterProp="label"
      allowClear={false}
      loading={isDataScienceModelsPending}
      disabled={!selectedDomainType || isDataScienceModelsPending}
      className={classes.fullWidth}
      showSearch
      showArrow
    />
  );
});

const DomainSelect = ({ section, onChange, selectedDomainType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');

  const personaDomainTypes = useSelector(getPersonaDomainTypesSelector.getData({ section }));
  const isPersonaDomainTypesPending = useSelector(getPersonaDomainTypesSelector.getIsPending({ section }));

  const tagOptions = useMemo(
    () => (
      personaDomainTypes?.length
        ? personaDomainTypes.map(domainType => ({ value: domainType.value, label: domainType.label[getLangKey()] }))
        : null
    ),
    [personaDomainTypes],
  );

  useEffect(() => {
    dispatch(Creators.getPersonaDomainTypesRequest({ section }));
  }, [dispatch, section]);

  return (
    <Select
      onChange={onChange}
      value={selectedDomainType}
      placeholder={t('SELECT_DOMAIN_TYPE')}
      options={tagOptions}
      optionFilterProp="label"
      allowClear={false}
      loading={isPersonaDomainTypesPending}
      disabled={isPersonaDomainTypesPending}
      className={classes.fullWidth}
      showSearch
      showArrow
    />
  );
};

const DataScienceModelSelect = ({ activeKey, section, modelId }) => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();

  const clientListData = useSelector(getClientListData(activeKey));
  const { activeIndex } = clientListData;
  const selectedDomainType = clientListData.params[activeIndex]?.selectedDomainType;

  const handleDomainTypeSelect = domainType => {
    dispatch(Creators.setDataScienceFields({
      data: {
        selectedDomainType: domainType,
        modelId,
      },
      section,
      activeKey,
    }));
  };

  return (
    <>
      <DomainSelect activeKey={activeKey} section={section} onChange={handleDomainTypeSelect} selectedDomainType={selectedDomainType} />
      <Space direction="vertical" className={classes.container}>
        <Text>{t('SELECT_DATA_SCIENCE_MODEL')}</Text>
        <ModelSelect activeKey={activeKey} selectedDomainType={selectedDomainType} classes={classes} section={section} modelId={modelId} />
      </Space>
    </>
  );
};

export default DataScienceModelSelect;
