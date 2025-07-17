import { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Creators } from '../../redux/actions';
import { employeeAssetListSelector } from '../../redux/selectors';
import { tableColumns } from './config';

export default function EmailForPartialReturn({ isAssetsPending }) {
  const { t } = useTranslation(['assetPage', 'employeePage', 'button']);
  const [visible, setVisible] = useState(false);
  const { id: employeeId } = useParams();
  const dispatch = useDispatch();
  const [returnableAssets, setReturnableAssets] = useState([]);
  const [selectedAssetsForPartialReturn, setSelectedAssetsForPartialReturn] = useState([]);

  const data = useSelector(employeeAssetListSelector.getData);
  const isPending = useSelector(employeeAssetListSelector.getIsPending);

  useEffect(() => {
    if (data && data.length > 0) {
      setReturnableAssets(data.filter(asset => !asset.returnDate));
    }
  }, [data]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (selectedAssetsForPartialReturn.length > 0) {
      dispatch(Creators.partialAssetsReturnRequest({ assets: selectedAssetsForPartialReturn, employeeId }));
    }
    setSelectedAssetsForPartialReturn([]);
    setVisible(false);
  };

  const handleCancel = () => {
    setSelectedAssetsForPartialReturn([]);
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        loading={isAssetsPending || isPending}
        icon={<PlusOutlined />}
      >
        {t('button:EMAIL_FOR_PARTIAL_RETURN')}
      </Button>

      <Modal
        visible={visible}
        title={t('button:EMAIL_FOR_PARTIAL_RETURN')}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" htmlType="button" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button htmlType="submit" key="submit" type="primary" onClick={handleOk}>
            {t('button:SEND_EMAIL')}
          </Button>,
        ]}
      >
        <Table
          rowKey="asset"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedAssetsForPartialReturn,
            onChange: selectedRowKeys => {
              setSelectedAssetsForPartialReturn(selectedRowKeys);
            },
          }}
          pagination={{ hideOnSinglePage: true }}
          columns={tableColumns({ t })}
          dataSource={returnableAssets}
        />
      </Modal>
    </>
  );
}
