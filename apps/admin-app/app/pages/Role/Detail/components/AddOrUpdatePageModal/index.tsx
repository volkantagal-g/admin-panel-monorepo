import { useState, useMemo, useCallback, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Popconfirm, Row, Checkbox, Space, Divider } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import SelectPage from '@shared/containers/Select/Page';
import SelectCountry from '@shared/containers/Select/Country';
import { ADD_PERMISSION_MODAL_TYPES } from '../../constants';
import useStyles from './styles';
import { CountrySelectOption, PageSelectOption, getInitialCountries, getInitialSelectedPages } from './utils';

const AddOrUpdatePermissionsModal = ({
  modalTitle,
  onConfirm,
  onCancel,
  mode = ADD_PERMISSION_MODAL_TYPES.ADD,
  defaultSelectedPermission,
  excludedPageIds = [],
  countries,
}: {
  modalTitle: string,
  onConfirm: ({
    permKeys,
    countryIds,
    hasGlobalAccess,
  }: {
    permKeys: string[],
    countryIds: string[],
    hasGlobalAccess: boolean,
  }) => void,
  onCancel: () => void,
  mode: number,
  defaultSelectedPermission: PageType,
  excludedPageIds: MongoIDType[],
  countries: ICountry[],
}) => {
  const { t } = useTranslation('rolePage');

  const [selectedPages, setSelectedPages] = useState(() => getInitialSelectedPages(defaultSelectedPermission));
  const [selectedCountries, setSelectedCountries] = useState(() => getInitialCountries(defaultSelectedPermission, countries));
  const [hasGlobalAccess, setHasGlobalAccess] = useState(defaultSelectedPermission?.hasGlobalAccess || false);
  const classes = useStyles() as Record<string, string>;

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    const permKeys = selectedPages?.map(({ data }) => data?.permKey);
    const countryIds = selectedCountries?.map(country => (country as CountrySelectOption).value);
    onConfirm({ permKeys, countryIds, hasGlobalAccess });
  };

  const handleHasGlobalAccessChange = (e: CheckboxChangeEvent) => {
    setHasGlobalAccess(e.target.checked);
    setSelectedCountries([]);
  };

  const isSelectPageDisabled = mode === ADD_PERMISSION_MODAL_TYPES.UPDATE;

  const globalAccessCheckBox = useMemo(() => {
    return (
      <Checkbox
        checked={hasGlobalAccess}
        className={classes.checkboxFloatRight}
        onChange={handleHasGlobalAccessChange}
      >
        {t('HAS_GLOBAL_ACCESS')}
      </Checkbox>
    );
  }, [classes.checkboxFloatRight, hasGlobalAccess, t]);

  const getSelectCountryRenderMenu = useCallback(({ menu }) => {
    return (
      <>
        <Space className={classes.countryRenderSpace}>
          {globalAccessCheckBox}
        </Space>
        <Divider className={classes.countryRenderDivider} />
        {menu}
      </>
    );
  }, [classes.countryRenderDivider, classes.countryRenderSpace, globalAccessCheckBox]);

  const footerButtons = [
    <Button key="back" danger onClick={handleCancel}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      disabled={_isEmpty(selectedPages) || (!hasGlobalAccess && _isEmpty(selectedCountries))}
      title={t('rolePage:CONFIRMATION.ADD_PAGE')}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      onConfirm={handleConfirm}
      key="AddOrUpdatePermissionsModalConfirmButtonPopConfirm"
    >
      <Button type="primary" disabled={_isEmpty(selectedPages) || (!hasGlobalAccess && _isEmpty(selectedCountries))}>
        {t('button:CONFIRM')}
      </Button>
    </Popconfirm>,
  ];

  return (
    <Modal
      title={modalTitle}
      visible
      onCancel={handleCancel}
      footer={footerButtons}
      closable
      destroyOnClose
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <SelectPage
            defaultValue={selectedPages}
            className={classes.fullWidth}
            mode="multiple"
            placeholder={t('rolePage:PAGES')}
            disabled={isSelectPageDisabled}
            excludedPageIds={excludedPageIds}
            onChange={(_newSelectedPages: PageType, selectedPagesData: PageSelectOption[]) => {
              setSelectedPages(selectedPagesData);
            }}
            labelInValue
          />
        </Col>
        <Col span={24}>
          <Row className={classes.rowBaseline} gutter={[16, 8]}>
            <Col span={18}>
              <SelectCountry
                value={selectedCountries}
                mode="multiple"
                disabled={hasGlobalAccess}
                onChange={(newSelectedCountries: ICountry[]) => {
                  setSelectedCountries(newSelectedCountries);
                }}
                labelInValue
                dropdownRender={(menu: ReactNode) => getSelectCountryRenderMenu({ menu })}
                showOldCountries
              />
            </Col>
            <Col span={6}>
              <Space align="baseline">
                {globalAccessCheckBox}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddOrUpdatePermissionsModal;
