import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Popconfirm, Row } from 'antd';
import { isEmpty } from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import AntCard from '@shared/components/UI/AntCard';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import useStyles from './styles';
import { getColumns } from './config';
import { Creators } from '../../redux/actions';
import SelectRole from '@shared/containers/Select/Role';
import { getAddRolesToReportTag, getRemoveRoleFromReportTag, getRolesDetails, getRolesForTheReportTag } from '../../redux/selectors';

export default function ReportTagPermissionRolesTable({ reportTagId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();
  const { canAccess } = usePermission();
  const isAddRolesPending = useSelector(getAddRolesToReportTag.getIsPending);
  const reportTagRoleIds = useSelector(getRolesForTheReportTag.getData);
  const reportTagRoles = useSelector(getRolesDetails.getData);
  const isReportTagRolesPending = useSelector(getRolesDetails.getIsPending);
  const isRemoveRolePending = useSelector(getRemoveRoleFromReportTag.getIsPending);
  const canAccessEdit = canAccess(permKey.PAGE_REPORT_TAGS_DETAIL_EDIT);
  const canAccessRoleDetail = canAccess(permKey.PAGE_ROLE_DETAIL);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    dispatch(Creators.getRolesByReportTagsRequest({ reportTagIds: [reportTagId] }));
  }, [dispatch, reportTagId]);

  useEffect(() => {
    dispatch(Creators.getRolesDetailsRequest({ roleIds: reportTagRoleIds }));
  }, [dispatch, reportTagRoleIds]);

  const columns = getColumns(t, onRoleDelete, isRemoveRolePending, canAccessEdit, canAccessRoleDetail);

  return (
    <>
      <AntCard title={t('Roles')} extra={getHeaderActionButtons()}>
        <AntTable columns={columns} data={reportTagRoles} loading={isReportTagRolesPending} />
      </AntCard>
      {
        canAccessEdit && (
          <Modal title={t('ADD_ROLE')} visible={isModalVisible} onCancel={closeModal} footer={getFooterButtons()} closable destroyOnClose>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <SelectRole
                  value={selectedRoles}
                  mode="multiple"
                  onChange={newSelectedRoles => {
                    setSelectedRoles(newSelectedRoles);
                  }}
                  excludedRoles={reportTagRoleIds}
                  labelInValue
                />
              </Col>
            </Row>
          </Modal>
        )
      }
    </>
  );

  function getHeaderActionButtons() {
    return (
      <div className={classes.headerButtons}>
        {
          canAccessEdit && (
            <Button type="primary" onClick={handleAddRoleClick} loading={isAddRolesPending}>
              {t('ADD_ROLE')}
            </Button>
          )
        }
      </div>
    );
  }

  function getFooterButtons() {
    return [
      <Button key="back" type="danger" onClick={closeModal}>
        {t('global:CANCEL')}
      </Button>,
      <Popconfirm
        disabled={isEmpty(selectedRoles)}
        title={t('CONFIRMATION.ADD_ROLE')}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        onConfirm={onAddRoleConfirm}
        key="addRoleModalConfirmButtonPopConfirm"
      >
        <Button type="success" disabled={isEmpty(selectedRoles)}>
          {t('button:CONFIRM')}
        </Button>
      </Popconfirm>,
    ];
  }

  function closeModal() {
    setIsModalVisible(false);
    setSelectedRoles([]);
  }

  function openModal() {
    setIsModalVisible(true);
  }

  function handleAddRoleClick() {
    openModal();
  }

  function onAddRoleConfirm() {
    const roleIds = selectedRoles.map(role => role.value);
    dispatch(Creators.addRolesToReportTagRequest({ roleIds, reportTagId }));
    closeModal();
  }

  function onRoleDelete(roleId) {
    dispatch(Creators.removeRoleFromReportTagRequest({ roleId, reportTagId }));
  }
}
