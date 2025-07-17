import { Button, Modal, Select, Row, Col, Radio, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { ROLE_MEMBER_TYPE } from '@shared/constants/panelUser';

export function RoleMembershipUpdateModal({
  userId,
  roleId,
  onUpdate,
  isUpdatePending,
  initialMemberType,
  expiryDate,
}) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation('rolePage');

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <Button type="primary" size="small" onClick={showModal}>{t('global:UPDATE')}</Button>
      <Modal
        title={t('rolePage:UPDATE_ROLE_MEMBERSHIP')}
        visible={visible}
        onCancel={() => {
          hideModal();
        }}
        footer={null}
        destroyOnClose
      >
        <RoleMemberTypeSelect
          onUpdate={onUpdate}
          isUpdatePending={isUpdatePending}
          hideModal={hideModal}
          userId={userId}
          roleId={roleId}
          initialMemberType={initialMemberType}
          expiryDate={expiryDate}
        />

      </Modal>
    </>
  );
}

function RoleMemberTypeSelect({
  userId, roleId, initialMemberType, onUpdate,
  expiryDate: dbExpiryDate,
  isUpdatePending,
  hideModal,
}) {
  const { t } = useTranslation();
  const [selectedMemberType, setSelectedMemberType] = useState(initialMemberType);
  const [expiryDate, setExpiryDate] = useState(null);
  const [hasIndefiniteAccess, setHasIndefiniteAccess] = useState(true);

  useEffect(() => {
    if (dbExpiryDate) setExpiryDate(moment(dbExpiryDate));
    setHasIndefiniteAccess(!dbExpiryDate);
  }, [dbExpiryDate]);

  const selectOptions = Object.values(ROLE_MEMBER_TYPE).map(value => ({
    label: t(`rolePage:ROLE_MEMBER_TYPE.${value}`),
    value,
  }));

  const indifferentAccessOptions = [
    { label: t('rolePage:PERMANENT_ROLE_ACCESS'), value: true },
    { label: t('rolePage:LIMITED_TIME'), value: false },
  ];

  const onIndifferentAccessChange = ({ target: { value } }) => {
    setHasIndefiniteAccess(value);
  };

  const disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().subtract(1, 'days').endOf('day');
  };

  const update = () => {
    onUpdate({
      roleId,
      userId,
      memberType: selectedMemberType,
      expiryDate: hasIndefiniteAccess ? null : expiryDate,
      afterSuccess: hideModal,
    });
  };

  const notIndefiniteOrNoDate = hasIndefiniteAccess ? true : !expiryDate;
  const unchanged = selectedMemberType === initialMemberType && (
    dbExpiryDate
      ? !hasIndefiniteAccess && expiryDate && moment(expiryDate).isSame(moment(dbExpiryDate))
      : notIndefiniteOrNoDate
  );

  return (
    <div>
      <Select
        value={selectedMemberType}
        onChange={setSelectedMemberType}
        options={selectOptions}
        style={{ width: '100%' }}
        disabled={isUpdatePending}
      />
      <Row justify="space-between" align="middle" style={{ marginTop: '10px', marginBottom: '2rem' }}>
        <Col xs={24} sm={14} md={14}>
          <Radio.Group
            options={indifferentAccessOptions}
            onChange={onIndifferentAccessChange}
            value={hasIndefiniteAccess}
            optionType="button"
          />
        </Col>
        {!hasIndefiniteAccess && (
        <Col xs={24} sm={10} md={10}>
          <DatePicker
            value={expiryDate}
            style={{ width: '100%' }}
            placeholder={t('rolePage:SELECT_END_DATE')}
            disabledDate={disabledDate}
            onChange={date => setExpiryDate(date)}
            disabled={hasIndefiniteAccess}
          />
        </Col>
        )}
      </Row>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
        <Button onClick={hideModal} loading={isUpdatePending}>{t('global:CANCEL')}</Button>
        <Button
          type="primary"
          disabled={unchanged || isUpdatePending}
          onClick={update}
          loading={isUpdatePending}
        >{t('global:SAVE')}
        </Button>
      </div>
    </div>
  );
}
