import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { addTypeInfoToCustomIdentifiers, prepareUpdateMerchantPayload } from '../formHelpers';
import { merchantDetailSelector, updateMerchantSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import CardFooter from '../../CardFooter';
import useStyles from '../styles';
import { customIdentifierTypeList } from '@app/pages/Payment/constants';
import { CustomIdentifierValueInput } from '../../CustomIdentifierValueInput';
import { fixCustomIdentifiersValuesByType } from '@app/pages/Payment/utils';

const { Panel } = Collapse;
const { Text } = Typography;

const CustomIdentifiers = ({ initialCustomIdentifiers, t, disableEditAction }) => {
  const [editActive, setEditActive] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const merchantDetailSelectorData = useSelector(
    merchantDetailSelector.getData,
  );
  const updateMerchantSelectorIsPending = useSelector(updateMerchantSelector.getIsPending);
  const customIdentifiersWithTypes = addTypeInfoToCustomIdentifiers(initialCustomIdentifiers);
  const [form] = Form.useForm();
  const handleSubmitForm = () => {
    const { customIdentifiers: updatedCustomIdentifiers } = form.getFieldsValue();
    const fixedCustomIdentifiers = fixCustomIdentifiersValuesByType(updatedCustomIdentifiers);
    merchantDetailSelectorData.customIdentifiers = fixedCustomIdentifiers; // only "customIdentifiers" field changeable in this form
    const updateMerchantPayload = prepareUpdateMerchantPayload(merchantDetailSelectorData);
    dispatch(Creators.updateMerchantRequest(updateMerchantPayload));
    setEditActive(false);
  };

  const handleCancel = () => {
    setEditActive(false);
    form.setFieldsValue({ customIdentifiers: customIdentifiersWithTypes });
  };
  return (
    <Collapse defaultActiveKey="3">
      <Panel
        header={<div>{t('paymentMerchantPage:CUSTOM_IDENTIFIERS')}</div>}
        key="3"
      >
        <Form
          form={form}
          initialValues={{ customIdentifiers: customIdentifiersWithTypes }}
          layout="vertical"
          name="custom-identifiers-form"
          autoComplete="off"
        >
          <Row gutter={12} className={classes.identifiersHeader}>
            <Col md={7}>
              <Text> Key </Text>
            </Col>
            <Col md={7}>
              <Text> Type </Text>
            </Col>
            <Col md={7}>
              <Text> Value </Text>
            </Col>
          </Row>
          <Form.List name="customIdentifiers">
            {(customIdentifiers, { add, remove }) => {
              return (
                <>
                  {customIdentifiers.map((customIdentifier, index) => {
                    return (
                      <Row gutter={12} key={customIdentifier.key}>
                        <Col md={7} xs={24}>
                          <Form.Item
                            {...customIdentifier}
                            name={[customIdentifier.name, 'key']}
                          >
                            <Input disabled={!editActive} />
                          </Form.Item>
                        </Col>
                        <Col md={7} xs={24}>
                          <Form.Item
                            {...customIdentifier}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[customIdentifier.name, 'type']}
                          >
                            <Select disabled={!editActive} options={customIdentifierTypeList} />
                          </Form.Item>
                        </Col>
                        <Col md={7} xs={24}>
                          <Form.Item dependencies={[['customIdentifiers', index, 'type']]}>
                            {() => {
                              const valueOfCustomIdentifiers = form.getFieldValue('customIdentifiers');
                              const customIdentifierType = valueOfCustomIdentifiers[index]?.type;
                              return (
                                <Form.Item
                                  data-testid={`custom-identifier-value-${index}`}
                                  {...customIdentifier}
                                  name={[customIdentifier.name, 'value']}
                                >
                                  <CustomIdentifierValueInput disabled={!editActive} type={customIdentifierType} />
                                </Form.Item>
                              );
                            }}
                          </Form.Item>
                        </Col>
                        {
                          editActive && (
                            <Col md={2}>
                              <MinusCircleOutlined
                                className={classes.removeIcon}
                                onClick={() => remove(customIdentifier.name)}
                              />
                            </Col>
                          )
                        }

                      </Row>
                    );
                  })}
                  {
                    editActive && !disableEditAction && (
                      <Row gutter={16}>
                        <Col span={24}>
                          <Button
                            onClick={() => add({ key: '', type: 'number', value: '' })}
                            className={classes.addIconGrid}
                          >
                            <PlusOutlined />
                            {t('paymentMerchantPage:ADD_CUSTOM_IDENTIFIERS')}
                          </Button>
                        </Col>
                      </Row>
                    )
                  }
                </>
              );
            }}
          </Form.List>
          {
            !disableEditAction && (
              <CardFooter
                loading={updateMerchantSelectorIsPending}
                editActive={editActive}
                setEditActive={setEditActive}
                handleSubmitForm={handleSubmitForm}
                handleCancel={handleCancel}
              />
            )
          }

        </Form>
      </Panel>
    </Collapse>
  );
};

CustomIdentifiers.prototype = {
  initialCustomIdentifiers: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
  disableEditAction: PropTypes.bool,
  t: PropTypes.func,
};
CustomIdentifiers.defaultProps = {
  initialGeneralInfo: {
    key: '',
    value: '',
  },
  t: () => {},
  disableEditAction: false,
};

export default CustomIdentifiers;
