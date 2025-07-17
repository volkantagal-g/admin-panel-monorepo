import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import { Button, Col, DatePicker, Modal, Popconfirm, Row, Radio } from 'antd';
import { isEmpty } from 'lodash';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import SelectUser from '@shared/containers/Select/User';
import useStyles from './styles';

type SelectUserOption = { label: string, value: MongoIDType };

const AddUserModal = ({
  modalVisibility,
  onChangeVisibility,
  onConfirm,
}: {
  modalVisibility: boolean,
  onChangeVisibility: (visible: boolean) => void,
  onConfirm: ({ users, expiryDate }: { users: MongoIDType[], expiryDate: Date }) => void,
}) => {
  const { t } = useTranslation('rolePage');
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState<SelectUserOption[]>([] as SelectUserOption[]);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [hasIndefiniteAccess, setHasIndefiniteAccess] = useState(true);

  const handleChangeVisibility = (isVisible = false) => {
    onChangeVisibility(isVisible);
    if (isVisible === false) {
      setSelectedUsers([] as SelectUserOption[]);
    }
  };

  const handleCancel = () => {
    handleChangeVisibility(false);
    setExpiryDate(null);
  };

  const handleConfirm = () => {
    const userIds = selectedUsers?.map(user => user.value);
    onConfirm({
      users: userIds,
      expiryDate: (hasIndefiniteAccess ? null : expiryDate) as Date,
    });
    handleChangeVisibility(false);
    setExpiryDate(null);
  };

  const saveDisabled = isEmpty(selectedUsers) || (!hasIndefiniteAccess && !expiryDate);

  const footerButtons = [
    <Button className={classes.btnCancel} key="back" danger onClick={handleCancel}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      disabled={isEmpty(selectedUsers)}
      title={t('rolePage:CONFIRMATION.ADD_USER')}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      onConfirm={handleConfirm}
      key="addUserModalConfirmButtonPopConfirm"
    >
      <Button type="primary" disabled={saveDisabled}>
        {t('button:CONFIRM')}
      </Button>
    </Popconfirm>,
  ];

  const indifferentAccessOptions = [
    { label: t('rolePage:PERMANENT_ROLE_ACCESS'), value: true },
    { label: t('rolePage:LIMITED_TIME'), value: false },
  ];

  const onIndifferentAccessChange = ({ target: { value } }: CheckboxChangeEvent) => {
    setHasIndefiniteAccess(value);
  };

  const disabledDate = (current: Moment) => {
    // Can not select days before today and today
    return current && current < moment().subtract(1, 'days').endOf('day');
  };

  return (
    <Modal
      title={t('rolePage:ADD_USER')}
      visible={modalVisibility}
      centered
      onCancel={handleCancel}
      footer={footerButtons}
    >
      <Row>
        <Col span={24}>
          <SelectUser
            value={selectedUsers}
            mode="multiple"
            onChange={(newSelectedUsers: SelectUserOption[]) => {
              setSelectedUsers(newSelectedUsers);
            }}
            labelInValue
          />
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={14} md={14}>
          <Radio.Group
            className={classes.expiryDate}
            options={indifferentAccessOptions}
            onChange={onIndifferentAccessChange}
            value={hasIndefiniteAccess}
            optionType="button"
          />
        </Col>
        {!hasIndefiniteAccess && (
          <Col xs={24} sm={10} md={10}>
            <DatePicker
              value={expiryDate as unknown as Moment}
              disabledDate={disabledDate}
              className={classes.expiryDate}
              onChange={date => setExpiryDate(date as unknown as Date)}
              placeholder={t('rolePage:SELECT_END_DATE')}
            />
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default AddUserModal;
