import { Col, Form, InputNumber, Row, Switch } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { set, orderBy as orderByLodash } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { cardInstallmentCountsSelector, cardUserTypeSelector, filtersSelector, getPagination } from '../../redux/selectors';
import { defaultColumns } from './config';
import useStyles from './styles';
import { checkRowUpdated } from './helpers';
import { getPaginatedData } from '@shared/utils/table';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  inputType,
  handleSave,
  ...restProps
}) => {
  const isTypeSwitch = inputType === 'switch-button';
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    const values = await form.validateFields();

    toggleEdit();
    handleSave({
      ...record,
      ...values,
    });
  };

  let childNode = children;
  const inputNode = isTypeSwitch ? (
    <Switch ref={inputRef} onChange={save} onBlur={save} />
  ) : (
    <InputNumber data-testid={record?.id} ref={inputRef} onPressEnter={save} onBlur={save} />
  );

  if (editable) {
    childNode = editing ? (
      <Form.Item
        className="m-0"
        name={dataIndex}
        valuePropName={isTypeSwitch ? 'checked' : 'value'}
      >
        {inputNode}
      </Form.Item>
    ) : (
      // div tag acts like button
      <div
        role="button"
        aria-pressed="false"
        tabIndex="0"
        onClick={toggleEdit}
        onKeyDown={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const Table = () => {
  const { t } = useTranslation(['global', 'installmentCommissionPage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const pagination = useSelector(getPagination);

  const filters = useSelector(filtersSelector.getFilters);

  const cardInstallmentCountsFilteredData = useSelector(
    cardInstallmentCountsSelector.getFilteredInstallments,
  );
  const cardInstallmentCountsIsPending = useSelector(
    cardInstallmentCountsSelector.getIsPending,
  );
  const cardInstallmentCountsAllInstallments = useSelector(
    cardInstallmentCountsSelector.getInstallments,
  );
  const cardInitialInstallmentCounts = useSelector(cardInstallmentCountsSelector.getInitialInstallments);
  const cardUserType = useSelector(cardUserTypeSelector.getCardUserType);

  const isEditActive = canAccess(permKey.PAGE_INSTALLMENT_COMMISSIONS_COMPONENT_EDIT);

  useEffect(() => {
    const { posIca, installmentCount } = filters;
    dispatch(
      Creators.getCardInstallmentCountsRequest({
        posIca,
        installmentCount,
      }),
    );
  }, [dispatch, filters, cardUserType]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
  };

  const handleDelete = id => {
    const deletedItemIndex = cardInstallmentCountsAllInstallments.findIndex(
      item => id === item?.id,
    );
    set(
      cardInstallmentCountsAllInstallments,
      `${deletedItemIndex}.operation`,
      'deleted',
    );
    dispatch(
      Creators.updateLocalInstallmentDataRequest({ updatedInstallments: cardInstallmentCountsAllInstallments }),
    );
  };

  const handleSave = row => {
    const index = cardInstallmentCountsAllInstallments.findIndex(
      item => row.id === item.id,
    );

    const item = cardInstallmentCountsAllInstallments[index];

    const isRowUpdated = checkRowUpdated(cardInitialInstallmentCounts, row);
    const itemOperation = item?.operation;
    let updatedRow = { ...item, ...row };
    if (isRowUpdated) {
      updatedRow = {
        ...updatedRow,
        operation: itemOperation === 'added' ? 'added' : 'updated',
      };
    }
    else { // if the row resetting to initial, remove operation field
      delete updatedRow?.operation;
    }

    cardInstallmentCountsAllInstallments.splice(index, 1, { ...updatedRow });

    dispatch(
      Creators.updateLocalInstallmentDataRequest({ updatedInstallments: cardInstallmentCountsAllInstallments }),
    );
  };

  const isOperationColumnActive =
    cardInstallmentCountsFilteredData?.length >= 1;
  const columns = defaultColumns(t, isOperationColumnActive, handleDelete, isEditActive).map(
    col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          inputType: col.inputType,
          handleSave,
        }),
      };
    },
  );

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleChange = (_pagination, _filters, sorter) => {
    const { columnKey } = sorter;
    let { order } = sorter;
    order = sorter.order === 'ascend' ? 'asc' : 'desc';

    const sortedList = orderByLodash(
      cardInstallmentCountsFilteredData,
      columnKey,
      order,
    );
    dispatch(
      Creators.updateLocalInstallmentDataRequest({ updatedInstallments: sortedList }),
    );
  };

  return (
    <Row gutter={[8, 8]} className="mt-2">
      <Col span={24}>
        <AntTableV2
          components={(
            isEditActive && components
          )}
          total={cardInstallmentCountsFilteredData?.length}
          // 3 different operation colors for table row; added - deleted - updated
          rowClassName={record => (record.operation ? classes[record.operation] : null)}
          bordered
          onChange={handleChange}
          dataSource={getPaginatedData(
            cardInstallmentCountsFilteredData,
            pagination.currentPage,
            pagination.rowsPerPage,
          )}
          columns={columns}
          loading={cardInstallmentCountsIsPending}
          pagination={pagination}
          rowKey={record => record.id}
          onPaginationChange={handlePaginationChange}
        />
      </Col>
    </Row>
  );
};

export default Table;
