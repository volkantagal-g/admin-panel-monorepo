import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Switch,
  Table,
  Col,
  Row,
} from 'antd';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import {
  INIT_CREATE_RULE_FORM_VALUES,
  INIT_RULE_MODAL_DATA,
  RULE_OPERATOR_OPTIONS,
  RULE_VALUE_TYPE_OPTIONS,
} from '../constants';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import {
  createRuleSelector,
  ruleDetailSelector,
  ruleModalDataSelector,
  updateRuleSelector,
} from '../../redux/selectors';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { exportExcel } from '@shared/utils/common';
import { RuleType } from '../../redux/reducer';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

interface IAddItemModalProp {
  eventKeyField: string;
  isModalVisible: boolean;
  setIsModalVisible: (e: boolean) => void;
  handleAddedItem: (value: string) => void;
}

type FormItems = {
  item: string;
};

const AddItemModal = ({
  eventKeyField,
  isModalVisible,
  setIsModalVisible,
  handleAddedItem,
}: IAddItemModalProp) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['paymentFraudControlPage']);

  const onFinish = (values: FormItems) => {
    handleAddedItem(values.item);
    setIsModalVisible(false);
  };

  return (
    <Modal
      centered
      title={`Add ${eventKeyField}`}
      visible={isModalVisible}
      okText={t('ADD_ITEM')}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => {
        form.validateFields().then(values => {
          form.resetFields();
          onFinish(values);
        });
      }}
    >
      <Form form={form}>
        <Form.Item
          label={`${t('ENTER')} ${eventKeyField}`}
          name="item"
          rules={[{ required: true, message: t('REQUIRED_ITEM') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

type CsvData = {
  [key: string]: string;
  key: string;
};

type BulkCsvDataItem = {
  [key: string]: string;
};

type BulkCsvData = {
  data: [BulkCsvDataItem];
};

const RuleModal = (): ReactElement => {
  const { t } = useTranslation(['paymentFraudControlPage', 'global']);
  const classes = useStyles();
  const { Can } = usePermission();
  const dispatch = useDispatch();
  const [isListData, setIsListData] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);

  const [form] = Form.useForm();

  const ruleDetailData = useSelector(ruleDetailSelector.getData);
  const ruleDataIsPending = useSelector(ruleDetailSelector.getIsPending);
  const ruleModalData = useSelector(ruleModalDataSelector.getData);

  const createRuleIsPending = useSelector(createRuleSelector.getIsPending);
  const updateRuleIsPending = useSelector(updateRuleSelector.getIsPending);

  const createRuleError = useSelector(createRuleSelector.getError);
  const updateRuleError = useSelector(updateRuleSelector.getError);

  const isModalLoading =
    ruleDataIsPending || createRuleIsPending || updateRuleIsPending;

  const { isModalOpen } = ruleModalData;
  const isUpdateFlow = ruleModalData?.ruleId;

  const onFinish = (values: RuleType) => {
    let requestBody = values;
    if (isListData) {
      const ruleValue = csvData
        ?.map((item: BulkCsvDataItem) => item.key)
        .join(',');
      requestBody = { ...requestBody, ruleValue };
    }
    if (isUpdateFlow) {
      dispatch(
        Creators.updateRuleRequest({ ...requestBody, id: ruleModalData.ruleId }),
      );
    }
    else {
      dispatch(Creators.createRuleRequest({ ...requestBody }));
    }

    if (!createRuleError && !updateRuleError) {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(Creators.setRuleModalData(INIT_RULE_MODAL_DATA));
  };

  useEffect(() => {
    // UPDATE RULE FLOW
    if (isUpdateFlow) {
      dispatch(Creators.getRuleDetailRequest({ id: ruleModalData.ruleId }));
    }
    else {
      // CREATE RULE FLOW
      form.setFields(INIT_CREATE_RULE_FORM_VALUES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleModalData?.ruleId]);

  useEffect(() => {
    if (ruleDetailData && isUpdateFlow) {
      const {
        name,
        eventKeyField,
        ruleValue,
        score,
        enable,
        blockEvent,
        force3dEvent,
        useRequestEventKeyFieldValue,
        whiteEvent,
        eventType,
        ruleOperator,
        ruleValueType,
      } = ruleDetailData;
      const isRuleValueTypeList = ruleValueType === 'LIST';

      // string to list and format it for antd-table
      if (isRuleValueTypeList) {
        setIsListData(true);
        const listRuleValue =
          typeof ruleValue === 'string'
            ? ruleValue
              .split(',')
              .map((el: string) => ({ 0: String(el), key: String(el) }))
            : [];
        setCsvData(listRuleValue);
      }
      else {
        setIsListData(false);
      }
      form.setFields([
        { name: 'name', value: name },
        { name: 'eventKeyField', value: eventKeyField },
        { name: 'ruleValue', value: ruleValue },
        { name: 'score', value: score },
        { name: 'enable', value: enable },
        { name: 'blockEvent', value: blockEvent },
        { name: 'ruleValueType', value: ruleValueType },
        { name: 'force3dEvent', value: force3dEvent },
        {
          name: 'useRequestEventKeyFieldValue',
          value: useRequestEventKeyFieldValue,
        },
        { name: 'whiteEvent', value: whiteEvent },
        { name: 'eventType', value: eventType },
        { name: 'ruleOperator', value: ruleOperator },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleDetailData]);

  function handleBulkImport({ data }: BulkCsvData) {
    const convertDataToTableData = data?.map((datum: BulkCsvDataItem) => ({
      ...datum,
      key: Object.values(datum)[0],
    }));
    setCsvData(convertDataToTableData);

    if (convertDataToTableData.length > 0) {
      // for the performence concern set temp string, dont convert csv data to string in here
      // in the List option, data stored in csvData state
      // when the form submit convert list data to string
      form.setFieldsValue({ ruleValue: 'csv-imported' });
    }
  }

  const handleFormValueChanges = (
    _changedFields: RuleType,
    allFields: RuleType,
  ) => {
    const { ruleValueType } = allFields;

    if (ruleValueType === 'LIST') {
      setIsListData(true);
    }
    else {
      setIsListData(false);
    }
  };

  const handleDelete = (key: React.Key) => {
    const newData = csvData?.filter(item => item.key !== key) || [];
    setCsvData(newData);
  };

  const handleIdSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleAddItem = () => {
    setAddItemModalVisible(true);
  };

  const handleAddedItem = (value: string) => {
    const converToTableData = { 0: value, key: value };
    setCsvData([converToTableData, ...csvData]);
  };

  const getFilteredData = () => {
    return searchText
      ? csvData?.filter(item => String(item?.key).includes(searchText)) // fix number fields
      : csvData;
  };

  return (
    <Modal
      title={ruleModalData?.name}
      visible={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isModalLoading }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onFinish(values);
          })
          .catch(errorInfo => {
            Modal.error({
              title: t('INVALID_INPUT'),
              content: t('PLEASE_ENTER_VALID_RULE_VALUE'),
            });
          });
      }}
      width="800px"
    >
      <Spin spinning={isModalLoading}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          className={classes.noFieldMargin}
          onValuesChange={handleFormValueChanges}
        >
          <Form.Item
            label={t('RULE_NAME')}
            name="name"
            rules={[{ required: true, message: t('REQUIRED_RULE_NAME') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('EVENT_KEY_FIELD')}
            name="eventKeyField"
            rules={[{ required: true, message: t('REQUIRED_EVENT_KEY_FIELD') }]}
          >
            <Input disabled={!!isUpdateFlow} />
          </Form.Item>
          <Form.Item
            label={t('EVENT_TYPE')}
            name="eventType"
            rules={[{ required: true, message: t('REQUIRED_EVENT_TYPE') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('RULE_VALUE_TYPE')}
            name="ruleValueType"
            rules={[{ required: true, message: t('REQUIRED_EVENT_KEY_FIELD') }]}
          >
            <Select disabled={!!isUpdateFlow}>
              {RULE_VALUE_TYPE_OPTIONS.map(valueType => (
                <Select.Option value={valueType.value}>
                  {valueType.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={t('RULE_VALUE')}
            name="ruleValue"
            rules={[
              { required: true, message: t('REQUIRED_RULE_VALUE') },
              {
                validator: (_, value) => {
                  const ruleValueType = form.getFieldValue('ruleValueType');
                  const isValidNumber = !Number.isNaN(Number(value));
                  if (ruleValueType === 'NUMBER' && !isValidNumber) {
                    return Promise.reject(new Error(t('INVALID_NUMBER')));
                  }
                  if (ruleValueType === 'BOOLEAN' && value !== 'true' && value !== 'false') {
                    return Promise.reject(new Error(t('INVALID_BOOLEAN')));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {isListData ? (
              <>
                <Row justify="space-between" className="mb-2">
                  <Col span={12}>
                    <Input
                      placeholder="Search Value"
                      value={searchText}
                      onChange={handleIdSearch}
                    />
                  </Col>
                  <Row>
                    <Col>
                      <AddItemModal
                        eventKeyField={form.getFieldValue('eventKeyField')}
                        isModalVisible={isAddItemModalVisible}
                        setIsModalVisible={setAddItemModalVisible}
                        handleAddedItem={value => handleAddedItem(value)}
                      />
                      <Button onClick={() => handleAddItem()}>Add Item</Button>
                    </Col>
                    <Can
                      permKey={
                        permKey.PAGE_PAYMENT_FRAUD_CONTROL_LIST_COMPONENT_CSV_IMPORT
                      }
                    >
                      <Col>
                        <Button
                          onClick={() => exportExcel(
                            csvData,
                            t('EXPOR_CSV_NAME'),
                            [
                              {
                                title: 'ID',
                                key: '0',
                              },
                            ],
                            false,
                          )}
                        >
                          Export CSV
                        </Button>
                      </Col>
                      <Col>
                        <CsvImporter
                          hasNestedHeaderKeys
                          withoutHeader
                          onOkayClick={handleBulkImport}
                          importButtonText={t('UPLOAD_CSV')}
                          isButton
                        />
                      </Col>
                    </Can>
                  </Row>
                </Row>

                <Table
                  columns={[
                    {
                      title: 'ID',
                      dataIndex: '0',
                      key: '0',
                    },
                    {
                      title: t('global:ACTION'),
                      dataIndex: 'operation',
                      align: 'right',
                      render: (_, record: { key: string }) => (csvData.length >= 1 ? (
                        <Popconfirm
                          title={t('CONFIRM_DELETE')}
                          onConfirm={() => {
                            handleDelete(record.key);
                          }}
                        >
                          <Button size="small">{t('global:DELETE')} </Button>
                        </Popconfirm>
                      ) : null),
                    },
                  ]}
                  className={classes.noCellPadding}
                  pagination={{
                    position: ['bottomRight'],
                    pageSizeOptions: [5, 10, 20],
                    defaultPageSize: 5,
                  }}
                  dataSource={getFilteredData()}
                />
              </>
            ) : (
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label={t('SCORE')}
            name="score"
            rules={[{ required: true, message: t('REQUIRED_SCORE') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('RULE_OPERATOR')}
            name="ruleOperator"
            rules={[{ required: true, message: t('REQUIRED_EVENT_KEY_FIELD') }]}
          >
            <Select disabled={!!isUpdateFlow}>
              {RULE_OPERATOR_OPTIONS.map(operator => (
                <Select.Option value={operator.value}>
                  {operator.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t('USE_REQUEST_EVENT_KEY_FIELD_VALUE')}
            name="useRequestEventKeyFieldValue"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            label={t('FORCED_3D')}
            name="force3dEvent"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            label={t('BLOCK_EVENT')}
            name="blockEvent"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={t('WHITE_EVENT')}
            name="whiteEvent"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Can
            permKey={
              permKey.PAGE_PAYMENT_FRAUD_CONTROL_LIST_COMPONENT_DELETE_RULE
            }
          >
            <Form.Item
              label={t('IS_ENABLE')}
              name="enable"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Can>
        </Form>
      </Spin>
    </Modal>
  );
};

export default RuleModal;
