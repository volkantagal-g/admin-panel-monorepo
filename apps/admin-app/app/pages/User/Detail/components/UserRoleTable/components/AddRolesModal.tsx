import { Button, Checkbox, Modal, Select, Spin, Tooltip } from 'antd';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getRolesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

type AddRolesModalProps = {
  selectableRoles: RoleType[];
  excludedRoleIds: MongoIDType[];
  onSubmit: (values: { selectedRoles: RoleType[], afterSuccess: () => void }) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function AddRolesModal({
  selectableRoles,
  excludedRoleIds,
  onSubmit,
  isLoading,
  disabled,
}: AddRolesModalProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation('userPage');
  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const everyRoleIsExcluded = selectableRoles?.every(role => excludedRoleIds.includes(role._id));

  return (
    <>
      {everyRoleIsExcluded ? (
        <Tooltip title={t('ALL_ROLES_ARE_ADDED')}>
          <Button type="primary" disabled>{t('ADD_ROLES')}</Button>
        </Tooltip>
      ) : (
        <Button type="primary" disabled={disabled} onClick={showModal}>{t('ADD_ROLES')}</Button>
      )}
      <Modal
        title={t('ADD_ROLES')}
        visible={visible}
        onCancel={() => {
          hideModal();
        }}
        footer={null}
        destroyOnClose
      >
        <AddRolesForm
          initialSelectableRoles={selectableRoles}
          excludedRoleIds={excludedRoleIds}
          hideModal={hideModal}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
}

type AddRolesFormProps = {
  initialSelectableRoles: RoleType[];
  excludedRoleIds: MongoIDType[];
  onSubmit: (values: { selectedRoles: RoleType[], afterSuccess: () => void }) => void;
  hideModal: () => void;
  isLoading: boolean;
}

function AddRolesForm({
  initialSelectableRoles,
  excludedRoleIds = [],
  onSubmit,
  hideModal,
  isLoading,
}: AddRolesFormProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation('userPage');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectableRoles, setSelectableRoles] = useState(initialSelectableRoles || null);

  const [autoClearSearchText, setAutoClearSearchText] = useState(false);

  const fetchedRoles = useSelector(getRolesSelector.getData);
  const isFetchingRoles = useSelector(getRolesSelector.getIsPending);

  const roleOptions = (selectableRoles || fetchedRoles)
    .filter(role => !excludedRoleIds.includes(role._id))
    .map(role => {
      return {
        label: role.name,
        value: role._id,
      };
    });

  const searchRoles = useCallback(searchText => {
    dispatch(CommonCreators.getRolesRequest({ queryText: searchText }));
  }, [dispatch]);

  const { debouncedCallback } = useDebouncedCallback({ callback: searchRoles });

  const onSearch = useCallback(searchText => {
    if (searchText?.length > 2) {
      debouncedCallback(searchText);
    }
  }, [debouncedCallback]);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Checkbox
          checked={autoClearSearchText}
          onChange={e => {
            setAutoClearSearchText(e.target.checked);
          }}
        >{t('ROLES_SEARCH_WILL_RESET')}
        </Checkbox>
      </div>
      {
        initialSelectableRoles ? (
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t('SEARCH')}
            value={selectedRoles}
            onChange={setSelectedRoles}
            options={roleOptions}
            optionLabelProp="label"
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
            showSearch
            autoClearSearchValue={autoClearSearchText}
            onDropdownVisibleChange={open => {
              if (!open) {
                setSelectableRoles(initialSelectableRoles);
              }
            }}
          />
        ) : (
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t('SEARCH')}
            optionLabelProp="label"
            filterOption={false}
            value={selectedRoles}
            onChange={setSelectedRoles}
            options={roleOptions}
            loading={isFetchingRoles}
            notFoundContent={isFetchingRoles ? <Spin size="small" /> : null}
            onSearch={onSearch}
            showSearch
            autoClearSearchValue={autoClearSearchText}
          />
        )
      }
      <div style={{ marginTop: '10px', gap: '4px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={hideModal} loading={isLoading}>{t('CANCEL')}</Button>
        <Button
          type="primary"
          onClick={() => {
            onSubmit({ selectedRoles, afterSuccess: hideModal });
          }}
          loading={isLoading}
          disabled={selectedRoles.length === 0}
        >{t('ADD')}
        </Button>
      </div>

    </div>

  );
}
