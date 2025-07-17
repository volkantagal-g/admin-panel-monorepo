import { Collapse, Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Spinner from '@shared/components/Spinner';
import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { formatAgreementTypes } from '@app/pages/CustomerAgreement/utils';
import { documentTypeSelector } from '@app/pages/CustomerAgreement/redux/selectors';
import { Creators } from '../../redux/actions';

const { Panel } = Collapse;
const { Text } = Typography;

const DocumentTypeFilter = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('customerAgreementPage');
  const documentTypesPending = useSelector(documentTypeSelector.getIsPending);
  const documentTypes = useSelector(documentTypeSelector.getData);
  const activeDocumentTypes = formatAgreementTypes({ documentTypes });
  const documentTypeList = convertSelectOptions(activeDocumentTypes, { valueKey: 'type', labelKey: 'name', isTranslation: true });

  useEffect(() => {
    dispatch(Creators.getDocumentTypesRequest());
  }, [dispatch]);

  if (documentTypesPending) return <Spinner />;

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header={t('global:FILTER')} key="1">
        <Space direction="vertical" className="w-100">
          <Text>{t('FILTER.DOCUMENT_TYPE.TITLE')}</Text>
          <Select
            placeholder={t('FILTER.DOCUMENT_TYPE.DESC')}
            className="w-100"
            options={documentTypeList}
            onChange={value => {
              if (value) {
                const { type: documentType } = documentTypes.find(e => e.type === value);
                dispatch(Creators.setDocumentTypeSelectedRequest({ documentType }));
              }
            }}
            allowClear
            onClear={() => {
              dispatch(Creators.getLatestAgreementClear());
              dispatch(Creators.getPreviousAgreementsClear());
              dispatch(Creators.setDocumentTypeSelectedClear());
            }}
            showSearch
            filterOption={getSelectFilterOption}
          />
        </Space>
      </Panel>
    </Collapse>
  );
};

export default DocumentTypeFilter;
