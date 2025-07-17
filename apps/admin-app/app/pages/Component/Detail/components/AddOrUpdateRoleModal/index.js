import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Popconfirm, Row, Checkbox, Space, Tooltip } from 'antd';
import { isEmpty } from 'lodash';

import { InfoCircleOutlined } from '@ant-design/icons';

import SelectRole from '@shared/containers/Select/Role';
import SelectCountry from '@shared/containers/Select/Country';
import { convertSelectOptions } from '@shared/utils/common';
import { ROLE_MODAL_TYPES } from '@app/pages/Page/Detail/constants';
import { getInitialCountryOptions } from './utils';
import useStyles from './style';

const AddRoleModal = ({
  onConfirm,
  onCancel,
  excludedRoles = [],
  mode = ROLE_MODAL_TYPES.ADD,
  defaultSelectedRole,
  countries,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['componentPage', 'rolePage']);

  const [selectedRoles, setSelectedRoles] = useState(defaultSelectedRole ? convertSelectOptions([defaultSelectedRole]) : []);
  const [selectedCountries, setSelectedCountries] = useState(() => getInitialCountryOptions({ countries, defaultSelectedRole }));

  const [isSelectRoleGloballyPermitted, setIsSelectRoleGloballyPermitted] = useState(defaultSelectedRole?.hasGlobalAccess || false);

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    const roleIds = selectedRoles?.map(role => role.value);
    const countryIds = selectedCountries?.map(country => country.value);
    onConfirm({
      roles: roleIds,
      countries: countryIds,
      hasGlobalAccess: isSelectRoleGloballyPermitted,
    });
  };

  const isSelectRoleDisabled = mode === ROLE_MODAL_TYPES.UPDATE;

  const isConfirmDisabled = isEmpty(selectedRoles) ||
    (isEmpty(selectedCountries) && !isSelectRoleGloballyPermitted);

  const footerButtons = [
    <Button key="back" type="danger" onClick={handleCancel}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      disabled={isConfirmDisabled}
      title={t('CONFIRMATION.ADD_ROLE')}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      onConfirm={handleConfirm}
      key="addRoleModalConfirmButtonPopConfirm"
    >
      <Button
        type="success"
        disabled={isConfirmDisabled}
      >
        {t('button:CONFIRM')}
      </Button>
    </Popconfirm>,
  ];

  return (
    <Modal
      title={mode === ROLE_MODAL_TYPES.ADD ? t('ADD_ROLE') : t('UPDATE_ROLE')}
      visible
      onCancel={handleCancel}
      footer={footerButtons}
      closable
      destroyOnClose
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <label htmlFor="comp_detail_modal_role">{t('rolePage:ROLE')}</label>
          <SelectRole
            value={selectedRoles}
            mode="multiple"
            id="comp_detail_modal_role"
            disabled={isSelectRoleDisabled}
            onChange={newSelectedRoles => {
              setSelectedRoles(newSelectedRoles);
            }}
            excludedRoles={excludedRoles}
            labelInValue
          />
        </Col>
        <Col span={24}>
          <Row className={classes.rowBaseline} gutter={[16, 8]}>
            <Col span={24}>
              <label htmlFor="comp_detail_modal_country">{t('rolePage:COUNTRY_ACCESS')}</label>
              <Tooltip title={t('COMPONENT_COUNTRY_PERMISSION_TOOLTIP')}>
                <InfoCircleOutlined style={{ marginLeft: 5 }} />
              </Tooltip>
            </Col>
            <Col span={6}>
              <Space align="baseline">
                <Checkbox
                  checked={isSelectRoleGloballyPermitted}
                  onChange={event => {
                    setIsSelectRoleGloballyPermitted(event.target.checked);
                  }}
                >
                  {t('GLOBAL_ACCESS')}
                </Checkbox>
              </Space>
            </Col>
            <Col span={18}>
              <SelectCountry
                value={selectedCountries}
                mode="multiple"
                id="comp_detail_modal_country"
                disabled={isSelectRoleGloballyPermitted}
                onChange={newSelectedCountries => {
                  setSelectedCountries(newSelectedCountries);
                }}
                labelInValue
                showOldCountries
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddRoleModal;
