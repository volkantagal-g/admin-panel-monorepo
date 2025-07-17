import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';

import { values } from 'lodash';

import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { Creators } from '../../redux/actions';
import { algorithmConfigListSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import ConfigCreateModal from '@app/pages/Algorithm/Config/List/components/ConfigCreateModal';
import { usePermission } from '@shared/hooks';
import { getPermKeyByNamespace } from '@app/pages/Algorithm/Config/utils';

const AlgorithmConfigList = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 25 });
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const algorithmConfigListData = useSelector(algorithmConfigListSelector.getData);
  const algorithmConfigListIsPending = useSelector(algorithmConfigListSelector.getIsPending);
  const filters = useSelector(algorithmConfigListSelector.getFilters);
  const namespace = useSelector(algorithmConfigListSelector.getNamespace);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const parsedFilters = values(filters).filter(filter => filter.value);
    dispatch(Creators.getAlgorithmConfigListRequest({
      namespace,
      page: pagination.currentPage,
      pageSize: pagination.rowsPerPage,
      filters: values(parsedFilters),
    }));
  }, [dispatch, pagination, filters, namespace]);

  const createButton = useMemo(() => {
    return (
      <Can permKey={getPermKeyByNamespace({ namespace })}>
        <Button
          icon={<PlusOutlined />}
          type="success"
          onClick={() => {
            setCreateModalVisible(true);
          }}
        >{t('CREATE')}
        </Button>
      </Can>
    );
  }, [namespace, t]);

  return (
    <>
      <ConfigCreateModal visible={createModalVisible} setVisible={setCreateModalVisible} />
      <AntTableV2
        title={t('algorithmConfigPage:CONFIGS')}
        rightElement={createButton}
        data={algorithmConfigListData}
        columns={tableColumns(t)}
        loading={algorithmConfigListIsPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default AlgorithmConfigList;
