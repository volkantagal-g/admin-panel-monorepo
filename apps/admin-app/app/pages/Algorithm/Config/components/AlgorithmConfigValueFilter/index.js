import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Form,
  Button,
  Select,
  Checkbox,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import useStyles from './styles';

const { Panel } = Collapse;

const AlgorithmConfigValueFilter = ({ onFinish, schemaOptions }) => {
  const { t } = useTranslation('algorithmConfigPage');
  const classes = useStyles();
  const [form] = Form.useForm();
  const [checkedContainFields, setCheckedContainFields] = useState([]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse>
          <Panel header={t('VALUE_FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Form form={form} onFinish={onFinish} autoComplete="off">
                <Form.List name="filters" initialValue={[]}>
                  {(fields, {
                    add,
                    remove,
                  }) => (
                    <>
                      {fields.map(({
                        key,
                        name,
                        ...restField
                      }) => (
                        <Row key={key} gutter={10} justify="space-around" align="middle">
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, 'key']}
                              rules={[{
                                required: true,
                                message: 'Missing key',
                              }]}
                            >
                              {schemaOptions.length > 0 ? (
                                <Select showSearch placeholder={t('CONFIG_KEY')} options={schemaOptions} data-testid="algo-config-domain-key-select" />
                              ) : (
                                <Input placeholder={t('CONFIG_KEY')} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, 'value']}
                              rules={[{
                                required: !checkedContainFields.includes(key),
                                message: 'Missing value',
                              }]}
                            >
                              <Input disabled={checkedContainFields.includes(key)} placeholder={t('CONFIG_VALUE')} />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <div className={classes.valueFilterActionButtons}>
                              <Form.Item
                                {...restField}
                                name={[name, 'not_equal']}
                                valuePropName="checked"
                                shouldUpdate
                              >
                                <Checkbox disabled={checkedContainFields.includes(key)} defaultChecked={false}>{t('NOT_EQUAL')}</Checkbox>
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'contains_key']}
                                valuePropName="checked"
                                shouldUpdate
                              >
                                <Checkbox
                                  defaultChecked={false}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setCheckedContainFields([...checkedContainFields, key]);
                                    }
                                    else {
                                      const newChecked = checkedContainFields.filter(item => item !== key);
                                      setCheckedContainFields(newChecked);
                                    }
                                  }}
                                >{t('CONTAINS_ANY_VALUE')}
                                </Checkbox>
                              </Form.Item>
                              <MinusCircleOutlined className={classes.removeButtonStyle} onClick={() => remove(name)} />
                            </div>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button onClick={() => add()} block icon={<PlusOutlined />}>
                          {t('ADD_FILTER')}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {t('SEARCH')}
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default AlgorithmConfigValueFilter;
