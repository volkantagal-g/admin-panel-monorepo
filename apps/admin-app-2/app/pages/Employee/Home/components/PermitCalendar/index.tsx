import { useCallback, useEffect, useMemo } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Col, Collapse, DatePicker, Divider, Row, Spin, Tag } from 'antd';

import usePermitListConfidentialData from '@app/pages/Employee/hooks/usePermitListConfidentialData';
import SelectDepartment from '@shared/containers/Select/Department';
import SelectEmployee from '@shared/containers/Select/Employee';
import { Creators } from '../../redux/actions';
import { pageSelector, permitsForCalendarFormDataSelector, permitsForCalendarSelector } from '../../redux/selectors';
import { getHolidaysAndPermitsMapByDate } from '../../utils';
import { TAG_COLORS } from '@shared/shared/constants';
import { DATE_FORMAT, SELECT_DEPARTMENT_FILTERS_FOR_CALENDAR } from '../../constants';
import useStyles from './styles';

interface PermitCalendarProps {
  onPermitDetailClick: ({ permit }: { permit: any }) => void;
}

export default function PermitCalendar({ onPermitDetailClick }: PermitCalendarProps) {
  const dispatch = useDispatch();
  const { canAccessPermitListConfidentialData } = usePermitListConfidentialData();
  const { t } = useTranslation(['global', 'employeePage']);
  const classes = useStyles();
  const formData = useSelector(permitsForCalendarFormDataSelector.getFormData);
  const {
    selectedMonth,
    validRanges,
    selectedDepartment,
    selectedSupervisor,
    selectedEmployee,
    selectedTopManager,
  } = formData;

  const isPageInitialized = useSelector(pageSelector.getIsPageInitialized);
  const permitsForCalendarData = useSelector(permitsForCalendarSelector.getData);
  const isPermitsForCalendarPending = useSelector(permitsForCalendarSelector.getIsPending);

  const permitsForCalendarDataMap = useMemo(
    () => getHolidaysAndPermitsMapByDate(permitsForCalendarData),
    [permitsForCalendarData],
  );

  const MemoizedHeaderComponent = useCallback(({ onChange }) => {
    const handleDateChange = (selectedDate: object) => {
      onChange(selectedDate);
      dispatch(Creators.setPermitsForCalendarFormData({
        data: {
          selectedMonth: selectedDate,
          validRanges: [moment(selectedDate).startOf('month'), moment(selectedDate).endOf('month')],
        },
      }));
    };
    const handleSelectChange = (value: object | string | undefined, type: string) => {
      if (type === 'supervisor') {
        dispatch(Creators.setPermitsForCalendarFormData({ data: { selectedSupervisor: value } }));
      }
      else if (type === 'department') {
        dispatch(Creators.setPermitsForCalendarFormData({ data: { selectedDepartment: value } }));
      }
      else if (type === 'employee') {
        dispatch(Creators.setPermitsForCalendarFormData({ data: { selectedEmployee: value } }));
      }
      else if (type === 'topManager') {
        dispatch(Creators.setPermitsForCalendarFormData({ data: { selectedTopManager: value } }));
      }
    };

    return (
      <CalendarHeaderComponent
        classes={classes}
        onDateChange={handleDateChange}
        onSelectChange={handleSelectChange}
        t={t}
      />
    );
    // for avoid unnecessary renders on classes changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const getPermitTagColor = (item: any) => {
    if (item.isSpecialHoliday && item.isLocal) {
      return TAG_COLORS.success;
    }
    if (item.isSpecialHoliday) {
      return TAG_COLORS.info;
    }
    return TAG_COLORS.default;
  };

  const getPermitTitle = (item: any) => {
    if (item.isSpecialHoliday && item.isLocal) {
      return `${t(item.translationKey)} (${item.cities.join(', ')})`;
    }
    if (item.isSpecialHoliday) {
      return t(item.translationKey);
    }
    return item.title;
  };

  const dateCellRender = (value: any) => {
    const permits = permitsForCalendarDataMap[value.format(DATE_FORMAT)];
    return (
      <div>
        {
          permits?.map((item: any) => (
            <Tag
              key={item.key}
              title={getPermitTitle(item)}
              className={classes.tag}
              color={getPermitTagColor(item)}
              onClick={() => {
                if (canAccessPermitListConfidentialData) {
                  onPermitDetailClick({ permit: item });
                }
              }}
            >
              { getPermitTitle(item) }
            </Tag>
          ))
        }
      </div>
    );
  };

  useEffect(() => {
    if (isPageInitialized) {
      dispatch(Creators.getPermitsForCalendarRequest({}));
    }
  }, [dispatch, isPageInitialized, selectedMonth, selectedDepartment, selectedSupervisor, selectedEmployee, selectedTopManager]);

  return (
    <div data-testid="permitCalendar">
      <Spin spinning={isPermitsForCalendarPending} tip={t('global:LOADING_TIP')}>
        <Collapse defaultActiveKey="calendar">
          <Collapse.Panel
            header={t('employeePage:PERMIT_CALENDAR')}
            key="calendar"
          >
            <Calendar
              dateCellRender={dateCellRender}
              headerRender={MemoizedHeaderComponent}
              validRange={validRanges}
            />
          </Collapse.Panel>
        </Collapse>
      </Spin>
    </div>
  );
}

function CalendarHeaderComponent({ classes, onDateChange, onSelectChange, t }: { classes: any; onDateChange: any; onSelectChange: any; t: any }) {
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col md={2} sm={8} xs={24}>
          <DatePicker.MonthPicker
            className={classes.monthPicker}
            defaultValue={moment()}
            onChange={onDateChange}
            allowClear={false}
            format="YYYY MMMM"
          />
        </Col>
        <Col md={5} sm={8} xs={24}>
          <SelectEmployee
            placeholder={t('employeePage:EMPLOYEE')}
            onChange={value => {
              onSelectChange(value, 'employee');
            }}
          />
        </Col>
        <Col md={5} sm={8} xs={24}>
          <SelectEmployee
            placeholder={t('employeePage:MANAGER')}
            onChange={value => {
              onSelectChange(value, 'supervisor');
            }}
          />
        </Col>
        <Col md={5} sm={8} xs={24}>
          <SelectEmployee
            placeholder={t('employeePage:TOP_MANAGER')}
            onChange={value => {
              onSelectChange(value, 'topManager');
            }}
          />
        </Col>
        <Col md={5} sm={8} xs={24}>
          <SelectDepartment
            placeholder={t('global:DEPARTMENT')}
            onChange={value => {
              onSelectChange(value, 'department');
            }}
            isReturnParsedValue
            filters={SELECT_DEPARTMENT_FILTERS_FOR_CALENDAR}
          />
        </Col>
      </Row>
      <Divider className={classes.divider} />
    </div>
  );
}
