import { useEffect, useState } from 'react';
import { Button, Select, Checkbox, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { countriesSelector } from '@shared/redux/selectors/common';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { Creators } from '../../redux/actions';
import { getDepartmentsSelector } from '../../redux/selectors';
import { getSelectFilterOption } from '@shared/utils/common';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n.ts';

const CheckboxGroup = Checkbox.Group;

const UserExportForm = ({ handleCancel }: { handleCancel: () => void }) => {
  const { t } = useTranslation('userPage');
  const [statuses, setStatuses] = useState<string[]>([]);
  const dispatch = useDispatch();
  const classes = useStyles({});
  const countries = useSelector(countriesSelector.getData);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>();
  const departments = useSelector(getDepartmentsSelector.getData) as DepartmentType[];
  const isDeptPending = useSelector(getDepartmentsSelector.getIsPending);

  const onStatusChange = (val: Array<CheckboxValueType>) => setStatuses(val as string[]);
  const handleDepartmentChange = (val: string[]) => setSelectedDepartments(val);

  useEffect(() => {
    dispatch(Creators.getDepartmentsRequest());
  }, [dispatch]);

  const clearFilters = () => {
    setStatuses([]);
    setSelectedDepartments([]);
  };

  const statusOptions: string[] = [t('ACTIVE'), t('INACTIVE')];

  const departmentOptions = departments?.map?.(dept => ({
    label: dept.name?.[getLangKey()],
    value: dept._id,
  }));

  const onUserExportClick = () => {
    const isActive = (statuses.length === 1) ? statuses.includes(t('ACTIVE')) : undefined;
    const filters = { statuses, departments: selectedDepartments };

    dispatch(Creators.getUsersForExcelTableRequest({ t, isActive, countries, filters }));
    AnalyticsService.track(PANEL_EVENTS.USERS_INFO_EXPORT.EVENT_NAME, { button: PANEL_EVENTS.USERS_INFO_EXPORT.BUTTON.USERS_INFO_EXPORT });

    clearFilters();
    handleCancel();
  };

  return (
    <Form name="basic" onFinish={onUserExportClick}>
      <Form.Item label={t('USER_STATUS')}>
        <CheckboxGroup
          options={statusOptions}
          value={statuses}
          onChange={onStatusChange}
        />
      </Form.Item>

      <Form.Item label={t('DEPARTMENT')}>
        <Select
          showSearch
          mode="multiple"
          loading={isDeptPending}
          className={classes.departmentSelect}
          value={selectedDepartments}
          onChange={handleDepartmentChange}
          options={departmentOptions}
          optionFilterProp="children"
          filterOption={getSelectFilterOption}
        />
      </Form.Item>

      <Form.Item className={classes.actionButtons}>
        <Button onClick={handleCancel}>
          {t('CANCEL')}
        </Button>
        <Button type="primary" htmlType="submit">
          {t('OK')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserExportForm;
