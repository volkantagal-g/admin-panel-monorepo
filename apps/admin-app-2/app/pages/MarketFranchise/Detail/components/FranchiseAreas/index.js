import { Button, Form, Input, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tableColumns } from './config';
import Card from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { createFranchiseAreaSelector, deleteFranchiseAreaSelector, updateFranchiseAreaSelector } from '../../redux/selectors';
import { getFranchiseAreasSelector } from '@shared/redux/selectors/franchiseCommon';
import { Creators as FranchiseCommonCreators } from '@shared/redux/actions/franchiseCommon';
import EditableCell from './EditableCell';

function FranchiseAreas({ franchiseId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const franchiseAreas = useSelector(getFranchiseAreasSelector.getData);
  const isFranchiseAreasPending = useSelector(getFranchiseAreasSelector.getIsPending);
  const isCreatePending = useSelector(createFranchiseAreaSelector.getIsPending);
  const isCreateSuccess = useSelector(createFranchiseAreaSelector.getIsSuccess);
  const isDeletePending = useSelector(deleteFranchiseAreaSelector.getIsPending);
  const isDeleteSuccess = useSelector(deleteFranchiseAreaSelector.getIsSuccess);
  const isUpdatePending = useSelector(updateFranchiseAreaSelector.getIsPending);
  const isUpdateSuccess = useSelector(updateFranchiseAreaSelector.getIsSuccess);

  const [newArea, setNewArea] = useState('');
  const [form] = Form.useForm();
  const [data, setData] = useState(franchiseAreas);
  const [editingKey, setEditingKey] = useState('');

  function createFranchiseArea() {
    dispatch(Creators.createFranchiseAreaRequest({ areaName: newArea, franchiseId }));
  }

  useEffect(() => {
    setData(franchiseAreas);
  }, [franchiseAreas]);

  const fetchFranchiseAreas = useCallback(() => {
    dispatch(FranchiseCommonCreators.getFranchiseAreasRequest({ franchiseId }));
  }, [dispatch, franchiseId]);

  useEffect(() => {
    if (isCreateSuccess) {
      setNewArea('');
      fetchFranchiseAreas();
    }
  }, [isCreateSuccess, fetchFranchiseAreas]);

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      fetchFranchiseAreas();
      setEditingKey(''); // Reset editing key after successful update
    }
  }, [isUpdateSuccess, isDeleteSuccess, fetchFranchiseAreas]);

  useEffect(() => {
    fetchFranchiseAreas();
  }, [fetchFranchiseAreas]);

  const isEditing = record => record._id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: record.name,
      ...record,
    });
    setEditingKey(record._id);
  };

  const save = async () => {
    try {
      const row = await form.validateFields();
      if (row?.name?.length) {
        dispatch(Creators.updateFranchiseAreaRequest({ areaName: row.name, franchiseAreaId: editingKey }));
      }
    }
    catch (errInfo) {
      /* Error is ignored */
    }
  };

  const handleDelete = key => {
    dispatch(Creators.deleteFranchiseAreaRequest({ franchiseAreaId: key }));
  };

  const cancel = () => {
    setEditingKey('');
  };

  const mergedColumns = tableColumns(isEditing, save, edit, cancel, handleDelete, editingKey).map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        value: record[col.dataIndex],
      }),
    };
  });

  const isPending = isCreatePending || isFranchiseAreasPending;

  return (
    <Card>
      <Form form={form} component="false">
        <AntTableV2
          title={t('marketFranchisePage:FRANCHISE_AREAS')}
          data={data}
          columns={mergedColumns}
          loading={isFranchiseAreasPending || isDeletePending || isUpdatePending}
          components={{ body: { cell: EditableCell } }}
        />
      </Form>
      <Input.Group compact style={{ display: 'flex' }}>
        <Input
          value={newArea}
          placeholder={t('marketFranchisePage:INPUT_AREA_NAME')}
          disabled={isPending}
          onChange={e => setNewArea(e.target.value)}
        />
        <Popconfirm
          okText={t('button:YES')}
          cancelText={t('button:CANCEL')}
          title={t('marketFranchisePage:CONFIRM_MODAL_TITLE')}
          disabled={!newArea.length || isPending}
          onConfirm={createFranchiseArea}
        >
          <Button type="primary" loading={isPending}>{t('marketFranchisePage:ADD_AREA')}</Button>
        </Popconfirm>
      </Input.Group>
    </Card>
  );
}

export default FranchiseAreas;
