import { useState, useEffect } from 'react';
import moment from 'moment';
import { set, cloneDeep, get } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Row, Col, Typography, Collapse, InputNumber, Popconfirm, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';

import { usePermission } from '@shared/hooks';

import { getLangKey } from '@shared/i18n';
import { DatePickerWrapper } from '@shared/components/UI/Form';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import Card from '@shared/components/UI/AntCard';
import Footer from '@shared/shared/components/Footer';
import { Creators } from '../../redux/actions';
import { franchiseEquipmentDetailSelector } from '../../redux/selectors';
import { updateFranchiseEquipmentObject, getUpdateEquipmentRequestParams } from './utils';
import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;

const UpdateFranchiseEquipmentForm = ({ id }) => {
  const { Can } = usePermission();
  const { t } = useTranslation('franchiseEquipmentPage');
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});
  const [isVehicleFormEditable, setIsVehicleFormEditable] = useState(false);
  const [openDate, setOpenDate] = useState(null);
  const [isArchived, setIsArchived] = useState(false);

  const [form] = Form.useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(franchiseEquipmentDetailSelector.getData);
  const isPending = useSelector(franchiseEquipmentDetailSelector.getIsPending);

  const handleChange = (value, name) => {
    const ceiledValue = Math.ceil(value);
    const updatedEquipmentData = set(equipmentData, name, ceiledValue);
    setEquipmentData({ ...updatedEquipmentData });
  };

  useEffect(() => {
    const equipmentCopiedData = cloneDeep(data);
    setEquipmentData(equipmentCopiedData);
    setOpenDate(moment(equipmentCopiedData.openDate));
    setIsArchived(equipmentCopiedData.isArchived);
    if (equipmentCopiedData.openDate) {
      form.setFieldsValue({ openDate: moment(equipmentCopiedData.openDate) });
    }
    setIsVehicleFormEditable(false);
  }, [data, form]);

  const renderPanelData = type => {
    const panelData = equipmentData[type];
    if (panelData) {
      return (
        <div>
          {
            Object.keys(panelData).filter(key => key !== 'count').map(key => {
              return (
                <Row key={key} gutter={[16, 16]} align="middle">
                  <Col span={8}>{panelData?.[key]?.name?.[getLangKey()]}</Col>
                  <Col span={8}>
                    <InputNumber
                      disabled={isPending || !isFormEditable}
                      min={panelData?.[key]?.remainingRights}
                      value={panelData?.[key]?.initialCount}
                      onChange={e => handleChange(e, `${type}.["${key}"].initialCount`)}
                      placeholder={t('INITIAL_COUNT')}
                    />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      disabled={isPending || !isFormEditable}
                      min={0}
                      max={panelData?.[key]?.initialCount}
                      value={panelData?.[key]?.remainingRights}
                      onChange={e => handleChange(e, `${type}.["${key}"].remainingRights`)}
                      placeholder={t('REMAINING_RIGHT')}
                    />
                  </Col>
                </Row>
              );
            })
          }
        </div>
      );
    }
    return null;
  };

  const handleVehicleFormCancelClick = () => {
    const updatedEquipmentData = cloneDeep(data);
    setEquipmentData(updatedEquipmentData);
    setIsVehicleFormEditable(false);
  };

  const handleVehicleFormEditClick = () => {
    setIsVehicleFormEditable(true);
  };

  const handleVehicleCountSubmit = () => {
    dispatch(Creators.updateFranchiseEquipmentVehicleCountRequest({
      id,
      data: {
        motoCount: get(equipmentData, 'moto.count'),
        carCount: get(equipmentData, 'car.count'),
      },
    }));
  };

  const renderFranchiseEquipmentVehicleCount = () => {
    return (
      <Form>
        <Card
          title={t('VEHICLE_COUNT')}
          footer={!isArchived && (
            <Footer
              handleSubmit={handleVehicleCountSubmit}
              handleCancelClick={handleVehicleFormCancelClick}
              handleEditClick={handleVehicleFormEditClick}
              isFormEditable={isVehicleFormEditable}
              isPending={isPending}
            />
          )}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} lg={12} xs={24}>
              <Text>{`${t('CAR_COUNT')}`}</Text>
              <InputNumber
                placeholder={t('CAR_COUNT')}
                disabled={isPending || !isVehicleFormEditable}
                min={0}
                value={get(equipmentData, 'car.count')}
                onChange={e => handleChange(e, 'car.count')}
                className={classes.numberInput}
              />
            </Col>
            <Col span={12} lg={12} xs={24}>
              <Text>{`${t('MOTO_COUNT')}`}</Text>
              <InputNumber
                placeholder={t('MOTO_COUNT')}
                disabled={isPending || !isVehicleFormEditable}
                min={0}
                value={get(equipmentData, 'moto.count')}
                onChange={e => handleChange(e, 'moto.count')}
                className={classes.numberInput}
              />
            </Col>
          </Row>
        </Card>
      </Form>
    );
  };

  const handleSubmit = () => {
    const updatedEquipments = updateFranchiseEquipmentObject(equipmentData);
    const submitData = getUpdateEquipmentRequestParams(updatedEquipments, equipmentData, id);
    dispatch(Creators.updateFranchiseEquipmentRequest(submitData));
  };

  const handleArchiveClick = () => {
    dispatch(Creators.archiveFranchiseEquipmentRequest({ id }));
  };

  const handleCancelClick = () => {
    const equipmentCopyData = cloneDeep(data);
    setEquipmentData(equipmentCopyData);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <div>
      {isArchived && (<Alert className={classes.alertContainer} type="warning" showIcon message={t('ARCHIVE_ALERT_BANNER')} />)}
      <Form form={form}>
        <Card
          title={t('FRANCHISE_EQUIPMENT')}
          extra={(
            isFormEditable && (
              <Can permKey={permKey.PAGE_FRANCHISE_EQUIPMENT_DETAIL_COMPONENT_ARCHIVE}>
                <Popconfirm
                  key="submit"
                  placement="topRight"
                  title={t('ARCHIVE_CONFIRMATION')}
                  onConfirm={handleArchiveClick}
                >
                  <Button
                    size="small"
                    danger
                    disabled={isPending}
                  >
                    {t('button:ARCHIVE')}
                  </Button>
                </Popconfirm>
              </Can>

            )
          )}
          footer={!isArchived && (
            <Footer
              handleSubmit={handleSubmit}
              handleCancelClick={handleCancelClick}
              handleEditClick={handleEditClick}
              isFormEditable={isFormEditable}
              isPending={isPending}
            />
          )}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} lg={12} xs={24}>
              <Text>{t('FRANCHISE')}</Text>
              <SelectFranchise
                allowClear={false}
                disabled
                value={equipmentData?.franchiseId}
                onChange={() => { }}
              />
            </Col>
            <Col span={12} lg={12} xs={24}>
              <Text>{t('WAREHOUSE')}</Text>
              <SelectWarehouse
                isDisabled
                value={equipmentData?.warehouseId}
                onChange={() => { }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} className={classes.datepickerWrapper}>
            <Col span={12} lg={12} xs={24}>
              <Text>{t('OPENING_DATE')}</Text>
              <DatePickerWrapper
                selectKey="openDate"
                className="w-100"
                disabled={isPending || !isFormEditable}
                allowClear={false}
                value={openDate}
                onChangeCallback={value => set(equipmentData, 'openDate', value)}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col offset={8} span={8}>
              <Text>{t('INITIAL_COUNT')}</Text>
            </Col>
            <Col span={8}>
              <Text>{t('REMAINING_RIGHT')}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Collapse defaultActiveKey={['1']} ghost>
                <Panel header={`${t('CAR_COUNT')} (${equipmentData?.car?.count})`} key="1">
                  {renderPanelData('car')}
                </Panel>
                <Panel header={`${t('MOTO_COUNT')} (${equipmentData?.moto?.count})`} key="2">
                  {renderPanelData('moto')}
                </Panel>
                <Panel header={`${t('DEFAULT_EQUIPMENTS')}`} key="3">
                  {renderPanelData('default')}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Card>
      </Form>
      {renderFranchiseEquipmentVehicleCount()}
    </div>
  );
};

export default UpdateFranchiseEquipmentForm;
