import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Modal, Button, Row, Col, Table } from 'antd';

import { isAllowedToOperate } from '../../utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import NewAccountForm from './NewAccountForm';
import { getSupplierByIdSelector } from '../../redux/selectors';
import { tableColumns } from './config';

import AntCard from '@shared/components/UI/AntCard';

const SupplierAccountListTable = () => {
  const data = useSelector(getSupplierByIdSelector.getData) || [];
  const isPending = useSelector(getSupplierByIdSelector.getIsPending);
  const { t } = useTranslation('supplierPage');
  const selectedCountry = useSelector(getSelectedCountryV2);
  const [editableRow, setEditableRow] = useState(false);
  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);

  const [form] = Form.useForm();

  const handleNewAccountClicked = () => {
    setIsCreatingNewAccount(true);
  };

  const handleNewAccountOk = () => {
    form.submit();
  };

  const handleNewAccountCancel = () => {
    setIsCreatingNewAccount(false);
  };

  const tableTitle = () => (
    <Row className="w-100">
      <Col span={12}>{t('SUPPLIER_ACCOUNTS')}</Col>
      <Col span={12} className="text-right">
        <Button size="small" type="primary" onClick={handleNewAccountClicked} disabled={!isAllowedToOperate(selectedCountry)}>
          {`+ ${t('NEW_ACCOUNT')}`}
        </Button>
      </Col>
    </Row>
  );

  return (
    <AntCard title={tableTitle()}>
      <Table
        dataSource={data.accounts || []}
        columns={tableColumns(editableRow, setEditableRow, !isAllowedToOperate(selectedCountry))}
        loading={isPending}
        scroll={{ x: '100%', y: 600 }}
        pagination={false}
        size="small"
      />
      <Modal
        title={t('NEW_ACCOUNT')}
        visible={isCreatingNewAccount}
        onOk={handleNewAccountOk}
        onCancel={handleNewAccountCancel}
        maskClosable={false}
      >
        <NewAccountForm
          formInstance={form}
          handleModalVisibility={setIsCreatingNewAccount}
        />
      </Modal>
    </AntCard>
  );
};

export default SupplierAccountListTable;
