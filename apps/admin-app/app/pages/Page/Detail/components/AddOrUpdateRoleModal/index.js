import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Popconfirm, Row, Divider } from 'antd';
import { differenceBy, isEmpty } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';

import SelectRole from '@shared/containers/Select/Role';
import { convertSelectOptions } from '@shared/utils/common';
import { ROLE_MODAL_TYPES } from '@app/pages/Page/Detail/constants';

import { getInitialCountryOptions } from './utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { columns, CountrySelector } from '@app/pages/Page/Detail/components/AddOrUpdateRoleModal/config';
import useStyles from './style';

const AddRoleModal = ({
  onConfirm,
  onCancel,
  excludedRoles = [],
  mode = ROLE_MODAL_TYPES.ADD,
  defaultSelectedRole,
  countries,
  pageComponents = [],
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['pagePage', 'global']);

  const [selectedRoles, setSelectedRoles] = useState(defaultSelectedRole ? convertSelectOptions([defaultSelectedRole]) : []);

  const [pageSelectedCountries, setPageSelectedCountries] = useState(() => getInitialCountryOptions({ countries, defaultSelectedRole }));
  const [pageGlobalAccess, setPageGlobalAccess] = useState(defaultSelectedRole?.hasGlobalAccess || false);

  const [componentAccess, setComponentAccess] = useState(defaultSelectedRole?.componentAccess || []);
  const [editingRow, setEditingRow] = useState(-1);

  const updateComponentAccess = (index, updatedAccess) => {
    const shallowCopy = [...componentAccess];
    shallowCopy[index] = { ...shallowCopy[index], ...updatedAccess };
    setComponentAccess(shallowCopy);
  };

  const deleteComponentAccess = toDeleteIndex => {
    setComponentAccess(componentAccess.filter((e, index) => index !== toDeleteIndex));
    if (editingRow === toDeleteIndex) {
      setEditingRow(-1);
    }
    else if (editingRow > toDeleteIndex) {
      setEditingRow(editingRow - 1);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    const roleIds = selectedRoles?.map(role => role.value);
    const countryIds = pageSelectedCountries?.map(country => country.value);
    onConfirm({
      roles: roleIds,
      countries: countryIds,
      hasGlobalAccess: pageGlobalAccess,
      componentAccess,
    });
  };

  const isSelectRoleDisabled = mode === ROLE_MODAL_TYPES.UPDATE;

  const isConfirmDisabled = isEmpty(selectedRoles) ||
    (isEmpty(pageSelectedCountries) && !pageGlobalAccess) || editingRow !== -1;

  const footerButtons = [
    <Button key="back" type="danger" onClick={handleCancel}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      title={t('CONFIRMATION.ADD_ROLE')}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      onConfirm={handleConfirm}
      key="addRoleModalConfirmButtonPopConfirm"
      disabled={isConfirmDisabled}
    >
      <Button
        type="success"
        disabled={isConfirmDisabled}
        className="ml-2"
      >
        {t('button:CONFIRM')}
      </Button>
    </Popconfirm>,
  ];

  const componentsWithoutAccess = differenceBy(pageComponents, componentAccess, c => c.componentId ?? c._id);
  const canAddMoreComponents = !isEmpty(componentsWithoutAccess);
  return (
    <Modal
      title={mode === ROLE_MODAL_TYPES.ADD ? t('ADD_ROLE') : t('UPDATE_ROLE')}
      visible
      onCancel={handleCancel}
      footer={footerButtons}
      closable
      destroyOnClose
      width={650}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="search_role_modal" style={{ width: '100%' }}>
            {t('ROLES')}
            <SelectRole
              id="search_role_modal"
              style={{ width: '100%' }}
              value={selectedRoles}
              mode="multiple"
              disabled={isSelectRoleDisabled}
              onChange={newSelectedRoles => {
                setSelectedRoles(newSelectedRoles);
              }}
              excludedRoles={excludedRoles}
              labelInValue
            />
          </label>
        </Col>
        <Col span={24}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="page_country_select" style={{ width: '100%' }}>
            {t('COUNTRY_ACCESS_FOR_PAGE')}
            <CountrySelector
              id="page_country_select"
              countries={pageSelectedCountries}
              setCountries={selectedCountries => {
                setPageSelectedCountries(selectedCountries);
                setPageGlobalAccess(false);
              }}
              hasGlobalAccess={pageGlobalAccess}
              setHasGlobalAccess={hasGlobalAccess => {
                setPageGlobalAccess(hasGlobalAccess);
                setPageSelectedCountries([]);
              }}
            />
          </label>
        </Col>
      </Row>
      {selectedRoles.length === 1 && (
        <><Divider />
          <AntTableV2
            dataSource={componentAccess}
            columns={columns({
              t,
              componentAccess,
              updateComponentAccess,
              deleteComponentAccess,
              pageComponents,
              countries,
              editingRow,
              setEditingRow,
            })}
            rowKey={row => row.componentId || 'empty_row'}
            footer={(
              <section className={classes.tableFooter}>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  disabled={editingRow !== -1 || !canAddMoreComponents}
                  onClick={() => {
                    const prefilledComponentId = componentsWithoutAccess.length === 1 ? componentsWithoutAccess[0]._id : '';

                    setEditingRow(componentAccess.length);
                    setComponentAccess([
                      ...componentAccess,
                      { componentId: prefilledComponentId, countries: [], hasGlobalAccess: false },
                    ]);
                  }}
                >{t('ADD_COMPONENTS')}
                </Button>
              </section>
            )}
          />
        </>
      )}
    </Modal>
  );
};

export default AddRoleModal;
